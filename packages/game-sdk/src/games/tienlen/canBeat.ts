import { Card } from '../../core/Card';
import { TIENLEN_RANK_ORDER, rankValue } from '../../core/rankOrder';
import { CombinationType, detectCombination } from './combinations';

/**
 * Returns true if myCards can beat tableCards according to TLMN rules.
 *
 * Rules (PRD §6.1):
 * - Any valid combination can be played when table is empty (null).
 * - Same type: compare strength (same-type only — cross-type is always false).
 * - Straight: same-length → compare high card; cross-length is NOT directly comparable.
 * - CHẶT HEO bombing:
 *   - 3 Đôi Thông (3 consecutive pairs) → cuts a single 2.
 *   - Tứ Quý (four of a kind) → cuts single 2, Pair of 2s, or 3 Đôi Thông.
 *   - 4 Đôi Thông (4 consecutive pairs) → cuts single 2, Pair of 2s,
 *     3 Đôi Thông, or Tứ Quý (also out-of-turn cuttable).
 *
 * NOTE: 4 Đôi Thông can be played out of turn to cut a 2 (Chặt Heo).
 * That mechanic is handled at the game layer; canBeat only checks if
 * myCards *could* beat tableCards if played normally or via bombing.
 */
export function canBeat(myCards: Card[], tableCards: Card[] | null): boolean {
  if (tableCards === null) {
    return detectCombination(myCards) !== null;
  }

  const myType = detectCombination(myCards);
  const tableType = detectCombination(tableCards);

  if (myType === null || tableType === null) return false;

  // Same type — compare strengths
  if (myType === tableType) return sameTypeBeats(myCards, tableCards);

  // CHẶT HEO: bombs cutting special targets
  return bombBeats(myCards, tableCards);
}

// ---- Same-type strength comparison ----

function sameTypeBeats(myCards: Card[], tableCards: Card[]): boolean {
  const type = detectCombination(myCards)!;
  const myStr = playStrength(myCards);
  const tableStr = playStrength(tableCards);

  switch (type) {
    case CombinationType.SINGLE:
    case CombinationType.PAIR:
    case CombinationType.TRIPLE:
      // Same rank → tie (cannot beat)
      if (myStr === tableStr) return false;
      return myStr > tableStr;

    case CombinationType.STRAIGHT: {
      // Same length required; compare high card
      if (myCards.length !== tableCards.length) return false;
      if (myStr === tableStr) return false;
      return myStr > tableStr;
    }

    case CombinationType.PAIR_STRAIGHT:
    case CombinationType.FOUR_CONSECUTIVE_PAIRS: {
      // Compare lowest pair rank (lowest is weakest point of the straight)
      if (myStr === tableStr) return false;
      return myStr > tableStr;
    }

    default:
      return false;
  }
}

/**
 * Compute a comparable strength value for a play.
 * Higher = stronger.
 *
 * SINGLE / PAIR / TRIPLE: rank value of the main rank
 * STRAIGHT: (length << 8) + high-card rank value
 * PAIR_STRAIGHT / FOUR_CONSECUTIVE_PAIRS: lowest pair rank value
 */
function playStrength(cards: Card[]): number {
  const type = detectCombination(cards)!;
  const sorted = cards
    .map(c => rankValue(c, TIENLEN_RANK_ORDER))
    .sort((a, b) => b - a); // descending

  switch (type) {
    case CombinationType.SINGLE:
    case CombinationType.PAIR:
    case CombinationType.TRIPLE:
      return sorted[0];

    case CombinationType.STRAIGHT: {
      const len = cards.length;
      const highCard = sorted[0];
      // Pack length in upper bits, high card in lower
      return (len << 8) | highCard;
    }

    case CombinationType.PAIR_STRAIGHT:
    case CombinationType.FOUR_CONSECUTIVE_PAIRS: {
      // Find lowest pair rank to compare
      const rankCounts = new Map<string, number>();
      for (const card of cards) {
        rankCounts.set(card.rank, (rankCounts.get(card.rank) ?? 0) + 1);
      }
      const pairRanks = [...rankCounts.entries()]
        .filter(([, c]) => c === 2)
        .map(([r]) => rankValue({ rank: r } as Card, TIENLEN_RANK_ORDER));
      const lowest = Math.min(...pairRanks);
      return lowest;
    }

    default:
      return 0;
  }
}

// ---- Bombing comparison ----

/**
 * Returns true if my bomb can beat tableCards under Chặt Heo rules.
 * Returns false if no bombing relationship exists.
 */
function bombBeats(myCards: Card[], tableCards: Card[]): boolean {
  const myType = detectCombination(myCards)!;

  switch (myType) {
    case CombinationType.FOUR_OF_A_KIND: {
      // Tứ Quý cuts: single 2, Pair of 2s, 3 Đôi Thông
      if (!isSingleOrPair(tableCards)) return false;
      return isTarget2(tableCards) || isPairOf2s(tableCards) || is3DoiThong(tableCards);
    }

    case CombinationType.FOUR_CONSECUTIVE_PAIRS: {
      // 4 Đôi Thông cuts: single 2, Pair of 2s, 3 Đôi Thông, Tứ Quý
      const tableType = detectCombination(tableCards)!;
      if (tableType === CombinationType.SINGLE) return isTarget2(tableCards);
      if (tableType === CombinationType.PAIR) {
        return isTarget2(tableCards) || isPairOf2s(tableCards);
      }
      if (tableType === CombinationType.PAIR_STRAIGHT) return is3DoiThong(tableCards);
      if (tableType === CombinationType.FOUR_OF_A_KIND) return true; // 4 Đôi Thông cuts Tứ Quý
      return false;
    }

    case CombinationType.PAIR_STRAIGHT: {
      // 3 Đôi Thông cuts a single 2
      if (!isSingle(tableCards)) return false;
      return isTarget2(tableCards);
    }

    default:
      return false;
  }
}

// ---- Helpers ----

function isSingle(cards: Card[]): boolean {
  return cards.length === 1;
}

function isSingleOrPair(cards: Card[]): boolean {
  return cards.length === 1 || cards.length === 2;
}

function isTarget2(cards: Card[]): boolean {
  return cards.length === 1 && cards[0].rank === '2';
}

function isPairOf2s(cards: Card[]): boolean {
  return (
    cards.length === 2 &&
    cards.every(c => c.rank === '2')
  );
}

function is3DoiThong(cards: Card[]): boolean {
  return detectCombination(cards) === CombinationType.PAIR_STRAIGHT;
}