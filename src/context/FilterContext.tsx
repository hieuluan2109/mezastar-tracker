import {
  createContext,
  useContext,
  useState,
  useMemo,
  type ReactNode,
} from 'react';
import type { FilterState } from '../types';
import { useCollection } from './CollectionContext';

interface FilterContextValue {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  currentSeasonName: string;
}

const FilterContext = createContext<FilterContextValue | null>(null);

const DEFAULT_FILTERS: FilterState = {
  search: '',
  seasonId: 'season-1',
  rarity: [],
  type: '',
  ownership: 'all',
};

export function FilterProvider({ children }: { children: ReactNode }) {
  const { seasons } = useCollection();
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  const currentSeasonName = useMemo(() => {
    const season = seasons.find((s) => s.id === filters.seasonId);
    return season ? season.name : 'Mùa sưu tập';
  }, [seasons, filters.seasonId]);

  const value: FilterContextValue = {
    filters,
    setFilters,
    currentSeasonName,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

export function useFilters(): FilterContextValue {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error('useFilters must be used within a FilterProvider');
  return ctx;
}
