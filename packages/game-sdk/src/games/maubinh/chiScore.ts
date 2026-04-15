import { Card } from '../../core/Card';
import { MauBinhHand } from './types';
import { evaluateHand } from './handEvaluator';

/**
 * Result of a Chi score calculation between two Mậu Binh hands.
 */
export interface ChiScoreResult {
  /** +1/−1/0 per row won/lost/tied. Range −3 to +3. */
  baseChi: number;
  /** Chi Thưởng bonuses (e.g. +3 Sám Chi Cuối, +8 Tứ Quý Chi Giữa). */
  bonuses: number;
  /** Sập Hầm sweep multiplier (baseChi × 2) applied once when all 3 rows won. */
  sweep: number;
  /** baseChi + bonuses + sweep. */
  total: number;
}

/**
 * Compare two Mậu Binh hands row-by-row and compute Chi scoring.
 *
 * Rules (from PRD §6.2):
 * - Base Chi: +1 per won row, −1 per lost row, 0 per tie.
 * - Sám Chi Cuối (Three of a Kind in back): +3
 * - Tứ Quý Chi Giữa (Four of a Kind in middle): +8
 * - Sập Hầm (win all 3 rows): baseChi × 2 added ONCE as sweep.
 */
export function calculateChiScore(
  myHand: MauBinhHand,
  opponentHand: MauBinhHand,
): ChiScoreResult {
  const myFront = evaluateHand(myHand.front);
  const myMid = evaluateHand(myHand.middle);
  const myBack = evaluateHand(myHand.back);

  const oppFront = evaluateHand(opponentHand.front);
  const oppMid = evaluateHand(opponentHand.middle);
  const oppBack = evaluateHand(opponentHand.back);

  // Base chi per row
  const rowFront = sign(myFront - oppFront);
  const rowMid = sign(myMid - oppMid);
  const rowBack = sign(myBack - oppBack);
  const baseChi = rowFront + rowMid + rowBack;

  // Chi Thưởng bonuses
  const bonuses = chiThuong(myHand);

  // Sập Hầm: win all 3 rows → sweep = baseChi × 2
  const isSweep = rowFront === 1 && rowMid === 1 && rowBack === 1;
  const sweep = isSweep ? baseChi * 2 : 0;

  const total = baseChi + bonuses + sweep;

  return { baseChi, bonuses, sweep, total };
}

function sign(n: number): number {
  if (n > 0) return 1;
  if (n < 0) return -1;
  return 0;
}

/**
 * Compute Chi Thưởng bonuses for a single hand.
 * +3 Sám Chi Cuối (Three of a Kind in back)
 * +8 Tứ Quý Chi Giữa (Four of a Kind in middle)
 * TODO: +5 Thùng Phá Sảnh Chi Cuối (Straight Flush in back) — requires detecting it
 */
function chiThuong(hand: MauBinhHand): number {
  let bonus = 0;

  // Sám Chi Cuối: trips in back (5 cards, maxCount === 3)
  if (maxCount(hand.back) === 3) bonus += 3;

  // Tứ Quý Chi Giữa: quads in middle (5 cards, maxCount === 4)
  if (maxCount(hand.middle) === 4) bonus += 8;

  return bonus;
}

function maxCount(cards: Card[]): number {
  const counts = new Map<string, number>();
  for (const card of cards) {
    counts.set(card.rank, (counts.get(card.rank) ?? 0) + 1);
  }
  return Math.max(...counts.values());
}