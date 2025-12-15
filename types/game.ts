import { Employee, TeamState } from './employee';
import { ProductState } from './product';
import { FundingState } from './funding';
import { EventState } from './events';

export interface GameState {
  // Financial
  money: number;
  monthlyExpenses: number;
  monthlyRevenue: number;
  burnRate: number;
  runway: number; // Months until out of money
  
  // Time
  currentTime: number; // Game time in days elapsed
  startDate: string; // ISO date string of when the game started (real calendar date)
  
  // Systems
  team: TeamState;
  product: ProductState;
  funding: FundingState;
  events: EventState;
  
  // Game status
  isPaused: boolean;
  gameSpeed: number; // 1x, 2x, 4x
  gameOver: boolean;
  gameOverReason?: string;
}

export interface GameAction {
  type: 'hire' | 'fire' | 'prioritizeFeature' | 'startFundraising' | 'acceptFunding' | 'respondToEvent';
  payload: any;
}

export interface InitialGameConfig {
  startingMoney: number;
  difficulty: 'easy' | 'medium' | 'hard';
}
