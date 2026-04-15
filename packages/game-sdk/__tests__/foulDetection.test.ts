import { Card } from '../src/core/Card';
import { isFoul } from '../src/games/maubinh/foulDetection';
import { MauBinhHand } from '../src/games/maubinh/types';

function c(rank: string, suit: string = 'SPADES'): Card {
  return new Card(rank, suit);
}

function hand(front: Card[], middle: Card[], back: Card[]): MauBinhHand {
  return { front, middle, back };
}

describe('isFoul', () => {
  it('valid: back is a full house beating middle pair', () => {
    // Front: trips K (3 of a kind K) — strong
    // Middle: pair of Qs — medium
    // Back: pair of As — weak (but different type, full house check applies)
    const result = isFoul(hand(
      [c('K', 'SPADES'), c('K', 'HEARTS'), c('K', 'DIAMONDS')],         // trips K
      [c('Q', 'SPADES'), c('Q', 'HEARTS'), c('Q', 'DIAMONDS'), c('Q', 'CLUBS'), c('3', 'SPADES')], // quads Q (overrides foul)
      [c('A', 'SPADES'), c('A', 'HEARTS'), c('A', 'DIAMONDS'), c('A', 'CLUBS'), c('2', 'SPADES')]  // quads A > quads Q
    ));
    expect(result).toBe(false);
  });

  it('foul: back is WEAKER than middle (middle outranks back)', () => {
    // Middle: full house (QQQKK) — strong
    // Back: two pair (AAKK) — weaker than full house
    const result = isFoul(hand(
      [c('7', 'SPADES'), c('7', 'HEARTS'), c('7', 'DIAMONDS')], // trips 7
      [
        c('Q', 'SPADES'), c('Q', 'HEARTS'), c('Q', 'DIAMONDS'), // trips Q
        c('K', 'SPADES'), c('K', 'HEARTS'),                   // pair K  = full house
      ],
      [
        c('A', 'SPADES'), c('A', 'HEARTS'),   // pair A
        c('K', 'CLUBS'), c('K', 'DIAMONDS'),  // pair K  = two pair
        c('7', 'CLUBS'),                     // kicker
      ]
    ));
    expect(result).toBe(true);
  });

  it('foul: middle is EQUAL to back', () => {
    // Both have trips of the same rank — equal — foul
    const result = isFoul(hand(
      [c('4', 'SPADES'), c('4', 'HEARTS'), c('4', 'DIAMONDS')],
      [c('K', 'SPADES'), c('K', 'HEARTS'), c('K', 'DIAMONDS'), c('K', 'CLUBS'), c('2', 'SPADES')],
      [c('K', 'HEARTS'), c('K', 'DIAMONDS'), c('K', 'SPADES'), c('K', 'CLUBS'), c('2', 'SPADES')]
    ));
    expect(result).toBe(true);
  });

  it('valid: back beats middle (strict inequality)', () => {
    // Back: straight flush
    // Middle: three of a kind
    const result = isFoul(hand(
      [c('5', 'SPADES'), c('5', 'HEARTS'), c('5', 'DIAMONDS')], // trips 5
      [c('7', 'SPADES'), c('7', 'HEARTS'), c('7', 'DIAMONDS'), c('7', 'CLUBS'), c('2', 'SPADES')], // quads 7
      [c('A', 'SPADES'), c('K', 'SPADES'), c('Q', 'SPADES'), c('J', 'SPADES'), c('10', 'SPADES')]   // royal flush > quads
    ));
    expect(result).toBe(false);
  });

  it('valid: back and middle are the same hand type but back has higher rank', () => {
    // Back: flush of A-high
    // Middle: flush of K-high
    const result = isFoul(hand(
      [c('3', 'SPADES'), c('3', 'HEARTS'), c('3', 'DIAMONDS')],        // trips 3
      [c('7', 'SPADES'), c('8', 'SPADES'), c('9', 'SPADES'), c('10', 'SPADES'), c('J', 'SPADES')],   // straight
      [c('A', 'SPADES'), c('K', 'SPADES'), c('Q', 'SPADES'), c('J', 'SPADES'), c('10', 'SPADES')]    // higher straight
    ));
    expect(result).toBe(false);
  });
});