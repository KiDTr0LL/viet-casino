import { Card } from '../src/core/Card';
import { VALID_RANKS, VALID_SUITS } from '../src/core/Card';

describe('Card', () => {
  describe('construction', () => {
    it('creates a card with rank and suit', () => {
      const card = new Card('A', 'HEARTS');
      expect(card.rank).toBe('A');
      expect(card.suit).toBe('HEARTS');
    });

    it('stores rank and suit as the string values', () => {
      const card = new Card('7', 'SPADES');
      expect(card.rank).toBe('7');
      expect(card.suit).toBe('SPADES');
    });
  });

  describe('equality', () => {
    it('two cards with same rank and suit are equal', () => {
      const a = new Card('K', 'DIAMONDS');
      const b = new Card('K', 'DIAMONDS');
      expect(a.equals(b)).toBe(true);
    });

    it('two cards with different rank are not equal', () => {
      const a = new Card('K', 'DIAMONDS');
      const b = new Card('Q', 'DIAMONDS');
      expect(a.equals(b)).toBe(false);
    });

    it('two cards with different suit are not equal', () => {
      const a = new Card('K', 'DIAMONDS');
      const b = new Card('K', 'HEARTS');
      expect(a.equals(b)).toBe(false);
    });
  });

  describe('validation', () => {
    it('throws on invalid rank', () => {
      expect(() => new Card('X' as any, 'HEARTS')).toThrow();
    });

    it('throws on invalid suit', () => {
      expect(() => new Card('A', 'STAR' as any)).toThrow();
    });
  });

  describe('VALID_RANKS and VALID_SUITS exports', () => {
    it('exports all 13 valid ranks', () => {
      expect(VALID_RANKS).toContain('3');
      expect(VALID_RANKS).toContain('2');
      expect(VALID_RANKS).toContain('A');
      expect(VALID_RANKS).toHaveLength(13);
    });

    it('exports all 4 valid suits', () => {
      expect(VALID_SUITS).toContain('SPADES');
      expect(VALID_SUITS).toContain('HEARTS');
      expect(VALID_SUITS).toContain('DIAMONDS');
      expect(VALID_SUITS).toContain('CLUBS');
      expect(VALID_SUITS).toHaveLength(4);
    });
  });
});