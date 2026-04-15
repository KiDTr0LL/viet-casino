import { Card } from '../../core/Card';
import { MAUBINH_RANK_ORDER, rankValue } from '../../core/rankOrder';
import { MauBinhHandType } from './types';

/**
 * Score a 5-card Mau Binh hand.
 * Score = typeBonus + kickerScore
 * typeBonus: HIGH_CARD=0, PAIR=1, TWO_PAIR=2, THREE=3, STRAIGHT=4,
 *           FLUSH=5, FULL_HOUSE=6, QUADS=7, STRAIGHT_FLUSH=8
 * All multiplied by 100 so type dominates; kickers determine ties within type.
 */
export function evaluateHand(cards: Card[]): number {
  if (cards.length === 5) return evaluate5(cards);
  if (cards.length === 3) return evaluate3(cards);
  return 0;
}

function countRanks(cards: Card[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const card of cards) {
    counts.set(card.rank, (counts.get(card.rank) ?? 0) + 1);
  }
  return counts;
}

function sortedRankValues(cards: Card[]): number[] {
  return cards
    .map(c => rankValue(c, MAUBINH_RANK_ORDER))
    .sort((a, b) => b - a); // descending
}

function evaluate5(cards: Card[]): number {
  const counts = countRanks(cards);
  const countValues = [...counts.values()];
  const maxCount = Math.max(...countValues);

  // Four of a kind
  if (maxCount === 4) {
    const quadRank = [...counts.entries()]
      .find(([, c]) => c === 4)![0];
    return typeScore(MauBinhHandType.FOUR_OF_A_KIND, rankValueStr(quadRank));
  }

  // Straight flush (both flush AND straight) — highest; check before each alone
  if (isFlush(cards) && isStraight5(cards)) {
    const high = straightHighCard(cards);
    return typeScore(MauBinhHandType.STRAIGHT_FLUSH, high);
  }

  // Flush
  if (isFlush(cards)) {
    return flushScore(cards);
  }

  // Straight
  if (isStraight5(cards)) {
    const high = straightHighCard(cards);
    return typeScore(MauBinhHandType.STRAIGHT, high);
  }

  // Full house
  if (maxCount === 3 && countValues.includes(2)) {
    const tripRank = [...counts.entries()]
      .find(([, c]) => c === 3)![0];
    return typeScore(MauBinhHandType.FULL_HOUSE, rankValueStr(tripRank));
  }

  // Three of a kind
  if (maxCount === 3) {
    const tripRank = [...counts.entries()]
      .find(([, c]) => c === 3)![0];
    return typeScore(MauBinhHandType.THREE_OF_A_KIND, rankValueStr(tripRank));
  }

  // Two pair
  if (countValues.filter(c => c === 2).length === 2) {
    const pairs = [...counts.entries()]
      .filter(([, c]) => c === 2)
      .map(([r]) => rankValueStr(r))
      .sort((a, b) => b - a);
    return typeScore(MauBinhHandType.TWO_PAIR, pairs[0], pairs[1]);
  }

  // Pair
  if (maxCount === 2) {
    const pairRank = [...counts.entries()]
      .find(([, c]) => c === 2)![0];
    const kickerRank = sortedRankValues(cards)
      .find(r => r !== rankValueStr(pairRank))!;
    return typeScore(MauBinhHandType.PAIR, rankValueStr(pairRank), kickerRank);
  }

  // High card
  return highCardScore(cards);
}

function evaluate3(cards: Card[]): number {
  const counts = countRanks(cards);
  const countValues = [...counts.values()];
  const maxCount = Math.max(...countValues);

  // Three of a kind
  if (maxCount === 3) {
    const tripRank = [...counts.entries()]
      .find(([, c]) => c === 3)![0];
    return typeScore(MauBinhHandType.THREE_OF_A_KIND, rankValueStr(tripRank));
  }

  // Pair
  if (maxCount === 2) {
    const pairRank = [...counts.entries()]
      .find(([, c]) => c === 2)![0];
    const kickerRank = sortedRankValues(cards)
      .find(r => r !== rankValueStr(pairRank))!;
    return typeScore(MauBinhHandType.PAIR, rankValueStr(pairRank), kickerRank);
  }

  // High card
  return highCardScore(cards);
}

// ---- Scoring helpers ----

function typeScore(type: number, kicker1: number, kicker2?: number): number {
  return type * 100 + kicker1 + (kicker2 ?? 0) / 10;
}

function rankValueStr(rank: string): number {
  return MAUBINH_RANK_ORDER[rank] ?? 0;
}

function highCardScore(cards: Card[]): number {
  // Sum of descending rank values (for tiebreaking only — type=0 dominates)
  const sorted = sortedRankValues(cards);
  return sorted.reduce((acc, r, i) => acc + r / Math.pow(13, i + 1), 0);
}

function flushScore(cards: Card[]): number {
  // Flush: type bonus (×100) dominates. Kickers weighted ×0.1 so a royal flush
  // (max kickers) still scores less than a higher hand type (e.g. straight flush).
  const sorted = sortedRankValues(cards);
  return typeScore(MauBinhHandType.FLUSH,
    sorted[0] * 0.1 + sorted[1] * 0.1 + sorted[2] * 0.1 + sorted[3] * 0.1 + sorted[4] * 0.1);
}

function isFlush(cards: Card[]): boolean {
  return cards.every(c => c.suit === cards[0].suit);
}

function isStraight5(cards: Card[]): boolean {
  const values = sortedRankValues(cards);
  // Wheel check: A-5-4-3-2 → values [12,3,2,1,0] → after uniq+sort [0,1,2,3,12]
  if (values[0] === 12 && values[1] === 3 &&
      values[2] === 2 && values[3] === 1 && values[4] === 0) {
    return true;
  }
  for (let i = 1; i < values.length; i++) {
    if (values[i] !== values[i - 1] - 1) return false;
  }
  return true;
}

function straightHighCard(cards: Card[]): number {
  const values = sortedRankValues(cards);
  // Wheel: high card is 3 (not A=12)
  if (values[0] === 12 && values[1] === 3) return 3;
  return values[0];
}