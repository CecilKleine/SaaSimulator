import { FundingState, FundingOffer, FundingRoundType } from '@/types/funding';
import { GameState } from '@/types/game';
import { ProductMilestone } from '@/types/product';
import { calculateValuation } from './calculations';

export function updateFundingSystem(funding: FundingState, gameState: GameState): FundingState {
  const updated = { ...funding };
  
  // Process active funding round
  if (updated.activeRound && updated.activeRound.status === 'inProgress') {
    const round = updated.activeRound;
    const daysSinceStart = gameState.currentTime - round.startedAt;
    
    // Generate offers after some time
    if (daysSinceStart >= 30 && round.offers.length === 0) {
      // Generate funding offers based on investor interest
      const offer = generateFundingOffer(round.roundType, round.investorInterest, gameState);
      round.offers.push(offer);
    }
    
    // Round expires after 4 months if no offer accepted
    if (daysSinceStart >= 120 && round.offers.length > 0) {
      // Check if any offers expired
      round.offers = round.offers.filter(offer => {
        return !offer.expiresAt || gameState.currentTime < offer.expiresAt;
      });
      
      if (round.offers.length === 0) {
        round.status = 'failed';
        updated.activeRound = null;
      }
    }
  }
  
  return updated;
}

function generateFundingOffer(
  roundType: FundingRoundType,
  investorInterest: number,
  gameState: GameState
): FundingOffer {
  const milestone = gameState.product.currentMilestone;
  
  // Milestone-based multipliers for funding amounts (higher milestone = more funding)
  const amountMultipliers: Record<ProductMilestone, number> = {
    'idea': 0.3,        // Only 30% of normal amount at idea stage
    'mvp': 0.5,        // 50% at MVP
    'validated': 0.75, // 75% at validated
    'growing': 0.95,   // 95% at growing
    'mature': 1.0      // 100% at mature
  };
  
  // Milestone-based multipliers for equity (higher milestone = less equity required)
  const equityMultipliers: Record<ProductMilestone, number> = {
    'idea': 1.5,       // 50% more equity at idea stage
    'mvp': 1.2,       // 20% more equity at MVP
    'validated': 1.0, // Base equity at validated
    'growing': 0.9,   // 10% less equity at growing
    'mature': 0.8     // 20% less equity at mature
  };
  
  const amountMultiplier = amountMultipliers[milestone] || 0.3;
  const equityMultiplier = equityMultipliers[milestone] || 1.5;
  
  const valuation = calculateValuation(
    gameState.monthlyRevenue,
    gameState.product.maturity,
    gameState.team.employees.length,
    gameState.product.productMarketFit,
    gameState.product.currentMilestone
  );
  
  let baseAmount: number;
  let baseEquityPercent: number;
  
  if (roundType === 'seed') {
    // Seed round: $100k - $1M, 15-30% equity
    baseAmount = 300000 + (investorInterest * 700000);
    baseEquityPercent = 30 - (investorInterest * 15);
  } else if (roundType === 'seriesA') {
    // Series A: $2M - $10M, 10-20% equity
    baseAmount = 2000000 + (investorInterest * 8000000);
    baseEquityPercent = 20 - (investorInterest * 10);
  } else if (roundType === 'seriesB') {
    // Series B: $10M - $50M, 5-15% equity
    baseAmount = 10000000 + (investorInterest * 40000000);
    baseEquityPercent = 15 - (investorInterest * 10);
  } else {
    // Series C: $50M - $200M, 3-10% equity
    baseAmount = 50000000 + (investorInterest * 150000000);
    baseEquityPercent = 10 - (investorInterest * 7);
  }
  
  // Apply investor interest adjustment
  const interestAdjustedAmount = baseAmount * (0.8 + investorInterest * 0.4);
  const interestAdjustedEquity = baseEquityPercent * (1.2 - investorInterest * 0.4);
  
  // Apply milestone multipliers
  const amount = interestAdjustedAmount * amountMultiplier;
  const equityPercent = interestAdjustedEquity * equityMultiplier;
  
  // Ensure minimums and maximums
  let finalAmount: number;
  let finalEquityPercent: number;
  
  if (roundType === 'seed') {
    finalAmount = Math.max(100000, Math.min(1000000, amount));
    finalEquityPercent = Math.max(10, Math.min(40, equityPercent));
  } else if (roundType === 'seriesA') {
    finalAmount = Math.max(2000000, Math.min(10000000, amount));
    finalEquityPercent = Math.max(5, Math.min(25, equityPercent));
  } else if (roundType === 'seriesB') {
    finalAmount = Math.max(10000000, Math.min(50000000, amount));
    finalEquityPercent = Math.max(3, Math.min(20, equityPercent));
  } else {
    finalAmount = Math.max(50000000, Math.min(200000000, amount));
    finalEquityPercent = Math.max(2, Math.min(15, equityPercent));
  }
  
  return {
    id: `offer-${Date.now()}`,
    roundType,
    amount: Math.round(finalAmount),
    valuation: Math.round(valuation),
    equityPercent: Math.round(finalEquityPercent * 10) / 10,
    expiresAt: gameState.currentTime + 30, // Offer expires in 30 days
  };
}
