import type { MezastarTag } from '../types';

// ===== Helper to build a Season 2 card =====
const s2 = (
  cardNum: number,
  name: string,
  type: string,
  rarity: MezastarTag['rarity'],
  notes?: string
): MezastarTag => {
  const no = `1-2-${String(cardNum).padStart(3, '0')}`;
  return {
    id: `season-2-${no}`,
    no,
    name,
    rarity,
    type,
    imageUrl: `https://webassets-pokemonmezastar.marv.jp/assets/img/ver1/pm_en_${no}_f.png`,
    seasonId: 'season-2',
    notes: notes || '',
  };
};

// ===== Superstar Tags (1-2-001 to 1-2-010) =====
const season2Superstar: MezastarTag[] = [
  s2(1, 'Rillaboom (Gigantamax)', 'Grass', 'superstar', 'Có thể Gigantamax với cây đĩa nhạc khổng lồ!'),
  s2(2, 'Cinderace (Gigantamax)', 'Fire', 'superstar', 'Có thể Gigantamax hóa quả cầu lửa siêu khổng lồ!'),
  s2(3, 'Inteleon (Gigantamax)', 'Water', 'superstar', 'Có thể bắn tia nước từ ngón tay ở thể Gigantamax!'),
  s2(4, 'Pikachu (Gigantamax)', 'Electric', 'superstar', 'Pikachu ở thể Gigantamax với sức mạnh sấm sét!'),
  s2(5, 'Raikou (Double Move)', 'Electric', 'superstar', 'Có thể sử dụng hai chiêu trong một lượt!'),
  s2(6, 'Entei (Double Move)', 'Fire', 'superstar', 'Có thể sử dụng hai chiêu trong một lượt!'),
  s2(7, 'Suicune (Double Move)', 'Water', 'superstar', 'Có thể sử dụng hai chiêu trong một lượt!'),
  s2(8, 'Mewtwo (Dynamax)', 'Psychic', 'superstar', 'Mewtwo hóa khổng lồ Dynamax cực mạnh!'),
  s2(9, 'Arceus', 'Normal', 'superstar', 'Pokémon huyền thoại tối thượng — Chúa tể các loài!'),
  s2(10, 'Hisuian Zoroark', 'Ghost', 'superstar', 'Biến hình đánh lừa đối thủ bằng ảo ảnh!'),
];

// ===== Star Tags (1-2-011 to 1-2-025) =====
const season2Star: MezastarTag[] = [
  s2(11, 'Pinsir (Mega Evolution)', 'Bug', 'star', 'Mega Tiến Hóa tăng cường sức mạnh càng kẹp!'),
  s2(12, 'Heracross (Mega Evolution)', 'Bug', 'star', 'Mega Tiến Hóa với sừng tấn công siêu mạnh!'),
  s2(13, 'Keldeo (Z-Move)', 'Water', 'star', 'Tung Z-Move hệ Nước siêu cấp từ Keldeo!'),
  s2(14, 'Weavile (Dynamax)', 'Dark', 'star', 'Weavile lạnh lùng với vuốt băng Dynamax!'),
  s2(15, "Sirfetch'd (Dynamax)", 'Fighting', 'star', 'Chiến binh vịt kiếm sĩ hóa khổng lồ!'),
  s2(16, 'Nidoking (Dynamax)', 'Poison', 'star', 'Vua độc chất hóa khổng lồ Dynamax!'),
  s2(17, 'Flygon', 'Dragon', 'star', 'Pokémon Ảo Ảnh với đôi mắt đỏ huyền bí!'),
  s2(18, 'Arctovish', 'Water', 'star', 'Pokémon hóa thạch lai giữa cá và thằn lằn!'),
  s2(19, 'Electivire (Chain Tag)', 'Electric', 'star', 'Có thể kết hợp Chain Attack với bạn bè!'),
  s2(20, 'Magmortar (Chain Tag)', 'Fire', 'star', 'Pháo kích dung nham kết hợp Chain Attack!'),
  s2(21, 'Toxtricity (Amped)', 'Electric', 'star', 'Phong cách Amped — âm thanh điện mạnh mẽ!'),
  s2(22, 'Toxtricity (Low Key)', 'Electric', 'star', 'Phong cách Low Key — giai điệu điện u tối!'),
  s2(23, 'Great Tusk', 'Ground', 'star', 'Pokémon huyền thoại từ vùng Paldea cổ đại!'),
  s2(24, 'Vikavolt', 'Bug', 'star', 'Bọ cánh cứng phóng điện với tốc độ siêu nhanh!'),
  s2(25, 'Abomasnow', 'Grass', 'star', 'Bão tuyết khổng lồ quét sạch đối thủ!'),
];

// ===== Normal Tags (1-2-026 to 1-2-070) — 45 cards =====
const season2Normal: MezastarTag[] = [
  s2(26, 'Sprigatito', 'Grass', 'normal'),
  s2(27, 'Fuecoco', 'Fire', 'normal'),
  s2(28, 'Quaxly', 'Water', 'normal'),
  s2(29, 'Charcadet', 'Fire', 'normal', 'Pokémon lửa nhỏ sẽ tiến hóa thành Armarouge hoặc Ceruledge!'),
  s2(30, 'Frigibax', 'Dragon', 'normal', 'Pokémon rồng băng với khả năng chịu lạnh cực tốt!'),
  s2(31, 'Pawmi', 'Electric', 'normal'),
  s2(32, 'Grookey', 'Grass', 'normal'),
  s2(33, 'Thwackey', 'Grass', 'normal'),
  s2(34, 'Rillaboom', 'Grass', 'normal'),
  s2(35, 'Scorbunny', 'Fire', 'normal'),
  s2(36, 'Raboot', 'Fire', 'normal'),
  s2(37, 'Cinderace', 'Fire', 'normal'),
  s2(38, 'Sobble', 'Water', 'normal'),
  s2(39, 'Drizzile', 'Water', 'normal'),
  s2(40, 'Inteleon', 'Water', 'normal'),
  s2(41, 'Snover', 'Grass', 'normal', 'Pokémon băng cỏ sống ở vùng núi tuyết!'),
  s2(42, 'Abomasnow', 'Grass', 'normal'),
  s2(43, 'Drifloon', 'Ghost', 'normal', 'Pokémon bóng bay thích kéo tay trẻ con lên trời!'),
  s2(44, 'Drifblim', 'Ghost', 'normal'),
  s2(45, 'Hisuian Zorua', 'Ghost', 'normal', 'Biến thể Hisui với lông trắng muốt như tuyết!'),
  s2(46, 'Hisuian Zoroark', 'Ghost', 'normal'),
  s2(47, 'Lileep', 'Rock', 'normal', 'Pokémon hóa thạch từ dưới đáy biển cổ đại!'),
  s2(48, 'Cradily', 'Rock', 'normal'),
  s2(49, "Galarian Farfetch'd", 'Fighting', 'normal', 'Dạng Galar — cầm tỏi tây to chiến đấu!'),
  s2(50, "Sirfetch'd", 'Fighting', 'normal'),
  s2(51, 'Drilbur', 'Ground', 'normal', 'Pokémon khoan đất với móng vuốt siêu cứng!'),
  s2(52, 'Excadrill', 'Ground', 'normal'),
  s2(53, 'Magby', 'Fire', 'normal'),
  s2(54, 'Magmar', 'Fire', 'normal'),
  s2(55, 'Magmortar', 'Fire', 'normal'),
  s2(56, 'Growlithe', 'Fire', 'normal'),
  s2(57, 'Arcanine', 'Fire', 'normal'),
  s2(58, 'Toxel', 'Electric', 'normal', 'Pokémon độc điện nhỏ nhắn có hai phong cách tiến hóa!'),
  s2(59, 'Toxtricity (Amped)', 'Electric', 'normal'),
  s2(60, 'Toxtricity (Low Key)', 'Electric', 'normal'),
  s2(61, 'Gossifleur', 'Grass', 'normal'),
  s2(62, 'Eldegoss', 'Grass', 'normal'),
  s2(63, 'Sneasel', 'Dark', 'normal'),
  s2(64, 'Weavile', 'Dark', 'normal'),
  s2(65, 'Nidoran♀', 'Poison', 'normal'),
  s2(66, 'Nidorina', 'Poison', 'normal'),
  s2(67, 'Nidoqueen', 'Poison', 'normal'),
  s2(68, 'Nidoran♂', 'Poison', 'normal'),
  s2(69, 'Nidorino', 'Poison', 'normal'),
  s2(70, 'Nidoking', 'Poison', 'normal'),
];

// ===== Regular Tags (promo cards, added to Special season) =====
const season2RegularTags: MezastarTag[] = [
  {
    id: 'season-2-r-2-1',
    no: 'R-2-1',
    name: 'Pikachu (Regular Tag)',
    rarity: 'promo',
    type: 'Electric',
    imageUrl: 'https://webassets-pokemonmezastar.marv.jp/assets/img/ver1/pm_en_1-1-019_f.png',
    seasonId: 'special',
    notes: 'Tag bản thường đặc biệt từ bộ Regular Tag của Season 2!',
  },
  {
    id: 'season-2-r-2-2',
    no: 'R-2-2',
    name: 'Charizard (Regular Tag)',
    rarity: 'promo',
    type: 'Fire',
    imageUrl: 'https://webassets-pokemonmezastar.marv.jp/assets/img/ver1/pm_en_1-1-009_f.png',
    seasonId: 'special',
    notes: 'Tag bản thường đặc biệt từ bộ Regular Tag của Season 2!',
  },
  {
    id: 'season-2-r-2-3',
    no: 'R-2-3',
    name: 'Gengar (Regular Tag)',
    rarity: 'promo',
    type: 'Ghost',
    imageUrl: 'https://webassets-pokemonmezastar.marv.jp/assets/img/ver1/pm_en_1-1-016_f.png',
    seasonId: 'special',
    notes: 'Tag bản thường đặc biệt từ bộ Regular Tag của Season 2!',
  },
];

/**
 * Get all Season 2 main tags (superstar + star + normal).
 */
export function createSeason2Tags(): MezastarTag[] {
  return [...season2Superstar, ...season2Star, ...season2Normal];
}

/**
 * Get Season 2 Regular Tag promo cards.
 */
export function createSeason2RegularTags(): MezastarTag[] {
  return [...season2RegularTags];
}
