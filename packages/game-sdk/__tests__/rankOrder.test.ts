import {
  TIENLEN_RANK_ORDER,
  MAUBINH_RANK_ORDER,
  rankValue,
} from '../src/core/rankOrder';
import { Card } from '../src/core/Card';

describe('TIENLEN_RANK_ORDER', () => {
  it('maps all 13 ranks', () => {
    expect(Object.keys(TIENLEN_RANK_ORDER)).toHaveLength(13);
  });

  it('3 is lowest', () => {
    expect(TIENLEN_RANK_ORDER['3']).toBeLessThan(TIENLEN_RANK_ORDER['4']);
  });

  it('2 is highest', () => {
    expect(TIENLEN_RANK_ORDER['2']).toBeGreaterThan(TIENLEN_RANK_ORDER['A']);
  });

  it('ranks are strictly ascending from 3 to 2', () => {
    const ordered = ['3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', '2'];
    for (let i = 1; i < ordered.length; i++) {
      expect(TIENLEN_RANK_ORDER[ordered[i]]).toBe(TIENLEN_RANK_ORDER[ordered[i - 1]] + 1);
    }
  });
});

describe('MAUBINH_RANK_ORDER', () => {
  it('maps all 13 ranks', () => {
    expect(Object.keys(MAUBINH_RANK_ORDER)).toHaveLength(13);
  });

  it('2 is lowest', () => {
    expect(MAUBINH_RANK_ORDER['2']).toBeLessThan(MAUBINH_RANK_ORDER['3']);
  });

  it('A is highest', () => {
    expect(MAUBINH_RANK_ORDER['A']).toBeGreaterThan(MAUBINH_RANK_ORDER['K']);
  });

  it('ranks are strictly ascending from 2 to A', () => {
    const ordered = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    for (let i = 1; i < ordered.length; i++) {
      expect(MAUBINH_RANK_ORDER[ordered[i]]).toBe(MAUBINH_RANK_ORDER[ordered[i - 1]] + 1);
    }
  });
});

describe('rankValue helper', () => {
  it('returns TIENLEN rank value for a Card', () => {
    const card = new Card('K', 'SPADES');
    expect(rankValue(card, TIENLEN_RANK_ORDER)).toBe(TIENLEN_RANK_ORDER['K']);
  });

  it('returns MAUBINH rank value for a Card', () => {
    const card = new Card('K', 'SPADES');
    expect(rankValue(card, MAUBINH_RANK_ORDER)).toBe(MAUBINH_RANK_ORDER['K']);
  });

  it('can compare two cards via TIENLEN ordering', () => {
    const a = new Card('A', 'SPADES');
    const b = new Card('K', 'HEARTS');
    expect(rankValue(a, TIENLEN_RANK_ORDER)).toBeGreaterThan(rankValue(b, TIENLEN_RANK_ORDER));
  });
});