import React from 'react';
import type { MezastarTag } from '../types';
import { Plus, Minus, MessageSquare, Flame } from 'lucide-react';

interface TagCardProps {
  tag: MezastarTag;
  quantity: number;
  hasNotes: boolean;
  onQuantityChange: (tagId: string, delta: number) => void;
  onCardClick: () => void;
}

export const TagCard: React.FC<TagCardProps> = ({
  tag,
  quantity,
  hasNotes,
  onQuantityChange,
  onCardClick,
}) => {
  const isOwned = quantity > 0;

  // Decide border gradient and shadow glows depending on rarity
  let cardClass = 'glass-panel border-slate-800/80';
  let glowClass = '';
  let rarityBadgeColor = 'bg-slate-800 text-slate-300';
  let rarityText = '★2-4';

  let isSuperstar = false;
  let isStarRarity = false;

  if (tag.rarity === 'superstar') {
    isSuperstar = true;
    cardClass = 'bg-card border-transparent border-0 shadow-lg shadow-rose-950/30 shiny-effect border-glow-superstar';
    glowClass = 'group-hover:shadow-rose-600/25 group-hover:shadow-xl';
    rarityBadgeColor = 'bg-gradient-to-r from-rose-600 to-amber-500 text-white font-extrabold shadow-md shadow-rose-950/30';
    rarityText = 'Superstar ★6';
  } else if (tag.rarity === 'star') {
    isStarRarity = true;
    cardClass = 'bg-card border-purple-500/50 shadow-md shadow-purple-950/20';
    glowClass = 'group-hover:shadow-purple-500/20';
    rarityBadgeColor = 'bg-purple-600 text-white font-extrabold shadow-sm';
    rarityText = 'Star ★5';
  } else if (tag.rarity === 'promo') {
    cardClass = 'bg-card border-orange-500/50';
    glowClass = 'group-hover:shadow-orange-500/10';
    rarityBadgeColor = 'bg-orange-500 text-white font-extrabold';
    rarityText = 'Promo';
  } else if (tag.rarity === 'event') {
    cardClass = 'bg-card border-cyan-500/50';
    glowClass = 'group-hover:shadow-cyan-500/10';
    rarityBadgeColor = 'bg-cyan-500 text-white font-extrabold';
    rarityText = 'Event';
  } else if (tag.rarity === 'custom') {
    cardClass = 'bg-card border-emerald-500/50';
    glowClass = 'group-hover:shadow-emerald-500/10';
    rarityBadgeColor = 'bg-emerald-500 text-white font-extrabold';
    rarityText = 'Custom';
  }

  // Type-specific CSS class defined in index.css
  const typeBadgeClass = `badge-${tag.type.toLowerCase()}`;

  // Image loader logic
  const renderImage = () => {
    if (tag.imageUrl) {
      return (
        <img
          src={tag.imageUrl}
          alt={tag.name}
          className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            // If image fails, replace with placeholder
            (e.target as HTMLElement).style.display = 'none';
            const placeholder = (e.target as HTMLElement).nextElementSibling;
            if (placeholder) {
              placeholder.classList.remove('hidden');
              placeholder.classList.add('flex');
            }
          }}
        />
      );
    }
    return null;
  };

  return (
    <div 
      className={`group relative flex flex-col rounded-2xl p-4 cursor-pointer transition-all duration-300 select-none ${cardClass} ${glowClass} ${
        isOwned 
          ? 'opacity-100 scale-100 hover:scale-[1.02]' 
          : 'opacity-55 grayscale-[30%] hover:opacity-100 hover:scale-[1.02] hover:grayscale-0'
      }`}
      onClick={onCardClick}
    >
      {/* Superstar Sparkle Particles — floating dots around the card */}
      {isSuperstar && (
        <>
          <div className="sparkle-particle"></div>
          <div className="sparkle-particle"></div>
          <div className="sparkle-particle"></div>
          <div className="sparkle-particle"></div>
          <div className="sparkle-particle"></div>
          <div className="sparkle-particle"></div>
        </>
      )}

      {/* 1. Card Top Badge Header */}
      <div className="flex items-center justify-between mb-3.5">
        <span className="text-[10px] font-bold text-secondary tracking-wider font-mono">
          {tag.no}
        </span>
        <span className={`text-[9px] uppercase tracking-wide font-black px-2 py-0.5 rounded-md relative z-[1] ${rarityBadgeColor}`}>
          {rarityText}
        </span>
      </div>

      {/* 2. Image Area (Mezastar Oval shape wrapper) */}
      <div className={`relative flex aspect-[7/10] w-full items-center justify-center rounded-xl bg-root/60 p-2 border overflow-hidden mb-3 ${
        isSuperstar 
          ? 'border-rose-800/40 shadow-inner shadow-rose-950/20' 
          : isStarRarity 
            ? 'border-purple-800/30 shadow-inner shadow-purple-950/20'
            : 'border-panel'
      }`}>
        {/* Glowing aura background for Superstar & Star cards */}
        {isSuperstar && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-rose-900/15 via-rose-800/5 to-transparent opacity-80 group-hover:opacity-100 transition-all duration-700"></div>
            <div className="absolute -inset-4 bg-gradient-to-r from-rose-500/5 via-amber-500/5 to-rose-500/5 rounded-full blur-3xl animate-pulse-glow"></div>
          </>
        )}
        {isStarRarity && (
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 to-transparent opacity-60 group-hover:opacity-100 transition-opacity"></div>
        )}

        {/* Dynamic Image Loader */}
        {renderImage()}

        {/* Fallback Beautiful Placeholder card plate */}
        <div className={`absolute inset-0 flex-col items-center justify-center bg-gradient-to-b from-panel to-root p-4 rounded-xl text-center border border-primary ${tag.imageUrl ? 'hidden' : 'flex'}`}>
          <div className="h-10 w-10 rounded-full bg-elevated/80 flex items-center justify-center mb-2 text-secondary">
            <Flame className="h-5 w-5" />
          </div>
          <span className="text-xs font-bold text-secondary">No Image</span>
          <span className="text-[10px] text-muted mt-1">Hệ {tag.type}</span>
        </div>

        {/* Superstar badge overlay on image */}
        {isSuperstar && (
          <div className="absolute top-2 left-2">
            <span className="text-[10px] font-extrabold text-amber-300 bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-500/30 backdrop-blur-sm animate-sparkle-slow">
              ✦ SUPERSTAR
            </span>
          </div>
        )}

        {/* Owned Status Count Badge overlay */}
        {isOwned && (
          <div className="absolute top-2 right-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-rose-600 px-1.5 text-xs font-black text-white border-2 border-root shadow-md">
            x{quantity}
          </div>
        )}

        {/* Notes Indicator overlay */}
        {hasNotes && (
          <div className="absolute bottom-2 left-2 flex h-6 w-6 items-center justify-center rounded-lg bg-panel text-yellow-400 border border-primary/80 shadow-md" title="Có ghi chú">
            <MessageSquare className="h-3.5 w-3.5" />
          </div>
        )}
      </div>

      {/* 3. Name and Type info */}
      <div className="flex-1 min-h-[50px] mb-4">
        <h3 className="text-sm font-extrabold text-primary group-hover:text-rose-400 transition-colors line-clamp-1">
          {tag.name}
        </h3>
        <div className="flex items-center space-x-1.5 mt-1">
          <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${typeBadgeClass}`}>
            {tag.type}
          </span>
          {tag.isCustom && (
            <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-black uppercase">
              Custom
            </span>
          )}
        </div>
      </div>

      {/* 4. Quantity Adjuster Footer */}
      <div 
        className="flex items-center justify-between gap-1 w-full bg-root/60 p-1 border border-panel rounded-xl"
        onClick={(e) => e.stopPropagation()} // Stop click propagation to open details modal
      >
        <button
          onClick={() => onQuantityChange(tag.id, -1)}
          disabled={quantity <= 0}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-secondary hover:text-primary hover:bg-elevated disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        >
          <Minus className="h-4 w-4" />
        </button>
        
        <span className="text-xs font-black text-primary select-none w-8 text-center">
          {quantity}
        </span>

        <button
          onClick={() => onQuantityChange(tag.id, 1)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-secondary hover:text-primary hover:bg-elevated transition-colors"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

    </div>
  );
};
