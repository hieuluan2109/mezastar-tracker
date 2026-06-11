import type { Season } from '../types';

export const defaultSeasons: Season[] = [
  {
    id: 'season-1',
    name: 'StarDust Version 1',
    description: 'Mùa sưu tầm đầu tiên tại Việt Nam (May 2026)',
  },
  // Season 2 tạm ẩn — chưa có hình ảnh thẻ. Bỏ comment dòng dưới khi có ảnh:
  // {
  //   id: 'season-2',
  //   name: 'StarDust Version 2',
  //   description: 'Mùa sưu tầm thứ hai với các Pokémon Dynamax & Z-Moves',
  // },
  {
    id: 'special-cards',
    name: 'Thẻ Special',
    description: 'Các thẻ Special đặc biệt — Pikachu, Lucario, Snorlax',
  },
  {
    id: 'special',
    name: 'Thẻ Đặc Biệt (Event & Promo)',
    description:
      'Nơi lưu trữ các thẻ bài Promo, Event hoặc Custom tự chế của bạn',
  },
];
