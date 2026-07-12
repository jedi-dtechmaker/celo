import { describe, expect, it } from 'vitest';
import {
  CELO_ATTRIBUTION_TAG,
  assertCeloAttributionTag,
  getCeloAttributionTag,
} from './attribution';

describe('Celo attribution helpers', () => {
  it('uses the registered hackathon attribution tag by default', () => {
    expect(getCeloAttributionTag()).toBe('celo_5fdfafd97630');
    expect(CELO_ATTRIBUTION_TAG).toBe('celo_5fdfafd97630');
  });

  it('allows deployment environments to override the tag', () => {
    expect(getCeloAttributionTag('celo_custom')).toBe('celo_custom');
  });

  it('rejects non-Celo attribution tags', () => {
    expect(() => assertCeloAttributionTag('vorra_custom')).toThrow(
      'Celo attribution tag must start with "celo_".',
    );
  });
});
