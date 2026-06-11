import type { MezastarTag } from '../types';

const season1NamesAndTypes: [string, string][] = [
  ['Mewtwo', 'Psychic'], // 1-1-001
  ['Mew', 'Psychic'], // 1-1-002
  ['Zacian', 'Steel'], // 1-1-003
  ['Zamazenta', 'Steel'], // 1-1-004
  ['Tyranitar', 'Rock'], // 1-1-005
  ['Metagross', 'Steel'], // 1-1-006
  ['Miraidon', 'Electric'], // 1-1-007
  ['Venusaur', 'Grass'], // 1-1-008
  ['Charizard', 'Fire'], // 1-1-009
  ['Blastoise', 'Water'], // 1-1-010

  // Star Tags
  ['Vaporeon', 'Water'], // 1-1-011
  ['Flareon', 'Fire'], // 1-1-012
  ['Umbreon', 'Dark'], // 1-1-013
  ['Glaceon', 'Ice'], // 1-1-014
  ['Pidgeot', 'Flying'], // 1-1-015
  ['Gengar', 'Ghost'], // 1-1-016
  ['Arcanine', 'Fire'], // 1-1-017
  ['Rhyperior', 'Ground'], // 1-1-018
  ['Pikachu', 'Electric'], // 1-1-019
  ['Flygon', 'Dragon'], // 1-1-020
  ['Rillaboom', 'Grass'], // 1-1-021
  ['Cinderace', 'Fire'], // 1-1-022
  ['Inteleon', 'Water'], // 1-1-023
  ['Obstagoon', 'Dark'], // 1-1-024
  ['Keldeo', 'Water'], // 1-1-025

  // Normal Tags (★2-4)
  ['Sprigatito', 'Grass'], // 1-1-026
  ['Floragato', 'Grass'], // 1-1-027
  ['Fuecoco', 'Fire'], // 1-1-028
  ['Crocalor', 'Fire'], // 1-1-029
  ['Quaxly', 'Water'], // 1-1-030
  ['Quaxwell', 'Water'], // 1-1-031
  ['Grookey', 'Grass'], // 1-1-032
  ['Thwackey', 'Grass'], // 1-1-033
  ['Rillaboom', 'Grass'], // 1-1-034
  ['Scorbunny', 'Fire'], // 1-1-035
  ['Raboot', 'Fire'], // 1-1-036
  ['Cinderace', 'Fire'], // 1-1-037
  ['Sobble', 'Water'], // 1-1-038
  ['Drizzile', 'Water'], // 1-1-039
  ['Inteleon', 'Water'], // 1-1-040
  ['Dedenne', 'Electric'], // 1-1-041
  ['Pikachu', 'Electric'], // 1-1-042
  ['Raichu', 'Electric'], // 1-1-043
  ['Eevee', 'Normal'], // 1-1-044
  ['Jolteon', 'Electric'], // 1-1-045
  ['Espeon', 'Psychic'], // 1-1-046
  ['Leafeon', 'Grass'], // 1-1-047
  ['Sylveon', 'Fairy'], // 1-1-048
  ['Sneasel', 'Dark'], // 1-1-049
  ['Weavile', 'Dark'], // 1-1-050
  ['Golett', 'Ground'], // 1-1-051
  ['Golurk', 'Ground'], // 1-1-052
  ['Slowpoke', 'Water'], // 1-1-053
  ['Slowbro', 'Water'], // 1-1-054
  ['Mudbray', 'Ground'], // 1-1-055
  ['Mudsdale', 'Ground'], // 1-1-056
  ['Galarian Zigzagoon', 'Dark'], // 1-1-057
  ['Galarian Linoone', 'Dark'], // 1-1-058
  ['Obstagoon', 'Dark'], // 1-1-059
  ['Grubbin', 'Bug'], // 1-1-060
  ['Charjabug', 'Bug'], // 1-1-061
  ['Vikavolt', 'Bug'], // 1-1-062
  ['Doduo', 'Normal'], // 1-1-063
  ['Dodrio', 'Normal'], // 1-1-064
  ['Gossifleur', 'Grass'], // 1-1-065
  ['Eldegoss', 'Grass'], // 1-1-066
  ['Turtonator', 'Fire'], // 1-1-067
  ['Cramorant', 'Water'], // 1-1-068
  ['Snom', 'Ice'], // 1-1-069
  ['Frosmoth', 'Ice'], // 1-1-070
];

/**
 * Generate Season 1 tags from the raw name/type data.
 * - Index 0-9  → rarity 'superstar'
 * - Index 10-24 → rarity 'star'
 * - Index 25+  → rarity 'normal'
 */
export function createSeason1Tags(): MezastarTag[] {
  return season1NamesAndTypes.map(([name, type], index) => {
    const cardNumber = index + 1;
    const no = `1-1-${String(cardNumber).padStart(3, '0')}`;

    let rarity: MezastarTag['rarity'] = 'normal';
    if (cardNumber <= 10) {
      rarity = 'superstar';
    } else if (cardNumber <= 25) {
      rarity = 'star';
    }

    return {
      id: `season-1-${no}`,
      no,
      name,
      rarity,
      type,
      imageUrl: `https://webassets-pokemonmezastar.marv.jp/assets/img/ver1/pm_en_${no}_f.png`,
      seasonId: 'season-1',
      notes: '',
    };
  });
}
