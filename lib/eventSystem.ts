import { EventState, GameEvent } from '@/types/events';
import { GameState } from '@/types/game';

export function updateEventSystem(events: EventState, gameState: GameState): EventState {
  const updated = { ...events };
  
  // Generate random events (1-3 per month, probability-based)
  const daysSinceLastEvent = gameState.currentTime - updated.lastEventTime;
  const shouldGenerateEvent = daysSinceLastEvent >= 10 && Math.random() < 0.3;
  
  if (shouldGenerateEvent && updated.pendingEvents.length < 3) {
    const newEvent = generateRandomEvent(gameState);
    if (newEvent) {
      updated.pendingEvents.push(newEvent);
      updated.lastEventTime = gameState.currentTime;
    }
  }
  
  // Remove expired events
  updated.pendingEvents = updated.pendingEvents.filter(event => {
    if (event.expiresAt && gameState.currentTime > event.expiresAt) {
      return false;
    }
    return true;
  });
  
  return updated;
}

function generateRandomEvent(gameState: GameState): GameEvent | null {
  const eventTypes = [
    generateHiringEvent,
    generateProductEvent,
    generateFinancialEvent,
    generateMarketEvent,
  ];
  
  const generator = eventTypes[Math.floor(Math.random() * eventTypes.length)];
  return generator(gameState);
}

function generateHiringEvent(gameState: GameState): GameEvent {
  const events = [
    {
      id: `event-${Date.now()}-1`,
      type: 'team' as const,
      title: 'Tech Talent Market Crash',
      description: 'Due to market conditions, hiring costs have dropped significantly. Great time to hire!',
      options: [
        {
          id: 'hire-now',
          label: 'Hire Aggressively',
          description: 'Take advantage of low costs',
          effects: [
            {
              type: 'expense' as const,
              value: -0.2, // 20% reduction in hiring costs for 2 months
              description: 'Hiring costs reduced 20% for 2 months',
            },
          ],
        },
        {
          id: 'wait',
          label: 'Wait',
          description: 'Keep current strategy',
          effects: [],
        },
      ],
      triggeredAt: gameState.currentTime,
      expiresAt: gameState.currentTime + 7,
    },
    {
      id: `event-${Date.now()}-2`,
      type: 'team' as const,
      title: 'Key Employee Competing Offer',
      description: 'One of your key employees received a competing offer. They want a raise or they\'ll leave.',
      options: [
        {
          id: 'give-raise',
          label: 'Give Raise',
          description: 'Increase salary by $2k/month to retain them',
          effects: [
            {
              type: 'expense' as const,
              value: 2000,
              description: 'Monthly expenses increased by $2k',
            },
          ],
        },
        {
          id: 'let-go',
          label: 'Let Them Go',
          description: 'Accept the productivity loss',
          effects: [
            {
              type: 'product' as const,
              value: -5,
              description: 'Product development slowed',
            },
          ],
        },
      ],
      triggeredAt: gameState.currentTime,
      expiresAt: gameState.currentTime + 3,
    },
  ];
  
  return events[Math.floor(Math.random() * events.length)];
}

function generateProductEvent(gameState: GameState): GameEvent {
  return {
    id: `event-${Date.now()}-3`,
    type: 'product',
    title: 'Technical Breakthrough',
    description: 'Your team made a significant technical breakthrough!',
    options: [
      {
        id: 'boost',
        label: 'Apply Breakthrough',
        description: 'Accelerate product development',
        effects: [
          {
            type: 'product',
            value: 5,
            description: 'Product progress increased by 5%',
          },
        ],
      },
    ],
    triggeredAt: gameState.currentTime,
    expiresAt: gameState.currentTime + 1,
  };
}

function generateFinancialEvent(gameState: GameState): GameEvent {
  if (gameState.runway < 3) {
    return {
      id: `event-${Date.now()}-4`,
      type: 'financial',
      title: 'Emergency Funding Opportunity',
      description: 'An angel investor offers emergency funding at unfavorable terms due to your low runway.',
      options: [
        {
          id: 'take-emergency',
          label: 'Take Emergency Funding',
          description: 'Get $100k at 15% equity (poor terms)',
          effects: [
            {
              type: 'money',
              value: 100000,
              description: 'Received $100k',
            },
          ],
        },
        {
          id: 'decline',
          label: 'Decline',
          description: 'Try to survive without it',
          effects: [],
        },
      ],
      triggeredAt: gameState.currentTime,
      expiresAt: gameState.currentTime + 2,
    };
  }
  
  return {
    id: `event-${Date.now()}-5`,
    type: 'financial',
    title: 'Unexpected Expense',
    description: 'An unexpected legal fee of $5,000 is due.',
    options: [
      {
        id: 'pay',
        label: 'Pay It',
        description: 'Pay the fee',
        effects: [
          {
            type: 'money',
            value: -5000,
            description: 'Paid $5,000',
          },
        ],
      },
    ],
    triggeredAt: gameState.currentTime,
    expiresAt: gameState.currentTime + 1,
  };
}

function generateMarketEvent(gameState: GameState): GameEvent {
  return {
    id: `event-${Date.now()}-6`,
    type: 'market',
    title: 'Market Opportunity',
    description: 'A large enterprise customer is interested, but needs a custom feature built.',
    options: [
      {
        id: 'build-feature',
        label: 'Build Custom Feature',
        description: 'Spend 1 month dev time, get $50k contract',
        effects: [
          {
            type: 'product',
            value: -10, // Delay other features
            description: 'Other features delayed',
          },
          {
            type: 'money',
            value: 50000,
            description: 'Received $50k contract',
          },
        ],
      },
      {
        id: 'decline',
        label: 'Decline',
        description: 'Focus on core product',
        effects: [],
      },
    ],
    triggeredAt: gameState.currentTime,
    expiresAt: gameState.currentTime + 5,
  };
}
