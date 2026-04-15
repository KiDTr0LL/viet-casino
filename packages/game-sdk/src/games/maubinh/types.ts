import { Card } from '../../core/Card';

export interface MauBinhHand {
  front: Card[];  // 3 cards (weakest)
  middle: Card[]; // 5 cards
  back: Card[]; // 5 cards (strongest)
}

export enum MauBinhHandType {
  HIGH_CARD = 0,
  PAIR = 1,
  TWO_PAIR = 2,
  THREE_OF_A_KIND = 3,
  STRAIGHT = 4,
  FLUSH = 5,
  FULL_HOUSE = 6,
  FOUR_OF_A_KIND = 7,
  STRAIGHT_FLUSH = 8,
}