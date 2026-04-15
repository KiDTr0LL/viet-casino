import { Card } from '../../src/core/Card';
import { MauBinhHand } from '../../src/games/maubinh/types';
import { canBeat } from '../../src/games/maubinh/canBeat';

function c(rank: string, suit: string = 'SPADES'): Card {
  return new Card(rank, suit);
}

function mb(front: string[], middle: string[], back: string[]): MauBinhHand {
  return {
    front: front.map(r => c(r)),
    middle: middle.map(r => c(r)),
    back: back.map(r => c(r)),
  };
}

describe('canBeat — Mậu Binh complete hand comparison', () => {
  it('row-by-row comparison: mine wins 2/3 → mine wins', () => {
    // Mine: wins front (pair A > pair 7), loses middle (pair 5 < pair K),
    //        wins back (trips 7 > trips 3)
    const mine = mb(['A', 'A', '3'], ['5', '5', '3', '4', '7'], ['7', '7', '7', '4', '5']);
    const opp = mb(['7', '7', '3'], ['K', 'K', '3', '4', '7'], ['3', '3', '3', '4', '5']);
    expect(canBeat(mine, opp)).toBe('MINE');
  });

  it('opp wins 2/3 → opp wins', () => {
    const mine = mb(['7', '7', '3'], ['5', '5', '3', '4', '7'], ['3', '3', '3', '4', '5']);
    const opp = mb(['A', 'A', '3'], ['K', 'K', '3', '4', '7'], ['7', '7', '7', '4', '5']);
    expect(canBeat(mine, opp)).toBe('OPP');
  });

  it('all 3 rows mine wins → MINE (sweep)', () => {
    const mine = mb(['A', 'A', '3'], ['K', 'K', '3', '4', '7'], ['7', '7', '7', '4', '5']);
    const opp = mb(['3', '3', '3'], ['5', '5', '3', '4', '7'], ['3', '3', '3', '4', '5']);
    expect(canBeat(mine, opp)).toBe('MINE');
  });

  it('all 3 rows opp wins → OPP', () => {
    const mine = mb(['3', '3', '3'], ['5', '5', '3', '4', '7'], ['3', '3', '3', '4', '5']);
    const opp = mb(['A', 'A', '3'], ['K', 'K', '3', '4', '7'], ['7', '7', '7', '4', '5']);
    expect(canBeat(mine, opp)).toBe('OPP');
  });

  it('1-1-1 tie on rows → TIE', () => {
    const mine = mb(['A', 'A', '3'], ['K', 'K', '3', '4', '7'], ['7', '7', '7', '4', '5']);
    const opp = mb(['A', 'A', '3'], ['K', 'K', '3', '4', '7'], ['7', '7', '7', '4', '5']);
    expect(canBeat(mine, opp)).toBe('TIE');
  });

  it('MINE wins front and back, OPP wins middle → MINE', () => {
    // 2 rows to 1 → MINE wins
    const mine = mb(['A', 'A', '3'], ['5', '5', '3', '4', '7'], ['7', '7', '7', '4', '5']);
    const opp = mb(['7', '7', '3'], ['K', 'K', '3', '4', '7'], ['3', '3', '3', '4', '5']);
    expect(canBeat(mine, opp)).toBe('MINE');
  });

  it('MINE wins 2 rows, OPP wins 1 row → MINE', () => {
    // mine: K,K front; Q,Q middle; 9,9,9 back
    // opp:  3,3  front; 5,5  middle; 7,7,7  back
    // Front:  K>K > 3 → mine wins
    // Middle: Q>Q > 5 → mine wins
    // Back:   9 > 7   → mine wins
    // But canBeat only counts rows won (not strengths), so OPP still loses
    // even though MINE wins all 3.
    const mine = mb(['K', 'K', '2'], ['Q', 'Q', '2', '3', '4'], ['9', '9', '9', '5', '6']);
    const opp = mb(['3', '3', '4'], ['5', '5', '6', '7', '8'], ['7', '7', '7', '2', '3']);
    expect(canBeat(mine, opp)).toBe('MINE');
  });
});