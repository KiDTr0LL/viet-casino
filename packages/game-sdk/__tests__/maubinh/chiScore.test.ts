import { Card } from '../../src/core/Card';
import { MauBinhHand } from '../../src/games/maubinh/types';
import { calculateChiScore } from '../../src/games/maubinh/chiScore';

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

describe('calculateChiScore — base Chi', () => {
  it('wins front row → baseChi = +1', () => {
    const mine = mb(['6', '6', '3'], ['5', '5', '3', '4', '7'], ['5', '5', '3', '4', '7']);
    const opp = mb(['5', '5', '3'], ['5', '5', '3', '4', '7'], ['5', '5', '3', '4', '7']);
    expect(calculateChiScore(mine, opp).baseChi).toBe(1);
  });

  it('loses front row → baseChi = -1', () => {
    const mine = mb(['5', '5', '3'], ['5', '5', '3', '4', '7'], ['5', '5', '3', '4', '7']);
    const opp = mb(['6', '6', '3'], ['5', '5', '3', '4', '7'], ['5', '5', '3', '4', '7']);
    expect(calculateChiScore(mine, opp).baseChi).toBe(-1);
  });

  it('all 3 rows lost → baseChi = -3', () => {
    const mine = mb(['3', '4', '5'], ['3', '4', '5', '6', '7'], ['3', '4', '5', '6', '7']);
    const opp = mb(['A', 'A', 'A'], ['A', 'K', 'Q', 'J', '10'], ['A', 'K', 'Q', 'J', '10']);
    expect(calculateChiScore(mine, opp).baseChi).toBe(-3);
  });

  it('tie on all 3 rows → baseChi = 0', () => {
    const mine = mb(['3', '4', '5'], ['3', '4', '5', '6', '7'], ['3', '4', '5', '6', '7']);
    const opp = mb(['3', '4', '5'], ['3', '4', '5', '6', '7'], ['3', '4', '5', '6', '7']);
    expect(calculateChiScore(mine, opp).baseChi).toBe(0);
  });
});

describe('calculateChiScore — Chi Thuởng bonuses', () => {
  it('Sám Chi Cuối (trips in back) → bonuses = +3', () => {
    const mine = mb(['5', '5', '3'], ['5', '5', '3', '4', '7'], ['7', '7', '7', '4', '5']);
    const opp = mb(['5', '5', '3'], ['5', '5', '3', '4', '7'], ['7', '7', 'K', '4', '5']);
    expect(calculateChiScore(mine, opp).bonuses).toBe(3);
  });

  it('Tứ Quý Chi Giữa (quads in middle) → bonuses = +8', () => {
    const mine = mb(['5', '5', '3'], ['K', 'K', 'K', 'K', '7'], ['A', '2', '3', '4', '5']);
    const opp = mb(['5', '5', '3'], ['5', '5', '3', '4', '7'], ['A', '2', '3', '4', '5']);
    expect(calculateChiScore(mine, opp).bonuses).toBe(8);
  });

  it('two bonuses can stack', () => {
    const mine = mb(['5', '5', '3'], ['K', 'K', 'K', 'K', '7'], ['7', '7', '7', '4', '5']);
    const opp = mb(['5', '5', '3'], ['5', '5', '3', '4', '7'], ['7', '7', 'K', '4', '5']);
    expect(calculateChiScore(mine, opp).bonuses).toBe(11); // 3 + 8
  });
});

describe('calculateChiScore — Sập Hầm (sweep ×2)', () => {
  it('wins all 3 rows → sweep = baseChi × 2', () => {
    const mine = mb(['A', 'A', 'A'], ['A', 'K', 'Q', 'J', '10'], ['A', 'K', 'Q', 'J', '10']);
    const opp = mb(['3', '3', '3'], ['3', '4', '5', '6', '7'], ['3', '4', '5', '6', '7']);
    expect(calculateChiScore(mine, opp).sweep).toBe(6); // baseChi=3, ×2
  });

  it('wins all 3 rows + trips bonus → sweep applied ONCE', () => {
    // Mine: trips of 7s in back (Sám Chi Cuối +3), wins all 3 rows.
    // Opp: trips of 3 in front (weaker), straight 34567 in middle, pair of 7s in back.
    const mine = mb(['A', 'A', 'A'], ['A', 'K', 'Q', 'J', '10'], ['7', '7', '7', '4', '5']);
    const opp = mb(['3', '3', '3'], ['3', '4', '5', '6', '7'], ['7', '7', '3', '4', '5']);
    // baseChi=3, bonuses=3 (Sám Chi Cuối from trips 7s in back),
    // sweep=6, total=12
    expect(calculateChiScore(mine, opp).total).toBe(12);
  });

  it('wins only 2 rows → no sweep', () => {
    const mine = mb(['A', 'A', 'A'], ['A', 'K', 'Q', 'J', '10'], ['3', '4', '5', '6', '7']);
    const opp = mb(['3', '3', '3'], ['3', '4', '5', '6', '7'], ['A', 'K', 'Q', 'J', '10']);
    expect(calculateChiScore(mine, opp).sweep).toBe(0);
  });
});

describe('calculateChiScore — total', () => {
  it('mixed result: wins front+back, loses middle → total = +5', () => {
    // Mine front: pair of 6s (beats opp pair of 5s)
    // Mine middle: pair of 5s (loses to opp pair of A)
    // Mine back: trips of 7s (beats opp trips of 3s)
    // baseChi = +1 + (-1) + (+1) = +1, Sám Chi Cuối = +3, no sweep → total = +4
    const mine = mb(['6', '6', '3'], ['5', '5', '3', '4', '7'], ['7', '7', '7', '4', '5']);
    const opp = mb(['5', '5', '3'], ['A', 'A', '3', '4', '7'], ['3', '3', '3', '4', '5']);
    expect(calculateChiScore(mine, opp).total).toBe(4);
  });
});