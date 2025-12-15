import { GameState } from '@/types/game';
import { Employee } from '@/types/employee';
import { ProductMilestone } from '@/types/product';

export function calculateBurnRate(monthlyExpenses: number, monthlyRevenue: number): number {
  return Math.max(0, monthlyExpenses - monthlyRevenue);
}

export function calculateRunway(money: number, burnRate: number): number {
  if (burnRate <= 0) return Infinity;
  return money / burnRate;
}

export function calculateMonthlyExpenses(employees: Employee[], baseOverhead: number = 2000): number {
  const totalSalaries = employees.reduce((sum, emp) => sum + emp.salary, 0);
  const officeCost = Math.max(baseOverhead, employees.length * 500); // Scales with team size
  return totalSalaries + officeCost;
}

export function calculateTeamProductivity(employees: Employee[]): number {
  const productiveEmployees = employees.filter(emp => emp.onboardingComplete);
  return productiveEmployees.reduce((sum, emp) => {
    const roleMultiplier = getRoleProductivityMultiplier(emp.role);
    return sum + (emp.productivity * roleMultiplier);
  }, 0);
}

function getRoleProductivityMultiplier(role: string): number {
  switch (role) {
    case 'engineer': return 1.0;
    case 'designer': return 0.7;
    case 'sales': return 0.5;
    case 'marketing': return 0.4;
    case 'operations': return 0.3;
    default: return 0.5;
  }
}

export function calculateRevenue(
  productStage: ProductMilestone,
  productMarketFit: number,
  salesCount: number,
  marketingCount: number,
  baseRevenuePerSale: number = 1000
): number {
  // Sales only effective from MVP stage onwards
  if (productStage === 'idea') return 0;
  
  // Stage-based scaling multipliers
  const stageMultipliers: Record<ProductMilestone, number> = {
    'idea': 0,
    'mvp': 0.3,        // 30% effectiveness at MVP
    'validated': 0.6,  // 60% at validated
    'growing': 0.9,    // 90% at growing
    'mature': 1.0      // 100% at mature
  };
  
  const stageMultiplier = stageMultipliers[productStage] || 0;
  
  // Marketing multiplier with cap (max 2 marketers per salesperson for full effect)
  const marketersPerSeller = salesCount > 0 ? marketingCount / salesCount : 0;
  const maxMarketingRatio = 2; // Cap at 2 marketers per seller
  const effectiveMarketingRatio = Math.min(marketersPerSeller, maxMarketingRatio);
  const marketingMultiplier = 1 + (effectiveMarketingRatio * 0.25); // Each marketer adds 25% up to 50% max
  
  const marketFitMultiplier = 0.5 + (productMarketFit * 0.5);
  
  return baseRevenuePerSale * salesCount * stageMultiplier * marketingMultiplier * marketFitMultiplier;
}

export function calculateValuation(
  revenue: number,
  productMaturity: number,
  teamSize: number,
  growthTrajectory: number,
  productStage?: ProductMilestone
): number {
  const revenueMultiple = 10; // Standard SaaS multiple
  const revenueValue = revenue * revenueMultiple;
  const productValue = productMaturity * 500000;
  const teamValue = teamSize * 50000;
  const growthPremium = growthTrajectory * 1000000;
  
  // Stage-based valuation multiplier
  if (productStage) {
    const stageMultipliers: Record<ProductMilestone, number> = {
      'idea': 0.5,       // 50% of base valuation at idea
      'mvp': 0.7,       // 70% at MVP
      'validated': 0.9, // 90% at validated
      'growing': 1.1,   // 110% at growing (premium)
      'mature': 1.3     // 130% at mature (strong premium)
    };
    
    const stageMultiplier = stageMultipliers[productStage] || 0.5;
    return (revenueValue + productValue + teamValue + growthPremium) * stageMultiplier;
  }
  
  return revenueValue + productValue + teamValue + growthPremium;
}
