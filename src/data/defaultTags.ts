/**
 * Barrel file — re-exports all data from split modules.
 *
 * Các file data được chia nhỏ để dễ update và fix bug:
 *   - seasons.ts      → định nghĩa các mùa (Season)
 *   - constants.ts    → hằng số (POKEMON_TYPES)
 *   - season1.ts      → thẻ Season 1 (StarDust Version 1)
 *   - season2.ts      → thẻ Season 2 (StarDust Version 2) + Regular Tags
 *   - specialCards.ts → thẻ Special / Promo / Event
 */

import type { MezastarTag } from '../types';
import { defaultSeasons } from './seasons';
import { createSeason1Tags } from './season1';
import { createSeason2Tags, createSeason2RegularTags } from './season2';
import { createSpecialCards } from './specialCards';
export { POKEMON_TYPES } from './constants';
export { defaultSeasons } from './seasons';

/** All default tags combined from all seasons */
export const defaultTags: MezastarTag[] = [
  ...createSeason1Tags(),
  ...createSeason2Tags(),
  ...createSeason2RegularTags(),
  ...createSpecialCards(),
];
