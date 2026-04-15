import { Card } from '../src/core/Card';
import { dealCards } from '../src/core/Deck';

describe('dealCards', () => {
  it('returns the requested number of hands', () => {
    const hands = dealCards(4);
    expect(hands).toHaveLength(4);
  });

  it('each hand has exactly 13 cards', () => {
    const hands = dealCards(4);
    for (const hand of hands) {
      expect(hand).toHaveLength(13);
    }
  });

  it('all 52 cards are dealt (no extras, no missing)', () => {
    const hands = dealCards(4);
    const allCards: string[] = [];
    for (const hand of hands) {
      for (const card of hand) {
        allCards.push(`${card.rank}${card.suit}`);
      }
    }
    expect(allCards).toHaveLength(52);
    const unique = new Set(allCards);
    expect(unique.size).toBe(52);
  });

  it('no card appears in more than one hand', () => {
    const hands = dealCards(4);
    const seen = new Set<string>();
    for (const hand of hands) {
      for (const card of hand) {
        const key = `${card.rank}${card.suit}`;
        expect(seen.has(key)).toBe(false);
        seen.add(key);
      }
    }
  });

  it('works for 2 players (26 cards each)', () => {
    const hands = dealCards(2);
    expect(hands).toHaveLength(2);
    expect(hands[0]).toHaveLength(13);
    expect(hands[1]).toHaveLength(13);
    const allCards = hands.flat().map(c => `${c.rank}${c.suit}`);
    const unique = new Set(allCards);
    expect(unique.size).toBe(26);
  });

  it('dealt cards are all valid Card instances', () => {
    const hands = dealCards(4);
    for (const hand of hands) {
      for (const card of hand) {
        expect(card).toBeInstanceOf(Card);
      }
    }
  });
});