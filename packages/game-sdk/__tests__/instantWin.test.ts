import { Card } from '../src/core/Card';
import { detectInstantWin, InstantWinType } from '../src/games/instantWin';

function c(rank: string, suit: string = 'SPADES'): Card {
  return new Card(rank, suit);
}

describe('detectInstantWin — TLMN (Tiến Lên Miền Nam)', () => {
  describe('Sảnh Rồng (12 consecutive cards 3→A)', () => {
    it('detects Sảnh Rồng in 12-card hand', () => {
      const hand = [
        c('3'), c('4'), c('5'), c('6'), c('7'),
        c('8'), c('9'), c('10'), c('J'), c('Q'),
        c('K'), c('A'),
      ];
      expect(detectInstantWin(hand)).toBe(InstantWinType.SANH_RONG);
    });

    it('returns null when hand is not Sảnh Rồng', () => {
      const hand = [
        c('3'), c('4'), c('5'), c('6'), c('7'),
        c('8'), c('9'), c('10'), c('J'), c('Q'),
        c('K'),
      ];
      expect(detectInstantWin(hand)).toBeNull();
    });
  });

  describe('Tứ Quý Heo (all four 2s)', () => {
    it('detects Tứ Quý Heo', () => {
      const hand = [
        c('3'), c('4'), c('5'), c('6'), c('7'),
        c('8'), c('9'), c('10'), c('J'), c('Q'),
        c('K'), c('A'),
        new Card('2', 'SPADES'),
        new Card('2', 'HEARTS'),
        new Card('2', 'DIAMONDS'),
        new Card('2', 'CLUBS'),
      ];
      expect(detectInstantWin(hand)).toBe(InstantWinType.TU_QUY_HEO);
    });

    it('returns null when only three 2s are held', () => {
      const hand = [
        c('3'), c('4'), c('5'), c('6'), c('7'),
        c('8'), c('9'), c('10'), c('J'), c('Q'),
        c('K'), c('A'),
        new Card('2', 'SPADES'),
        new Card('2', 'HEARTS'),
        new Card('2', 'DIAMONDS'),
      ];
      expect(detectInstantWin(hand)).toBeNull();
    });
  });

  describe('5 Đôi Thông (5 consecutive pairs)', () => {
    it('detects 5 consecutive pairs', () => {
      const hand = [
        c('3', 'SPADES'), c('3', 'HEARTS'),
        c('4', 'SPADES'), c('4', 'HEARTS'),
        c('5', 'SPADES'), c('5', 'HEARTS'),
        c('6', 'SPADES'), c('6', 'HEARTS'),
        c('7', 'SPADES'), c('7', 'HEARTS'),
      ];
      expect(detectInstantWin(hand)).toBe(InstantWinType.NG_DOI_THONG);
    });

    it('returns null for 4 consecutive pairs (only 4 pairs)', () => {
      const hand = [
        c('3', 'SPADES'), c('3', 'HEARTS'),
        c('4', 'SPADES'), c('4', 'HEARTS'),
        c('5', 'SPADES'), c('5', 'HEARTS'),
        c('6', 'SPADES'), c('6', 'HEARTS'),
      ];
      expect(detectInstantWin(hand)).toBeNull();
    });
  });

  describe('6 Đôi (exactly 6 pairs, not required consecutive)', () => {
    it('detects 6 pairs in 13 cards', () => {
      // 6 pairs (3,4,5,6,7,8) + kicker Q = 13 cards
      const hand = [
        c('3', 'SPADES'), c('3', 'HEARTS'),
        c('4', 'SPADES'), c('4', 'HEARTS'),
        c('5', 'SPADES'), c('5', 'HEARTS'),
        c('6', 'SPADES'), c('6', 'HEARTS'),
        c('7', 'SPADES'), c('7', 'HEARTS'),
        c('8', 'SPADES'), c('8', 'HEARTS'),
        c('Q', 'SPADES'),
      ];
      expect(detectInstantWin(hand)).toBe(InstantWinType.SAU_DOI);
    });

    it('returns null when only 5 pairs are present', () => {
      const hand = [
        c('3', 'SPADES'), c('3', 'HEARTS'),
        c('5', 'SPADES'), c('5', 'HEARTS'),
        c('7', 'SPADES'), c('7', 'HEARTS'),
        c('9', 'SPADES'), c('9', 'HEARTS'),
        c('J', 'SPADES'), c('J', 'HEARTS'),
        c('K', 'SPADES'),
        c('A'),
        c('2'),
      ];
      expect(detectInstantWin(hand)).toBeNull();
    });
  });
});

describe('detectInstantWin — Mậu Binh', () => {
  describe('Sảnh Rồng (13 consecutive cards 2→A)', () => {
    it('detects Dragon in 13 cards (all suits, consecutive)', () => {
      const hand = [
        c('2', 'SPADES'), c('3', 'HEARTS'), c('4', 'DIAMONDS'), c('5', 'CLUBS'),
        c('6', 'SPADES'), c('7', 'HEARTS'), c('8', 'DIAMONDS'), c('9', 'CLUBS'),
        c('10', 'SPADES'), c('J', 'HEARTS'), c('Q', 'DIAMONDS'), c('K', 'CLUBS'),
        c('A', 'SPADES'),
      ];
      expect(detectInstantWin(hand, 'MAUBINH')).toBe(InstantWinType.SANH_RONG_MB);
    });

    it('detects Dragon Flush (all same suit AND consecutive) — higher priority than Dragon', () => {
      const hand = [
        c('2', 'SPADES'), c('3', 'SPADES'), c('4', 'SPADES'), c('5', 'SPADES'),
        c('6', 'SPADES'), c('7', 'SPADES'), c('8', 'SPADES'), c('9', 'SPADES'),
        c('10', 'SPADES'), c('J', 'SPADES'), c('Q', 'SPADES'), c('K', 'SPADES'),
        c('A', 'SPADES'),
      ];
      // Dragon Flush (Sảnh Rồng Đồng Hoa) has higher priority than regular Dragon
      expect(detectInstantWin(hand, 'MAUBINH')).toBe(InstantWinType.SANH_RONG_DONG_HOA);
    });

    it('returns null for 12 cards (not Dragon)', () => {
      const hand = [
        c('3'), c('4'), c('5'), c('6'), c('7'),
        c('8'), c('9'), c('10'), c('J'), c('Q'),
        c('K'), c('A'),
      ];
      expect(detectInstantWin(hand, 'MAUBINH')).toBeNull();
    });
  });

  describe('Lục Phé Bôn (exactly 6 pairs in 13 cards)', () => {
    it('detects 6 pairs in 13 cards for Mau Binh', () => {
      // 6 pairs (3,4,5,6,7,8) + kicker Q = 13 cards
      const hand = [
        c('3', 'SPADES'), c('3', 'HEARTS'),
        c('4', 'SPADES'), c('4', 'HEARTS'),
        c('5', 'SPADES'), c('5', 'HEARTS'),
        c('6', 'SPADES'), c('6', 'HEARTS'),
        c('7', 'SPADES'), c('7', 'HEARTS'),
        c('8', 'SPADES'), c('8', 'HEARTS'),
        c('Q', 'SPADES'),
      ];
      expect(detectInstantWin(hand, 'MAUBINH')).toBe(InstantWinType.LUC_PHE_BON);
    });

    it('returns null for 7 pairs (too many)', () => {
      // 7 pairs (3-9) + kicker J = 14 cards — not 13, so returns null
      const hand = [
        c('3', 'SPADES'), c('3', 'HEARTS'),
        c('4', 'SPADES'), c('4', 'HEARTS'),
        c('5', 'SPADES'), c('5', 'HEARTS'),
        c('6', 'SPADES'), c('6', 'HEARTS'),
        c('7', 'SPADES'), c('7', 'HEARTS'),
        c('8', 'SPADES'), c('8', 'HEARTS'),
        c('9', 'SPADES'), c('9', 'HEARTS'),
      ];
      expect(detectInstantWin(hand, 'MAUBINH')).toBeNull();
    });
  });
});