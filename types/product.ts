export type ProductMilestone = 'idea' | 'mvp' | 'validated' | 'growing' | 'mature';

export interface Feature {
  id: string;
  name: string;
  description: string;
  progress: number; // 0-100
  priority: number;
  baseComplexity: number; // 1-10 scale, affects development speed
  unlocksCapability?: string; // e.g., "revenue", "mobile", etc.
}

export interface ProductState {
  overallProgress: number; // 0-100
  currentMilestone: ProductMilestone;
  features: Feature[];
  maturity: number; // 0-1, affects revenue potential
  quality: number; // 0-1, affects user adoption
  productMarketFit: number; // 0-1 score
  productTemplateId?: string; // Reference to the selected product template
}
