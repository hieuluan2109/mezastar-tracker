import React from 'react';
import type { MezastarTag, CollectionData } from '../types';
import { Sparkles, Star, Layers, Flame } from 'lucide-react';

interface StatsDashboardProps {
  tags: MezastarTag[];
  collection: CollectionData;
  activeSeasonId: string;
  seasonName: string;
}

export const StatsDashboard: React.FC<StatsDashboardProps> = ({
  tags,
  collection,
  activeSeasonId,
  seasonName,
}) => {
  // Filter tags belonging to active season (or all if we want, but doing it per season is cleaner)
  const seasonTags = tags.filter(t => t.seasonId === activeSeasonId);
  const totalTagsCount = seasonTags.length;

  const collectedTags = seasonTags.filter(t => (collection[t.id]?.quantity || 0) > 0);
  const collectedCount = collectedTags.length;
  
  const percentage = totalTagsCount > 0 ? Math.round((collectedCount / totalTagsCount) * 100) : 0;

  // Breakdown by rarity
  const getRarityStats = (rarity: MezastarTag['rarity']) => {
    const rarityTags = seasonTags.filter(t => t.rarity === rarity);
    const total = rarityTags.length;
    const collected = rarityTags.filter(t => (collection[t.id]?.quantity || 0) > 0).length;
    return { collected, total, percent: total > 0 ? Math.round((collected / total) * 100) : 0 };
  };

  const superstarStats = getRarityStats('superstar');
  const starStats = getRarityStats('star');
  const normalStats = getRarityStats('normal');
  const promoEventCustomStats = {
    collected: seasonTags
      .filter(t => ['promo', 'event', 'custom'].includes(t.rarity))
      .filter(t => (collection[t.id]?.quantity || 0) > 0).length,
    total: seasonTags.filter(t => ['promo', 'event', 'custom'].includes(t.rarity)).length
  };

  return (
    <div className="grid gap-4 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 mb-8 entrance-fade">
      {/* Overall Progress Card */}
      <div className="glass-panel rounded-2xl p-5 flex items-center justify-between relative overflow-hidden bg-gradient-to-r from-rose-950/20 to-panel/40 col-span-1 md:col-span-2 group hover:border-rose-500/30 transition-all duration-500">
        <div className="relative z-10 space-y-2 w-full">
          <span className="text-xs font-black text-rose-400 tracking-wider uppercase">{seasonName}</span>
          <h2 className="text-2xl font-extrabold text-primary">Độ Phủ Bộ Sưu Tập</h2>
          
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-secondary font-medium">
              <span>Đã hoàn thành</span>
              <span className="font-bold text-primary">{collectedCount} / {totalTagsCount} thẻ</span>
            </div>
            <div className="w-full bg-progress-track rounded-full h-3.5 overflow-hidden p-0.5 border border-secondary/40 progress-shimmer">
              <div 
                className="bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 h-2 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center h-20 w-20 rounded-full border-4 border-rose-500/20 bg-rose-500/5 text-rose-400 text-2xl font-black shrink-0 ml-4 relative group-hover:scale-105 transition-transform duration-500">
          {percentage}%
          <div className="absolute inset-0 rounded-full animate-ping border border-rose-500/10 pointer-events-none"></div>
        </div>
      </div>

      {/* Superstar Stats Card */}
      <div className="glass-panel rounded-2xl p-5 flex flex-col justify-between hover:border-rose-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-rose-950/20">
        <div className="flex items-center justify-between">
          <div className="h-9 w-9 rounded-lg bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
            <Sparkles className="h-5 w-5 text-rose-400" aria-hidden="true" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30">
            Superstar ★6
          </span>
        </div>
        <div className="mt-4">
          <div className="flex items-baseline space-x-1">
            <span className="text-3xl font-black text-primary">{superstarStats.collected}</span>
            <span className="text-sm text-secondary">/ {superstarStats.total}</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-secondary">Hoàn thành</span>
            <span className="text-xs font-bold text-rose-400">{superstarStats.percent}%</span>
          </div>
        </div>
      </div>

      {/* Star Stats Card */}
      <div className="glass-panel rounded-2xl p-5 flex flex-col justify-between hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-950/20">
        <div className="flex items-center justify-between">
          <div className="h-9 w-9 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
            <Star className="h-5 w-5 text-purple-400 fill-purple-400/30" aria-hidden="true" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/30">
            Star ★5
          </span>
        </div>
        <div className="mt-4">
          <div className="flex items-baseline space-x-1">
            <span className="text-3xl font-black text-primary">{starStats.collected}</span>
            <span className="text-sm text-secondary">/ {starStats.total}</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-secondary">Hoàn thành</span>
            <span className="text-xs font-bold text-purple-400">{starStats.percent}%</span>
          </div>
        </div>
      </div>

      {/* Normal Stats Card */}
      <div className="glass-panel rounded-2xl p-5 flex flex-col justify-between hover:border-slate-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-slate-950/20">
        <div className="flex items-center justify-between">
          <div className="h-9 w-9 rounded-lg bg-slate-500/10 flex items-center justify-center border border-slate-500/20">
            <Layers className="h-5 w-5 text-secondary" aria-hidden="true" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-500/15 text-slate-400 border border-slate-500/30">
            Normal ★2-4
          </span>
        </div>
        <div className="mt-4">
          <div className="flex items-baseline space-x-1">
            <span className="text-3xl font-black text-primary">{normalStats.collected}</span>
            <span className="text-sm text-secondary">/ {normalStats.total}</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-secondary">Hoàn thành</span>
            <span className="text-xs font-bold text-slate-400">{normalStats.percent}%</span>
          </div>
        </div>
      </div>

      {/* Custom/Promo Stats Card (Only shown if current season is Special or if there are promo tags) */}
      {['special', 'promo'].includes(activeSeasonId) || promoEventCustomStats.total > 0 ? (
        <div className="glass-panel rounded-2xl p-5 flex flex-col justify-between hover:border-orange-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-orange-950/20 col-span-1 sm:col-span-2 md:col-span-1">
          <div className="flex items-center justify-between">
          <div className="h-9 w-9 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
            <Flame className="h-5 w-5 text-orange-400" aria-hidden="true" />
          </div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/30">
              Custom / Event
            </span>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline space-x-1">
              <span className="text-3xl font-black text-primary">{promoEventCustomStats.collected}</span>
              <span className="text-sm text-secondary">/ {promoEventCustomStats.total}</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-secondary">Thẻ đã note</span>
              <span className="text-xs font-bold text-orange-400">Sở hữu</span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
