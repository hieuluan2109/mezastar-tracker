'use client'

import React, { useState, useEffect } from 'react';
import type { MezastarTag } from '../types';
import { X, Plus, Image, AlertCircle } from 'lucide-react';
import { POKEMON_TYPES } from '../data/defaultTags';
import { useCollection } from '../context/CollectionContext';

interface AddTagModalProps {
  defaultSeasonId: string;
  onClose: () => void;
}

export const AddTagModal: React.FC<AddTagModalProps> = ({
  defaultSeasonId,
  onClose,
}) => {
  const { seasons, handleAddTag } = useCollection();
  const [name, setName] = useState('');
  const [no, setNo] = useState('');
  const [rarity, setRarity] = useState<MezastarTag['rarity']>('promo');
  const [type, setType] = useState('Normal');
  const [seasonId, setSeasonId] = useState(defaultSeasonId);
  const [imageUrl, setImageUrl] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Vui lòng nhập tên Pokémon / Thẻ bài');
      return;
    }
    if (!no.trim()) {
      setError('Vui lòng nhập mã thẻ (ví dụ: P-001, Custom-01)');
      return;
    }

    handleAddTag(
      {
        no,
        name,
        rarity,
        type,
        imageUrl: imageUrl.trim() || undefined,
        seasonId,
        notes: notes.trim(),
        isCustom: true,
      },
      quantity
    );

    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-overlay p-4 backdrop-blur-md"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Thêm thẻ thủ công"
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-panel border border-primary/80 shadow-2xl p-6 md:p-8 animate-in fade-in zoom-in-95 duration-200 theme-transition">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Đóng cửa sổ"
          className="absolute right-4 top-4 text-secondary hover:text-primary bg-badge p-1.5 rounded-lg border border-primary hover:bg-elevated transition-colors focus-ring"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <h2 className="text-xl font-black text-primary mb-6 flex items-center space-x-2">
          <span>Thêm Thẻ Thủ Công</span>
          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-black uppercase tracking-wider">
            Custom / Event / Promo
          </span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="flex items-center space-x-2 text-red-400 bg-red-950/20 border border-red-900/30 p-3 rounded-xl text-xs font-semibold">
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {/* Tag Number */}
            <div className="space-y-1">
              <label
                htmlFor="add-tag-no"
                className="text-xs font-bold text-secondary"
              >
                Mã Số Thẻ *
              </label>
              <input
                id="add-tag-no"
                type="text"
                placeholder="Ví dụ: P-001"
                value={no}
                onChange={(e) => setNo(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-input border border-primary text-primary placeholder-theme text-sm focus:outline-none focus:border-rose-500/50 transition-colors"
              />
            </div>

            {/* Pokémon Name */}
            <div className="space-y-1">
              <label
                htmlFor="add-tag-name"
                className="text-xs font-bold text-secondary"
              >
                Tên Pokémon *
              </label>
              <input
                id="add-tag-name"
                type="text"
                placeholder="Ví dụ: Pikachu"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-input border border-primary text-primary placeholder-theme text-sm focus:outline-none focus:border-rose-500/50 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Rarity */}
            <div className="space-y-1">
              <label
                htmlFor="add-tag-rarity"
                className="text-xs font-bold text-secondary"
              >
                Độ Hiếm / Nhãn
              </label>
              <select
                id="add-tag-rarity"
                value={rarity}
                onChange={(e) =>
                  setRarity(e.target.value as MezastarTag['rarity'])
                }
                className="w-full px-3 py-2 rounded-xl bg-input border border-primary text-secondary text-sm focus:outline-none focus:border-rose-500/50 transition-colors"
              >
                <option value="promo">Promo (Quà tặng)</option>
                <option value="event">Event (Sự kiện)</option>
                <option value="custom">Custom (Cá nhân)</option>
                <option value="superstar">Superstar ★6</option>
                <option value="star">Star ★5</option>
                <option value="normal">Normal ★2-4</option>
              </select>
            </div>

            {/* Pokémon Type */}
            <div className="space-y-1">
              <label
                htmlFor="add-tag-type"
                className="text-xs font-bold text-secondary"
              >
                Hệ Pokémon
              </label>
              <select
                id="add-tag-type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-input border border-primary text-secondary text-sm focus:outline-none focus:border-rose-500/50 transition-colors"
              >
                {POKEMON_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Season target */}
            <div className="space-y-1">
              <label
                htmlFor="add-tag-season"
                className="text-xs font-bold text-secondary"
              >
                Cho vào Mùa (Season)
              </label>
              <select
                id="add-tag-season"
                value={seasonId}
                onChange={(e) => setSeasonId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-input border border-primary text-secondary text-sm focus:outline-none focus:border-rose-500/50 transition-colors"
              >
                {seasons.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Initial Quantity */}
            <div className="space-y-1">
              <label
                htmlFor="add-tag-quantity"
                className="text-xs font-bold text-secondary"
              >
                Số Lượng Sở Hữu Ban Đầu
              </label>
              <input
                id="add-tag-quantity"
                type="number"
                min="0"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(0, parseInt(e.target.value) || 0))
                }
                className="w-full px-3 py-2 rounded-xl bg-input border border-primary text-primary text-sm focus:outline-none focus:border-rose-500/50 transition-colors"
              />
            </div>
          </div>

          {/* Image URL */}
          <div className="space-y-1">
            <label
              htmlFor="add-tag-image-url"
              className="text-xs font-bold text-secondary flex items-center space-x-1"
            >
              <Image className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
              <span>Đường dẫn ảnh trực tuyến (Tùy chọn)</span>
            </label>
            <input
              id="add-tag-image-url"
              type="url"
              placeholder="https://example.com/pokemon.png"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-input border border-primary text-primary placeholder-theme text-sm focus:outline-none focus:border-rose-500/50 transition-colors"
            />
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <label
              htmlFor="add-tag-notes"
              className="text-xs font-bold text-secondary"
            >
              Ghi chú nhanh
            </label>
            <textarea
              id="add-tag-notes"
              placeholder="Nhận từ sự kiện Aeon Mall, mua kèm Trainer book..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full h-16 px-3 py-2 rounded-xl bg-input border border-primary text-primary placeholder-theme text-sm focus:outline-none focus:border-rose-500/50 transition-colors resize-none"
            ></textarea>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-bold rounded-xl border border-primary text-secondary hover:text-primary hover:bg-elevated transition-colors focus-ring-muted"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="inline-flex items-center space-x-1.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all shadow-md shadow-emerald-950/20 active:scale-98 focus-ring"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              <span>Thêm thẻ mới</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
