import { Card } from '../core/Card';
import { TIENLEN_RANK_ORDER, rankValue } from '../core/rankOrder';

/**
 * Game mode for instant win detection.
 */
export type GameMode = 'TIENLEN' | 'MAUBINH';

/**
 * Instant win types for Tiến Lên Miền Nam and Mậu Binh.
 * Priority order within each game is defined by the order checked in detectInstantWin.
 */
export enum InstantWinType {
  // TLMN — highest priority first (Sảnh Rồng wins over everything)
  /** Tiến Lên Miền Nam — 12 consecutive cards 3→A */
  SANH_RONG = 'SANH_RONG',
  /** Tiến Lên Miền Nam — all four 2s */
  TU_QUY_HEO = 'TU_QUY_HEO',
  /** Tiến Lên Miền Nam — 5 consecutive pairs */
  NG_DOI_THONG = 'NG_DOI_THONG',
  /** Tiến Lên Miền Nam — 6 pairs (not required consecutive) */
  SAU_DOI = 'SAU_DOI',

  // Mậu Binh — highest priority first (Dragon Flush wins over Dragon)
  /** Mậu Binh — all 13 cards consecutive 2→A */
  SANH_RONG_MB = 'SANH_RONG_MB',
  /** Mậu Binh — all 13 cards same suit AND consecutive (Dragon Flush) */
  SANH_RONG_DONG_HOA = 'SANH_RONG_DONG_HOA',
  /** Mậu Binh — exactly 6 pairs in 13 cards */
  LUC_PHE_BON = 'LUC_PHE_BON',
  /** Mậu Binh — 3 Flushes (flush in Bottom + Middle, same-suit triplet in Top) */
  BA_CAI_THUNG = 'BA_CAI_THUNG',
  /** Mậu Binh — 3 Straights (straight in Bottom + Middle, 3 consecutive in Top) */
  BA_CAI_SANH = 'BA_CAI_SANH',
}

/**
 * Detect instant win condition for a hand.
 * @param hand — array of Cards dealt to a single player
 * @param mode — 'TIENLEN' or 'MAUBINH' — determines which win conditions apply
 * @returns the InstantWinType, or null if no instant win applies
 */
export function detectInstantWin(hand: Card[], mode: GameMode = 'TIENLEN'): InstantWinType | null {
  if (mode === 'MAUBINH') return detectMauBinhInstantWin(hand);
  return detectTLMNInstantWin(hand);
}

// ─────────────────────────────────────────────────────────────────────────────
// Tiến Lên Miền Nam
// ─────────────────────────────────────────────────────────────────────────────

function detectTLMNInstantWin(hand: Card[]): InstantWinType | null {
  const rankCounts = countRanks(hand);
  const totalCards = hand.length;

  // Tứ Quý Heo — all four 2s
  if (rankCounts.get('2') === 4) return InstantWinType.TU_QUY_HEO;

  // Sảnh Rồng — 12 consecutive cards 3→A
  if (totalCards === 12 && isConsecutiveRun(hand, '3', 'A')) return InstantWinType.SANH_RONG;

  // 6 Đôi — exactly 6 pairs (13 cards = 12 pair cards + 1 kicker)
  if (countPairs(hand) === 6) return InstantWinType.SAU_DOI;

  // 5 Đôi Thông — 5 consecutive pairs
  if (countNConsecutivePairs(hand, 5) >= 5) return InstantWinType.NG_DOI_THONG;

  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Mậu Binh
// ─────────────────────────────────────────────────────────────────────────────

function detectMauBinhInstantWin(hand: Card[]): InstantWinType | null {
  if (hand.length !== 13) return null;

  const ranks = hand.map(c => c.rank);
  const suits = hand.map(c => c.suit);

  // Sảnh Rồng Đồng Hoa — all same suit AND consecutive 2→A
  const allSameSuit = suits.every(s => s === suits[0]);
  if (allSameSuit && isConsecutiveRun(hand, '2', 'A')) {
    return InstantWinType.SANH_RONG_DONG_HOA;
  }

  // Sảnh Rồng — 13 consecutive cards 2→A
  if (isConsecutiveRun(hand, '2', 'A')) return InstantWinType.SANH_RONG_MB;

  // Lục Phé Bôn — exactly 6 pairs
  if (countPairs(hand) === 6) return InstantWinType.LUC_PHE_BON;

  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared helpers
// ─────────────────────────────────────────────────────────────────────────────

function countRanks(cards: Card[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const card of cards) {
    counts.set(card.rank, (counts.get(card.rank) ?? 0) + 1);
  }
  return counts;
}

function countPairs(cards: Card[]): number {
  const counts = countRanks(cards);
  let pairs = 0;
  for (const count of counts.values()) {
    if (count >= 2) pairs += 1; // 1 per pair-rank, regardless of whether it's double/triple/quad
  }
  return pairs;
}

function countNConsecutivePairs(cards: Card[], minPairs: number): number {
  const counts = countRanks(cards);
  const pairRanks: number[] = [];

  for (const [rank, count] of counts) {
    if (count === 2) {
      pairRanks.push(TIENLEN_RANK_ORDER[rank] ?? -1);
    }
  }

  pairRanks.sort((a, b) => a - b);
  let maxConsecutive = 0;
  let current = 0;

  for (let i = 0; i < pairRanks.length; i++) {
    if (i === 0 || pairRanks[i] !== pairRanks[i - 1] + 1) {
      current = 1;
    } else {
      current++;
    }
    if (current > maxConsecutive) maxConsecutive = current;
  }

  return maxConsecutive;
}

/**
 * Check if a hand contains exactly the consecutive ranks from startRank to endRank.
 */
function isConsecutiveRun(cards: Card[], startRank: string, endRank: string): boolean {
  const startIdx = TIENLEN_RANK_ORDER[startRank] ?? 0;
  const endIdx = TIENLEN_RANK_ORDER[endRank] ?? 12;

  // Special case: Dragon wraps through '2' which ranks AFTER 'A' in TLMN order
  // Check if hand covers a wrap-around (e.g. '2' → 'A' in a 13-card consecutive run)
  if (startIdx > endIdx) {
    // Count ranks in the hand
    const rankCountMap = countRanks(cards);
    if (cards.length !== endIdx + (13 - startIdx) + 1) return false;
    // Check all ranks from startIdx to 12 are present
    for (let i = startIdx; i <= 12; i++) {
      const r = rankIndexToRank(i);
      if (!rankCountMap.has(r)) return false;
    }
    // Check all ranks from 0 to endIdx are present
    for (let i = 0; i <= endIdx; i++) {
      const r = rankIndexToRank(i);
      if (!rankCountMap.has(r)) return false;
    }
    return true;
  }

  const expectedLength = endIdx - startIdx + 1;
  if (cards.length !== expectedLength) return false;

  const rankCountMap = countRanks(cards);
  for (let i = startIdx; i <= endIdx; i++) {
    const r = rankIndexToRank(i);
    if (!rankCountMap.has(r)) return false;
  }

  return true;
}

function rankIndexToRank(idx: number): string {
  const rankNames: Record<number, string> = {
    0: '3', 1: '4', 2: '5', 3: '6', 4: '7',
    5: '8', 6: '9', 7: '10', 8: 'J', 9: 'Q',
    10: 'K', 11: 'A', 12: '2',
  };
  return rankNames[idx] ?? '';
}