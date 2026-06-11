'use client'

import React from 'react';
import type { FilterState } from '../types';
import { Search, Plus, Filter, CircleDot } from 'lucide-react';
import { POKEMON_TYPES } from '../data/defaultTags';
import { useCollection } from '../context/CollectionContext';
import { useFilters } from '../context/FilterContext';

interface FilterBarProps {
  onAddTag: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  onAddTag,
}) => {
  const { seasons } = useCollection();
  const { filters, setFilters } = useFilters();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value });
  };

  const handleSeasonSelect = (seasonId: string) => {
    setFilters({ ...filters, seasonId });
  };

  const handleRarityToggle = (rarity: string) => {
    const isSelected = filters.rarity.includes(rarity);
    const newRarity = isSelected
      ? filters.rarity.filter((r) => r !== rarity)
      : [...filters.rarity, rarity];
    setFilters({ ...filters, rarity: newRarity });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, type: e.target.value });
  };

  const handleOwnershipChange = (ownership: FilterState['ownership']) => {
    setFilters({ ...filters, ownership });
  };

  const rarityOptions = [
    { value: 'superstar', label: 'Superstar ★6', color: 'hover:border-rose-500/50 active:bg-rose-500/10 text-rose-400 bg-rose-500/5 border-rose-500/20' },
    { value: 'star', label: 'Star ★5', color: 'hover:border-purple-500/50 active:bg-purple-500/10 text-purple-400 bg-purple-500/5 border-purple-500/20' },
    { value: 'normal', label: 'Normal ★2-4', color: 'hover:border-slate-400/50 active:bg-slate-400/10 text-slate-300 bg-slate-500/5 border-slate-500/20' },
    { value: 'promo', label: 'Promo', color: 'hover:border-orange-500/50 active:bg-orange-500/10 text-orange-400 bg-orange-500/5 border-orange-500/20' },
    { value: 'event', label: 'Event', color: 'hover:border-cyan-500/50 active:bg-cyan-500/10 text-cyan-400 bg-cyan-500/5 border-cyan-500/20' },
  ];

  return (
    <div className="space-y-6 mb-8 bg-panel/25 p-6 rounded-2xl border border-primary/50 backdrop-blur-sm theme-transition">
      {/* 1. Seasons Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-primary/80 pb-4">
        <div className="flex flex-wrap gap-2">
          {seasons.map((season) => {
            const isActive = filters.seasonId === season.id;
            return (
              <button
                key={season.id}
                onClick={() => handleSeasonSelect(season.id)}
                className={`px-4 py-2 text-sm font-bold rounded-xl transition-all focus-ring ${
                  isActive
                    ? 'bg-gradient-to-r from-rose-600 to-amber-500 text-white shadow-lg shadow-rose-950/20 scale-102'
                    : 'bg-panel/60 text-secondary hover:text-primary hover:bg-elevated border border-primary/80'
                }`}
              >
                {season.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Main Filters Section */}
      <div className="grid gap-4 md:grid-cols-12 grid-cols-1">
        {/* Search Input */}
        <div className="relative md:col-span-4">
          <label htmlFor="filter-search" className="sr-only">
            Tìm kiếm thẻ
          </label>
          <Search
            className="absolute left-3 top-3 h-4 w-4 text-secondary"
            aria-hidden="true"
          />
          <input
            id="filter-search"
            type="text"
            placeholder="Tìm theo tên Pokémon hoặc số thẻ..."
            value={filters.search}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-input border border-primary text-primary placeholder-theme focus:outline-none focus:border-rose-500/50 transition-colors text-sm"
          />
        </div>

        {/* Pokémon Type Select */}
        <div className="relative md:col-span-3">
          <label htmlFor="filter-type" className="sr-only">
            Lọc theo hệ Pokémon
          </label>
          <select
            id="filter-type"
            value={filters.type}
            onChange={handleTypeChange}
            className="w-full px-4 py-2.5 rounded-xl bg-input border border-primary text-secondary focus:outline-none focus:border-rose-500/50 transition-colors text-sm appearance-none cursor-pointer"
          >
            <option value="">Tất cả hệ Pokémon</option>
            {POKEMON_TYPES.map((type) => (
              <option key={type} value={type}>
                Hệ {type}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-3.5 flex items-center text-secondary">
            <Filter className="h-4 w-4" aria-hidden="true" />
          </div>
        </div>

        {/* Ownership Toggles */}
        <div className="flex rounded-xl bg-input p-1 border border-primary md:col-span-3">
          {(['all', 'owned', 'missing'] as const).map((mode) => {
            const label =
              mode === 'all'
                ? 'Tất cả'
                : mode === 'owned'
                  ? 'Đã sở hữu'
                  : 'Chưa có';
            const isActive = filters.ownership === mode;
            return (
              <button
                key={mode}
                onClick={() => handleOwnershipChange(mode)}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all focus-ring-muted ${
                  isActive
                    ? 'bg-elevated text-primary shadow-sm'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Action Button: Add Custom Tag */}
        <button
          onClick={onAddTag}
          className="w-full md:col-span-2 inline-flex items-center justify-center space-x-2 py-2.5 px-4 text-sm font-bold text-white rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 transition-all shadow-md shadow-emerald-950/20 active:scale-98 focus-ring"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          <span>Thêm thẻ</span>
        </button>
      </div>

      {/* 3. Rarity Multi-selectors */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-primary/40">
        <span className="text-xs font-bold text-muted mr-2 flex items-center">
          <CircleDot className="h-3.5 w-3.5 mr-1" aria-hidden="true" />
          Lọc theo độ hiếm:
        </span>
        <div className="flex flex-wrap gap-2">
          {rarityOptions.map((opt) => {
            const isSelected = filters.rarity.includes(opt.value);
            return (
              <button
                key={opt.value}
                onClick={() => handleRarityToggle(opt.value)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all focus-ring-muted ${opt.color} ${
                  isSelected
                    ? 'border-opacity-100 ring-1 ring-slate-600/50 bg-opacity-30 scale-102 font-black'
                    : 'border-opacity-30 bg-opacity-0 text-secondary'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
