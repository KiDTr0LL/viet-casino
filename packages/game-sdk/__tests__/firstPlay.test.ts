import { Card } from '../src/core/Card';
import { isValidFirstPlay } from '../src/games/tienlen/firstPlay';

function c(rank: string, suit: string = 'SPADES'): Card {
  return new Card(rank, suit);
}

describe('isValidFirstPlay', () => {
  it('rejects hand without 3♠', () => {
    // Hand of 13: A-K (12 high cards) + 2 — no 3♠
    const hand = [
      c('A'), c('K'), c('Q'), c('J'), c('10'),
      c('9'), c('8'), c('7'), c('6'), c('5'),
      c('4'), c('3', 'HEARTS'), c('2'),
    ];
    const result = isValidFirstPlay(hand);
    expect(result.valid).toBe(false);
    expect(result.error).toMatch(/3♠|3.*SPADES/i);
  });

  it('rejects hand where 3♠ is not present at all', () => {
    const hand = Array.from({ length: 13 }, (_, i) => c('4', 'HEARTS'));
    const result = isValidFirstPlay(hand);
    expect(result.valid).toBe(false);
  });

  it('accepts hand that contains 3♠', () => {
    // Normal 13-card hand including 3♠
    const hand = [
      c('3', 'SPADES'), // 3♠ — the required card
      c('A'), c('K'), c('Q'), c('J'), c('10'),
      c('9'), c('8'), c('7'), c('6'), c('5'),
      c('4'), c('2'),
    ];
    const result = isValidFirstPlay(hand);
    expect(result.valid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('hand with 3♠ but other ranks also present is valid', () => {
    const hand = [
      c('3', 'SPADES'),
      c('3', 'HEARTS'), // another 3, same suit group
      c('5', 'SPADES'), c('5', 'HEARTS'), c('5', 'DIAMONDS'), c('5', 'CLUBS'), // quad 5
      c('7', 'SPADES'), c('7', 'HEARTS'),
      c('9', 'SPADES'), c('9', 'HEARTS'),
      c('J', 'SPADES'),
      c('A'),
      c('2'),
    ];
    const result = isValidFirstPlay(hand);
    expect(result.valid).toBe(true);
  });

  it('empty hand is invalid', () => {
    const result = isValidFirstPlay([]);
    expect(result.valid).toBe(false);
  });
});