import { formatNumber } from 'utility';

describe('formatNumber', () => {
  describe('below 1k', () => {
    it('returns -1 for -1', () => {
      expect(formatNumber(-1)).toBe(-1);
    });
    it('returns zero for zero', () => {
      expect(formatNumber(0)).toBe(0);
    });
    it('returns 1 for 1', () => {
      expect(formatNumber(1)).toBe(1);
    });
    it('returns number before 1000 without changes', () => {
      expect(formatNumber(999)).toBe(999);
    });
  });
  describe('between 1k (inclusive) and 1M (exclusive)', () => {
    it('appends K at 1000', () => {
      expect(formatNumber(999 + 1)).toBe('1K');
    });
    it('appends K for above 1000', () => {
      expect(formatNumber(999 + 2)).toBe('1K');
    });
    it('(negative) appends K for above 1000', () => {
      expect(formatNumber(-(999 + 2))).toBe('-1K');
    });
    it('keeps decimal place with K', () => {
      expect(formatNumber(1200)).toBe('1.2K');
    });
    it('appends K right before 1,000,000', () => {
      expect(formatNumber(1000000 - 1)).toBe('999.9K');
    });
  });
  describe('at 1M and after', () => {
    it('appends M right at 1,000,000', () => {
      expect(formatNumber(1000000)).toBe('1M');
    });
    it('appends M after 1,000,000', () => {
      expect(formatNumber(1000000 + 1)).toBe('1M');
    });
    it('(negative) appends M after -1,000,000', () => {
      expect(formatNumber(-(1000000 + 1))).toBe('-1M');
    });
    it('keeps decimal place with M', () => {
      expect(formatNumber(1200000 + 1)).toBe('1.2M');
    });
  });
});
