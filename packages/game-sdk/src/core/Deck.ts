import { Card } from './Card';

/**
 * Fisher-Yates shuffle — mutates the array in place.
 */
function shuffle<T>(arr: T[]): void {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
}

/**
 * Build a fresh 52-card deck in new Array.
 */
function buildDeck(): Card[] {
  const ranks = ['3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', '2'] as const;
  const suits = ['SPADES', 'HEARTS', 'DIAMONDS', 'CLUBS'] as const;
  const deck: Card[] = [];
  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push(new Card(rank, suit));
    }
  }
  return deck;
}

/**
 * Shuffle and deal `playerCount` hands of 13 cards each.
 * @param playerCount number of hands to deal (2–4). Throws if playerCount * 13 exceeds 52.
 */
export function dealCards(playerCount: number): Card[][] {
  if (playerCount * 13 > 52) {
    throw new Error(`Cannot deal ${playerCount} hands of 13 cards: only 52 cards in deck`);
  }
  const deck = buildDeck();
  shuffle(deck);
  const hands: Card[][] = Array.from({ length: playerCount }, () => []);
  for (let i = 0; i < playerCount * 13; i++) {
    hands[i % playerCount].push(deck[i]);
  }
  return hands;
}