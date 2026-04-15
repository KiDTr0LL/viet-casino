import { MauBinhHand } from './types';
import { evaluateHand } from './handEvaluator';

/**
 * Check if a Mau Binh hand is a foul (Binh Lủng).
 * A foul occurs when a weaker row ties or outranks a stronger row.
 * Rule: back > middle > front  (strict inequality)
 */
export function isFoul(hand: MauBinhHand): boolean {
  const frontScore = evaluateHand(hand.front);
  const middleScore = evaluateHand(hand.middle);
  const backScore = evaluateHand(hand.back);

  // Back must be strictly stronger than middle
  if (backScore <= middleScore) return true;
  // Middle must be strictly stronger than front
  if (middleScore <= frontScore) return true;

  return false;
}