import { Card } from '../../core/Card';

export interface FirstPlayResult {
  valid: boolean;
  error?: string;
}

/**
 * Check if a 13-card hand is valid to play as the first play of the round.
 * Tiến Lên rule: the hand must contain the 3 of Spades.
 */
export function isValidFirstPlay(hand: Card[]): FirstPlayResult {
  if (hand.length === 0) {
    return { valid: false, error: 'Hand is empty' };
  }
  const hasThreeOfSpades = hand.some(c => c.rank === '3' && c.suit === 'SPADES');
  if (!hasThreeOfSpades) {
    return { valid: false, error: 'Hand must contain the 3 of Spades (3♠)' };
  }
  return { valid: true };
}