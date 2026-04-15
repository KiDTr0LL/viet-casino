import { MauBinhHand } from './types';
import { evaluateHand } from './handEvaluator';

/**
 * Result of a head-to-head Mau Binh comparison.
 */
export type BeatResult = 'MINE' | 'OPP' | 'TIE';

/**
 * Compare two complete 13-card Mậu Binh hands row by row.
 * Winner is whoever wins more of the 3 rows.
 * Tie: when both players win the same number of rows (1-1 or 0-0).
 */
export function canBeat(
  myHand: MauBinhHand,
  opponentHand: MauBinhHand,
): BeatResult {
  const myFront = evaluateHand(myHand.front);
  const myMid = evaluateHand(myHand.middle);
  const myBack = evaluateHand(myHand.back);

  const oppFront = evaluateHand(opponentHand.front);
  const oppMid = evaluateHand(opponentHand.middle);
  const oppBack = evaluateHand(opponentHand.back);

  let mineWins = 0;
  let oppWins = 0;

  if (myFront > oppFront) mineWins++;
  else if (myFront < oppFront) oppWins++;

  if (myMid > oppMid) mineWins++;
  else if (myMid < oppMid) oppWins++;

  if (myBack > oppBack) mineWins++;
  else if (myBack < oppBack) oppWins++;

  if (mineWins > oppWins) return 'MINE';
  if (oppWins > mineWins) return 'OPP';
  return 'TIE';
}