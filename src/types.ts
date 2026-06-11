export interface MezastarTag {
  id: string; // Unique identifier (number or custom ID)
  no: string; // Card catalog number, e.g., "1-1-001" or "P-001"
  name: string; // Pokémon name
  rarity: 'superstar' | 'star' | 'normal' | 'promo' | 'event' | 'custom' | 'special';
  type: string; // Pokémon type, e.g. "Electric", "Fire", "Water", "Steel"
  imageUrl?: string; // Image URL path
  seasonId: string; // Key reference to Season ID
  isCustom?: boolean; // True if manually added
  notes?: string; // Custom collector notes
}

export interface Season {
  id: string;
  name: string;
  description?: string;
  isCustom?: boolean;
}

export interface CollectionData {
  [tagId: string]: {
    quantity: number;
    notes?: string;
  };
}

export interface FilterState {
  search: string;
  seasonId: string;
  rarity: string[];
  type: string;
  ownership: 'all' | 'owned' | 'missing';
}
