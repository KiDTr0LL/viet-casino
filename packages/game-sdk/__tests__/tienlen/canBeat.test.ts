import { Card } from '../../src/core/Card';
import { CombinationType, detectCombination } from '../../src/games/tienlen/combinations';
import { canBeat } from '../../src/games/tienlen/canBeat';

function c(rank: string, suit: string = 'SPADES'): Card {
  return new Card(rank, suit);
}

function combo(...ranks: string[]): Card[] {
  return ranks.map(r => c(r));
}

function plays(type: CombinationType, ...ranks: string[]): Card[] {
  const cards = combo(...ranks);
  // Verify the helper is being used correctly (cards form the claimed type)
  expect(detectCombination(cards)).toBe(type);
  return cards;
}

describe('canBeat — null table (first play of round)', () => {
  it('any valid combination can be played first', () => {
    expect(canBeat(combo('5'), null)).toBe(true);
    expect(canBeat(combo('K', 'K'), null)).toBe(true);
    expect(canBeat(combo('7', '7', '7'), null)).toBe(true);
    expect(canBeat(combo('4', '5', '6', '7', '8'), null)).toBe(true);
  });

  it('invalid combination cannot be played first', () => {
    expect(canBeat(combo('5', '7'), null)).toBe(false);
    expect(canBeat([], null)).toBe(false);
  });
});

describe('canBeat — SINGLE', () => {
  it('higher rank beats lower rank', () => {
    expect(canBeat(combo('7'), plays(CombinationType.SINGLE, '5'))).toBe(true);
  });

  it('lower rank cannot beat higher', () => {
    expect(canBeat(combo('3'), plays(CombinationType.SINGLE, '7'))).toBe(false);
  });

  it('same rank is a tie (cannot beat)', () => {
    expect(canBeat(combo('7'), plays(CombinationType.SINGLE, '7'))).toBe(false);
  });
});

describe('canBeat — PAIR', () => {
  it('higher pair rank beats lower', () => {
    expect(canBeat(combo('K', 'K'), plays(CombinationType.PAIR, '7', '7'))).toBe(true);
  });

  it('lower pair rank cannot beat higher', () => {
    expect(canBeat(combo('5', '5'), plays(CombinationType.PAIR, 'K', 'K'))).toBe(false);
  });

  it('same pair rank cannot beat (tie)', () => {
    expect(canBeat(combo('8', '8'), plays(CombinationType.PAIR, '8', '8'))).toBe(false);
  });

  it('pair cannot beat single', () => {
    expect(canBeat(combo('K', 'K'), plays(CombinationType.SINGLE, '5'))).toBe(false);
  });
});

describe('canBeat — TRIPLE', () => {
  it('higher triple rank beats lower', () => {
    expect(canBeat(combo('A', 'A', 'A'), plays(CombinationType.TRIPLE, '7', '7', '7'))).toBe(true);
  });

  it('lower triple rank cannot beat higher', () => {
    expect(canBeat(combo('3', '3', '3'), plays(CombinationType.TRIPLE, 'K', 'K', 'K'))).toBe(false);
  });

  it('same triple rank cannot beat', () => {
    expect(canBeat(combo('Q', 'Q', 'Q'), plays(CombinationType.TRIPLE, 'Q', 'Q', 'Q'))).toBe(false);
  });
});

describe('canBeat — STRAIGHT (same length)', () => {
  it('same length, higher high card wins', () => {
    expect(canBeat(combo('5', '6', '7', '8'), plays(CombinationType.STRAIGHT, '3', '4', '5', '6'))).toBe(true);
  });

  it('same length, lower high card loses', () => {
    expect(canBeat(combo('3', '4', '5', '6'), plays(CombinationType.STRAIGHT, '5', '6', '7', '8'))).toBe(false);
  });

  it('same length, same high card is tie', () => {
    expect(canBeat(combo('5', '6', '7', '8'), plays(CombinationType.STRAIGHT, '5', '6', '7', '8'))).toBe(false);
  });

  it('different-length straights are NOT directly comparable', () => {
    // 5-card cannot beat 4-card via same-type comparison (cross-length)
    expect(canBeat(combo('3', '4', '5', '6', '7'), plays(CombinationType.STRAIGHT, '3', '4', '5', '6'))).toBe(false);
  });
});

describe('canBeat — CHẶT HEO bombing rules', () => {
  it('3 Đôi Thông cuts a single 2', () => {
    expect(canBeat(
      combo('3', '3', '4', '4', '5', '5'),
      plays(CombinationType.SINGLE, '2'),
    )).toBe(true);
  });

  it('Tứ Quý cuts a single 2', () => {
    expect(canBeat(
      combo('K', 'K', 'K', 'K'),
      plays(CombinationType.SINGLE, '2'),
    )).toBe(true);
  });

  it('Tứ Quý cuts a Pair of 2s', () => {
    expect(canBeat(
      combo('K', 'K', 'K', 'K'),
      plays(CombinationType.PAIR, '2', '2'),
    )).toBe(true);
  });

  it('4 Đôi Thông cuts a single 2', () => {
    expect(canBeat(
      combo('3', '3', '4', '4', '5', '5', '6', '6'),
      plays(CombinationType.SINGLE, '2'),
    )).toBe(true);
  });

  it('4 Đôi Thông cuts 3 Đôi Thông', () => {
    // Opp plays 3 Đôi Thông
    const oppTable = combo('3', '3', '4', '4', '5', '5');
    // My 4 Đôi Thông must be higher (higher lowest pair)
    expect(canBeat(
      combo('4', '4', '5', '5', '6', '6', '7', '7'),
      oppTable,
    )).toBe(true);
  });

  it('4 Đôi Thông cuts Tứ Quý', () => {
    expect(canBeat(
      combo('4', '4', '5', '5', '6', '6', '7', '7'),
      plays(CombinationType.FOUR_OF_A_KIND, 'K', 'K', 'K', 'K'),
    )).toBe(true);
  });

  it('3 Đôi Thông cannot cut a Pair of 2s', () => {
    expect(canBeat(
      combo('3', '3', '4', '4', '5', '5'),
      plays(CombinationType.PAIR, '2', '2'),
    )).toBe(false);
  });

  it('Tứ Quý cannot cut a Straight', () => {
    expect(canBeat(
      combo('K', 'K', 'K', 'K'),
      plays(CombinationType.STRAIGHT, '3', '4', '5', '6', '7'),
    )).toBe(false);
  });

  it('Tứ Quý cannot cut a Pair (non-2)', () => {
    expect(canBeat(
      combo('K', 'K', 'K', 'K'),
      plays(CombinationType.PAIR, '7', '7'),
    )).toBe(false);
  });

  it('same bomb strength is tie (cannot beat)', () => {
    expect(canBeat(
      combo('K', 'K', 'K', 'K'),
      plays(CombinationType.FOUR_OF_A_KIND, 'K', 'K', 'K', 'K'),
    )).toBe(false);
  });

  it('3 Đôi Thông lower cannot beat higher 3 Đôi Thông', () => {
    expect(canBeat(
      combo('3', '3', '4', '4', '5', '5'),
      plays(CombinationType.PAIR_STRAIGHT, '4', '4', '5', '5', '6', '6'),
    )).toBe(false);
  });
});

describe('canBeat — cross-type is always false (normal play)', () => {
  it('single cannot beat pair', () => {
    expect(canBeat(combo('K'), plays(CombinationType.PAIR, '5', '5'))).toBe(false);
  });

  it('pair cannot beat triple', () => {
    expect(canBeat(combo('K', 'K'), plays(CombinationType.TRIPLE, '5', '5', '5'))).toBe(false);
  });

  it('triple cannot beat straight', () => {
    expect(canBeat(combo('K', 'K', 'K'), plays(CombinationType.STRAIGHT, '5', '6', '7', '8', '9'))).toBe(false);
  });

  it('straight cannot beat bomb', () => {
    expect(canBeat(
      combo('K', 'Q', 'J', '10', '9'),
      plays(CombinationType.FOUR_OF_A_KIND, '5', '5', '5', '5'),
    )).toBe(false);
  });
});