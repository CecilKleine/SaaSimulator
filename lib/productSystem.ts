import { ProductState, ProductMilestone } from '@/types/product';
import { TeamState } from '@/types/employee';
import { calculateTeamProductivity } from './calculations';

export function updateProductSystem(product: ProductState, team: TeamState): ProductState {
  const updated = { ...product };
  
  // Calculate development speed based on team productivity
  const teamProductivity = calculateTeamProductivity(team.employees);
  
  // Engineers contribute most to development
  const engineerCount = team.employees.filter(e => e.role === 'engineer' && e.onboardingComplete).length;
  const baseSpeed = engineerCount * 0.5; // Base speed per engineer per day
  const productivityMultiplier = 1 + (teamProductivity * 0.1);
  
  const dailyProgress = baseSpeed * productivityMultiplier;
  
  // Update features based on priority, adjusted by complexity
  const activeFeatures = updated.features.filter(f => f.progress < 100).sort((a, b) => a.priority - b.priority);
  
  if (activeFeatures.length > 0) {
    // Primary feature - complexity inversely affects progress (higher complexity = slower)
    const primaryFeature = activeFeatures[0];
    const complexityFactor = 1 / (primaryFeature.baseComplexity / 5); // Normalize: complexity 5 = 1x, complexity 10 = 0.5x, complexity 2 = 2.5x
    primaryFeature.progress = Math.min(100, primaryFeature.progress + (dailyProgress * 0.7 * complexityFactor));
    
    // Secondary features get less progress, also adjusted by complexity
    if (activeFeatures.length > 1 && dailyProgress > 1) {
      const secondaryFeature = activeFeatures[1];
      const secondaryComplexityFactor = 1 / (secondaryFeature.baseComplexity / 5);
      secondaryFeature.progress = Math.min(100, secondaryFeature.progress + (dailyProgress * 0.3 * secondaryComplexityFactor));
    }
  }
  
  // Update overall progress based on feature completion (weighted by complexity)
  const totalComplexity = updated.features.reduce((sum, f) => sum + f.baseComplexity, 0);
  const weightedProgress = updated.features.reduce((sum, f) => sum + (f.progress * f.baseComplexity), 0);
  updated.overallProgress = totalComplexity > 0 ? weightedProgress / totalComplexity : 0;
  
  // Update maturity based on overall progress
  updated.maturity = Math.min(1, updated.overallProgress / 100);
  
  // Determine milestone based on completed features (hidden logic)
  updated.currentMilestone = calculateProductStage(updated.features);
  
  // Update product-market fit (simplified - improves with time and product quality)
  if (updated.maturity > 0.5) {
    updated.productMarketFit = Math.min(1, updated.productMarketFit + 0.001);
  }
  
  // Update quality based on designer count
  const designerCount = team.employees.filter(e => e.role === 'designer' && e.onboardingComplete).length;
  if (designerCount > 0) {
    updated.quality = Math.min(1, updated.quality + 0.0005);
  }
  
  return updated;
}

// New function to calculate product stage based on completed features
function calculateProductStage(features: ProductState['features']): ProductMilestone {
  const completedFeatures = features.filter(f => f.progress >= 100);
  const totalFeatures = features.length;
  const completionRatio = totalFeatures > 0 ? completedFeatures.length / totalFeatures : 0;
  
  // Stage thresholds based on feature completion
  if (completionRatio < 0.2) return 'idea';        // 0-20% features
  if (completionRatio < 0.4) return 'mvp';        // 20-40% features
  if (completionRatio < 0.6) return 'validated';  // 40-60% features
  if (completionRatio < 0.8) return 'growing';    // 60-80% features
  return 'mature';                                 // 80-100% features
}
