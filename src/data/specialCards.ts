import type { MezastarTag } from '../types';

/**
 * Special Cards — chưa có hình ảnh, sẽ cập nhật sau.
 */
export function createSpecialCards(): MezastarTag[] {
  return [
    {
      id: 'special-pikachu',
      no: 'SP-001',
      name: 'Pikachu',
      rarity: 'promo',
      type: 'Electric',
      seasonId: 'special-cards',
      notes: 'Thẻ Special Pikachu — chưa có hình ảnh',
    },
    {
      id: 'special-lucario',
      no: 'SP-002',
      name: 'Lucario',
      rarity: 'promo',
      type: 'Fighting',
      seasonId: 'special-cards',
      notes: 'Thẻ Special Lucario — chưa có hình ảnh',
    },
    {
      id: 'special-snorlax',
      no: 'SP-003',
      name: 'Snorlax',
      rarity: 'promo',
      type: 'Normal',
      seasonId: 'special-cards',
      notes: 'Thẻ Special Snorlax — chưa có hình ảnh',
    },
  ];
}
