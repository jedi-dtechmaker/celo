export const CELO_ATTRIBUTION_TAG = 'celo_5fdfafd97630' as const;

export const CELO_ATTRIBUTION_ENV_KEY = 'CELO_ATTRIBUTION_TAG' as const;

export function getCeloAttributionTag(envValue?: string | null): string {
  return envValue?.trim() || CELO_ATTRIBUTION_TAG;
}

export function assertCeloAttributionTag(tag: string): string {
  if (!tag.startsWith('celo_')) {
    throw new Error('Celo attribution tag must start with "celo_".');
  }

  return tag;
}
