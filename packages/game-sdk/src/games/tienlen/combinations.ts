import { Card } from '../../core/Card';
import { TIENLEN_RANK_ORDER, rankValue } from '../../core/rankOrder';
import { CombinationType } from './types';

export { CombinationType };

/**
 * Detect which combination type a set of cards forms.
 * Returns null if the cards do not form a valid combination.
 */
export function detectCombination(cards: Card[]): CombinationType | null {
  if (cards.length === 0) return null;

  // Count cards per rank
  const rankCounts = new Map<string, number>();
  for (const card of cards) {
    rankCounts.set(card.rank, (rankCounts.get(card.rank) ?? 0) + 1);
  }

  // SINGLE
  if (cards.length === 1) return CombinationType.SINGLE;

  // PAIR
  if (cards.length === 2 && [...rankCounts.values()].every(c => c <= 2)) {
    const counts = [...rankCounts.values()];
    if (counts.length === 1) return CombinationType.PAIR;
    // Exactly one pair + rest singles? No — for 2 cards it's just PAIR
    if (counts.length === 2) {
      // could be PAIR_STRAIGHT or FOUR_CONSECUTIVE_PAIRS in longer hand — ignore for 2
    }
  }

  // Count helpers
  const countForRank = (r: string) => rankCounts.get(r) ?? 0;
  const counts = [...rankCounts.values()];
  const maxCount = Math.max(...counts);
  const uniqueRanks = [...rankCounts.keys()];

  // FOUR_OF_A_KIND
  if (cards.length === 4 && maxCount === 4) return CombinationType.FOUR_OF_A_KIND;

  // TRIPLE
  if (cards.length === 3 && maxCount === 3) return CombinationType.TRIPLE;

  // PAIR
  if (cards.length === 2 && maxCount === 2) return CombinationType.PAIR;

  // STRAIGHT — 3+ consecutive ranks (TLMN: 2 is never in a straight)
  if (cards.length >= 3) {
    if (isStraight(cards)) return CombinationType.STRAIGHT;
  }

  // PAIR_STRAIGHT — 3+ consecutive pairs
  if (cards.length >= 6 && cards.length % 2 === 0) {
    if (isNConsecutivePairs(cards, rankCounts, 4)) return CombinationType.FOUR_CONSECUTIVE_PAIRS;
    if (isNConsecutivePairs(cards, rankCounts, 3)) return CombinationType.PAIR_STRAIGHT;
  }

  return null;
}

function isStraight(cards: Card[]): boolean {
  // Rule: 2 (Heo) is NEVER in a straight. No wrap-arounds, no K-A-2, no A-2-3-4-5.
  if (cards.some(c => c.rank === '2')) return false;

  const values = cards.map(c => rankValue(c, TIENLEN_RANK_ORDER)).sort((a, b) => a - b);
  for (let i = 1; i < values.length; i++) {
    if (values[i] !== values[i - 1] + 1) return false;
  }
  return true;
}

function isNConsecutivePairs(cards: Card[], rankCounts: Map<string, number>, minPairs: number): boolean {
  const pairCounts = new Map<number, number>(); // rank index → count
  for (const [rank, count] of rankCounts) {
    if (count === 2) {
      const idx = TIENLEN_RANK_ORDER[rank] as number;
      pairCounts.set(idx, 2);
    } else if (count !== 2) {
      return false; // non-pair card in hand
    }
  }

  const pairIndices = [...pairCounts.keys()].sort((a, b) => a - b);
  if (pairIndices.length < minPairs) return false;

  // Check consecutive (each next = prev + 1)
  for (let i = 1; i < pairIndices.length; i++) {
    if (pairIndices[i] !== pairIndices[i - 1] + 1) return false;
  }

  // All cards in hand must be part of these pairs
  const totalCardsInPairs = pairIndices.length * 2;
  return totalCardsInPairs === cards.length;
}