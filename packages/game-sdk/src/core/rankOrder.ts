import { Card } from './Card';

export const TIENLEN_RANK_ORDER: Record<string, number> = {
  '3': 0, '4': 1, '5': 2, '6': 3, '7': 4, '8': 5, '9': 6,
  '10': 7, 'J': 8, 'Q': 9, 'K': 10, 'A': 11, '2': 12,
};

export const MAUBINH_RANK_ORDER: Record<string, number> = {
  '2': 0, '3': 1, '4': 2, '5': 3, '6': 4, '7': 5, '8': 6,
  '9': 7, '10': 8, 'J': 9, 'Q': 10, 'K': 11, 'A': 12,
};

export type RankOrder = Record<string, number>;

/**
 * Returns the rank value of a Card under the given ordering.
 */
export function rankValue(card: Card, order: RankOrder): number {
  return order[card.rank] ?? -1;
}