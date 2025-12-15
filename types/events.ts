export type EventType = 'market' | 'team' | 'product' | 'financial' | 'investor';

export interface EventEffect {
  type: 'money' | 'expense' | 'team' | 'product' | 'revenue' | 'market';
  value: number;
  description: string;
}

export interface GameEvent {
  id: string;
  type: EventType;
  title: string;
  description: string;
  options: EventOption[];
  triggeredAt: number;
  expiresAt?: number;
}

export interface EventOption {
  id: string;
  label: string;
  description: string;
  effects: EventEffect[];
  consequences?: string;
}

export interface EventState {
  pendingEvents: GameEvent[];
  eventHistory: GameEvent[];
  lastEventTime: number;
}
