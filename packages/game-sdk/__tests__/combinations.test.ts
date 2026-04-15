import { Card } from '../src/core/Card';
import { CombinationType, detectCombination } from '../src/games/tienlen/combinations';

function c(rank: string, suit: string = 'SPADES'): Card {
  return new Card(rank, suit);
}

describe('detectCombination', () => {
  describe('SINGLE', () => {
    it('single card returns SINGLE', () => {
      expect(detectCombination([c('A')])).toBe(CombinationType.SINGLE);
    });
  });

  describe('PAIR', () => {
    it('two cards same rank returns PAIR', () => {
      expect(detectCombination([c('K', 'SPADES'), c('K', 'HEARTS')])).toBe(CombinationType.PAIR);
    });
  });

  describe('TRIPLE', () => {
    it('three cards same rank returns TRIPLE', () => {
      expect(detectCombination([c('7', 'SPADES'), c('7', 'HEARTS'), c('7', 'DIAMONDS')])).toBe(CombinationType.TRIPLE);
    });
  });

  describe('FOUR_OF_A_KIND', () => {
    it('four cards same rank returns FOUR_OF_A_KIND', () => {
      expect(detectCombination([c('9', 'SPADES'), c('9', 'HEARTS'), c('9', 'DIAMONDS'), c('9', 'CLUBS')])).toBe(CombinationType.FOUR_OF_A_KIND);
    });
  });

  describe('STRAIGHT', () => {
    it('5 consecutive ranks returns STRAIGHT', () => {
      expect(detectCombination([c('4'), c('5'), c('6'), c('7'), c('8')])).toBe(CombinationType.STRAIGHT);
    });

    it('6 consecutive ranks returns STRAIGHT', () => {
      expect(detectCombination([c('4'), c('5'), c('6'), c('7'), c('8'), c('9')])).toBe(CombinationType.STRAIGHT);
    });

    it('3-A straight (Ace low) returns STRAIGHT', () => {
      expect(detectCombination([c('A'), c('2'), c('3'), c('4'), c('5')])).toBe(CombinationType.STRAIGHT);
    });

    it('non-consecutive fails STRAIGHT', () => {
      expect(detectCombination([c('4'), c('5'), c('7'), c('8'), c('9')])).toBe(null);
    });

    it('4 cards is not a STRAIGHT', () => {
      expect(detectCombination([c('4'), c('5'), c('6'), c('7')])).toBe(null);
    });

    it('cross-suit straight is still STRAIGHT', () => {
      expect(detectCombination([c('4', 'SPADES'), c('5', 'HEARTS'), c('6', 'DIAMONDS'), c('7', 'CLUBS'), c('8')])).toBe(CombinationType.STRAIGHT);
    });
  });

  describe('PAIR_STRAIGHT', () => {
    it('3 consecutive pairs returns PAIR_STRAIGHT', () => {
      const hand = [c('3', 'SPADES'), c('3', 'HEARTS'), c('4', 'SPADES'), c('4', 'HEARTS'), c('5', 'SPADES'), c('5', 'HEARTS')];
      expect(detectCombination(hand)).toBe(CombinationType.PAIR_STRAIGHT);
    });

    it('4 consecutive pairs returns FOUR_CONSECUTIVE_PAIRS', () => {
      const hand = [
        c('3', 'SPADES'), c('3', 'HEARTS'),
        c('4', 'SPADES'), c('4', 'HEARTS'),
        c('5', 'SPADES'), c('5', 'HEARTS'),
        c('6', 'SPADES'), c('6', 'HEARTS'),
      ];
      expect(detectCombination(hand)).toBe(CombinationType.FOUR_CONSECUTIVE_PAIRS);
    });

    it('only 2 pairs is not PAIR_STRAIGHT', () => {
      expect(detectCombination([c('3', 'SPADES'), c('3', 'HEARTS'), c('4', 'SPADES'), c('4', 'HEARTS')])).toBe(null);
    });

    it('non-consecutive pairs is not PAIR_STRAIGHT', () => {
      expect(detectCombination([c('3', 'SPADES'), c('3', 'HEARTS'), c('5', 'SPADES'), c('5', 'HEARTS'), c('7', 'SPADES'), c('7', 'HEARTS')])).toBe(null);
    });
  });

  describe('FOUR_CONSECUTIVE_PAIRS', () => {
    it('4 consecutive pairs returns FOUR_CONSECUTIVE_PAIRS', () => {
      const hand = [
        c('3', 'SPADES'), c('3', 'HEARTS'),
        c('4', 'SPADES'), c('4', 'HEARTS'),
        c('5', 'SPADES'), c('5', 'HEARTS'),
        c('6', 'SPADES'), c('6', 'HEARTS'),
      ];
      expect(detectCombination(hand)).toBe(CombinationType.FOUR_CONSECUTIVE_PAIRS);
    });
  });

  describe('edge cases', () => {
    it('single pair does not return PAIR_STRAIGHT', () => {
      expect(detectCombination([c('K', 'SPADES'), c('K', 'HEARTS')])).toBe(CombinationType.PAIR);
    });

    it('mixed cards returns null', () => {
      expect(detectCombination([c('7', 'SPADES'), c('7', 'HEARTS'), c('8', 'SPADES')])).toBe(null);
    });

    it('empty returns null', () => {
      expect(detectCombination([])).toBe(null);
    });
  });
});