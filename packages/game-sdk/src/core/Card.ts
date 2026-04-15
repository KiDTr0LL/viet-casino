// eslint-disable-next-line @typescript-eslint/no-explicit-any
const VALID_RANKS_PLAIN: string[] = [
  '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', '2',
];

export const VALID_RANKS = [
  '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', '2',
] as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const VALID_SUITS_PLAIN: string[] = ['SPADES', 'HEARTS', 'DIAMONDS', 'CLUBS'];

export const VALID_SUITS = ['SPADES', 'HEARTS', 'DIAMONDS', 'CLUBS'] as const;

export type Rank = typeof VALID_RANKS[number];
export type Suit = typeof VALID_SUITS[number];

export class Card {
  readonly rank: Rank;
  readonly suit: Suit;

  constructor(rank: string, suit: string) {
    if (!VALID_RANKS_PLAIN.includes(rank)) {
      throw new Error(`Invalid rank: ${rank}`);
    }
    if (!VALID_SUITS_PLAIN.includes(suit)) {
      throw new Error(`Invalid suit: ${suit}`);
    }
    this.rank = rank as Rank;
    this.suit = suit as Suit;
  }

  equals(other: Card): boolean {
    return this.rank === other.rank && this.suit === other.suit;
  }
}