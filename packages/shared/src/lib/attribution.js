export const CELO_ATTRIBUTION_TAG = 'celo_5fdfafd97630';
export const CELO_ATTRIBUTION_ENV_KEY = 'CELO_ATTRIBUTION_TAG';
export function getCeloAttributionTag(envValue) {
    return envValue?.trim() || CELO_ATTRIBUTION_TAG;
}
export function assertCeloAttributionTag(tag) {
    if (!tag.startsWith('celo_')) {
        throw new Error('Celo attribution tag must start with "celo_".');
    }
    return tag;
}
