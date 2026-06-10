import React, { useState, useEffect } from 'react';
import type { MezastarTag } from '../types';
import { X, Save, Trash2, Award, MapPin, ZoomIn } from 'lucide-react';
import { useCollection } from '../context/CollectionContext';

interface TagDetailModalProps {
  tag: MezastarTag;
  quantity: number;
  noteText: string;
  onClose: () => void;
}

export const TagDetailModal: React.FC<TagDetailModalProps> = ({
  tag,
  quantity,
  noteText,
  onClose,
}) => {
  const { handleSaveNote, handleQuantityChange, handleDeleteTag } =
    useCollection();
  const [localNote, setLocalNote] = useState(noteText);
  const [isImageZoomOpen, setIsImageZoomOpen] = useState(false);

  // Sync state when tag changes
  useEffect(() => {
    setLocalNote(noteText);
  }, [noteText, tag]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isImageZoomOpen) {
          setIsImageZoomOpen(false);
        } else {
          onClose();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, isImageZoomOpen]);

  const handleSave = () => {
    handleSaveNote(tag.id, localNote);
  };

  // Click outside to close helper
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  let rarityLabel = 'Thường ★2-4';
  let rarityBadgeColor = 'bg-slate-800 text-slate-300';
  if (tag.rarity === 'superstar') {
    rarityLabel = 'Superstar ★6';
    rarityBadgeColor = 'bg-gradient-to-r from-rose-600 to-amber-500 text-white font-extrabold';
  } else if (tag.rarity === 'star') {
    rarityLabel = 'Star ★5';
    rarityBadgeColor = 'bg-purple-600 text-white font-extrabold';
  } else if (tag.rarity === 'promo') {
    rarityLabel = 'Promo (Quà tặng)';
    rarityBadgeColor = 'bg-orange-500 text-white font-extrabold';
  } else if (tag.rarity === 'event') {
    rarityLabel = 'Sự kiện (Event)';
    rarityBadgeColor = 'bg-cyan-500 text-slate-950 font-extrabold';
  } else if (tag.rarity === 'custom') {
    rarityLabel = 'Thẻ tự thêm (Custom)';
    rarityBadgeColor = 'bg-emerald-500 text-slate-950 font-extrabold';
  }

  const typeBadgeClass = `badge-${tag.type.toLowerCase()}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-overlay p-4 backdrop-blur-md"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Chi tiết thẻ ${tag.name}`}
    >
      <div className="relative w-full max-w-2xl rounded-2xl bg-panel border border-primary/80 shadow-2xl p-6 md:p-8 animate-in fade-in zoom-in-95 duration-200 theme-transition">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Đóng cửa sổ"
          className="absolute right-4 top-4 text-secondary hover:text-primary bg-badge p-1.5 rounded-lg border border-primary hover:bg-elevated transition-colors focus-ring"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="grid gap-6 md:grid-cols-12 grid-cols-1 mt-2">
          {/* Left: Card visual preview */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div
              className={`relative flex aspect-[7/10] w-full max-w-[200px] items-center justify-center rounded-2xl bg-root border p-3 ${
                tag.rarity === 'superstar'
                  ? 'border-rose-500/60 shadow-lg shadow-rose-950/30'
                  : tag.rarity === 'star'
                    ? 'border-purple-500/50 shadow-md shadow-purple-950/20'
                    : 'border-primary'
              }`}
            >
              {tag.imageUrl ? (
                <button
                  onClick={() => setIsImageZoomOpen(true)}
                  className="h-full w-full relative group"
                  aria-label={`Xem phóng to ảnh ${tag.name}`}
                >
                  <img
                    src={tag.imageUrl}
                    alt={tag.name}
                    className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                      const fallback =
                        (e.target as HTMLElement).nextElementSibling;
                      if (fallback) fallback.classList.remove('hidden');
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20 rounded-lg">
                    <ZoomIn className="h-6 w-6 text-white drop-shadow-lg" aria-hidden="true" />
                  </div>
                </button>
              ) : null}

              {/* Placeholder */}
              <div
                className={`flex flex-col items-center justify-center text-center p-4 rounded-xl text-secondary ${tag.imageUrl ? 'hidden' : ''}`}
              >
                <div className="h-12 w-12 rounded-full bg-elevated flex items-center justify-center mb-2">
                  <Award className="h-6 w-6 text-yellow-500" aria-hidden="true" />
                </div>
                <span className="text-xs font-bold">Thẻ Mezastar</span>
                <span className="text-[10px] text-muted mt-1">{tag.type}</span>
              </div>

              {/* Superstar glowing glow inside modal */}
              {tag.rarity === 'superstar' && (
                <div className="absolute inset-0 bg-gradient-to-t from-rose-900/10 to-transparent pointer-events-none rounded-2xl"></div>
              )}
            </div>

            <span className="text-xs font-mono font-bold text-muted mt-3">
              Mã thẻ: {tag.no}
            </span>
          </div>

          {/* Right: Details & Notebook */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-5">
            {/* Title & Badges */}
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2 items-center">
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-black uppercase tracking-wider ${rarityBadgeColor}`}
                >
                  {rarityLabel}
                </span>
                <span
                  className={`text-[10px] px-2.5 py-0.5 rounded font-bold ${typeBadgeClass}`}
                >
                  Hệ {tag.type}
                </span>
              </div>
              <h2 className="text-2xl font-black text-primary">{tag.name}</h2>
            </div>

            {/* Quantity Adjuster */}
            <div className="bg-root/60 p-4 rounded-xl border border-primary/80 flex items-center justify-between">
              <div>
                <span className="text-xs text-secondary block font-semibold">
                  Số lượng đang sở hữu:
                </span>
                <span className="text-lg font-black text-primary">
                  {quantity} thẻ
                </span>
              </div>
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => handleQuantityChange(tag.id, -1)}
                  disabled={quantity <= 0}
                  aria-label="Giảm số lượng"
                  className="h-9 w-9 rounded-lg bg-elevated text-secondary hover:text-primary hover:bg-muted disabled:opacity-30 disabled:hover:bg-elevated flex items-center justify-center font-bold text-lg transition-colors focus-ring-muted"
                >
                  -
                </button>
                <button
                  onClick={() => handleQuantityChange(tag.id, 1)}
                  aria-label="Tăng số lượng"
                  className="h-9 w-9 rounded-lg bg-elevated text-secondary hover:text-primary hover:bg-muted flex items-center justify-center font-bold text-lg transition-colors focus-ring-muted"
                >
                  +
                </button>
              </div>
            </div>

            {/* Ghi chú sưu tầm */}
            <div className="space-y-1.5">
              <label
                htmlFor="detail-notes"
                className="text-xs font-bold text-secondary flex items-center space-x-1"
              >
                <MapPin className="h-3.5 w-3.5 text-rose-500" aria-hidden="true" />
                <span>
                  Ghi chú sưu tập (Sự kiện, Nơi quay được, Ngày săn...):
                </span>
              </label>
              <textarea
                id="detail-notes"
                value={localNote}
                onChange={(e) => setLocalNote(e.target.value)}
                placeholder="Ví dụ: Quay được ở máy Lotte Center Liễu Giai ngày 12/06/2026..."
                className="w-full h-24 rounded-xl bg-input border border-primary p-3 text-sm text-primary placeholder-theme focus:outline-none focus:border-rose-500/50 transition-colors resize-none"
              ></textarea>
            </div>

            {/* Save & Actions footer */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleSave}
                className="inline-flex items-center space-x-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all shadow-md shadow-rose-950/20 focus-ring"
              >
                <Save className="h-4 w-4" aria-hidden="true" />
                <span>Lưu ghi chú</span>
              </button>

              {/* Delete Button (Only for custom/event added cards) */}
              {tag.isCustom && (
                <button
                  onClick={() => {
                    if (
                      confirm(
                        'Bạn chắc chắn muốn xóa thẻ tự tạo này khỏi danh sách?'
                      )
                    ) {
                      handleDeleteTag(tag.id);
                      onClose();
                    }
                  }}
                  aria-label="Xóa thẻ này"
                  className="inline-flex items-center space-x-1 px-3 py-2 text-xs font-bold text-red-400 bg-red-950/20 hover:bg-red-900/30 border border-red-900/30 rounded-xl transition-colors focus-ring"
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Xóa thẻ</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Image Zoom Overlay */}
      {isImageZoomOpen && tag.imageUrl && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          onClick={() => setIsImageZoomOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`Ảnh phóng to: ${tag.name}`}
        >
          <button
            onClick={() => setIsImageZoomOpen(false)}
            aria-label="Đóng ảnh phóng to"
            className="absolute right-4 top-4 z-10 text-white/70 hover:text-white bg-black/40 p-2 rounded-full transition-colors focus-ring"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>

          <img
            src={tag.imageUrl}
            alt={tag.name}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          />

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-xs font-medium bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm">
            {tag.name} — {tag.no}
          </div>
        </div>
      )}
    </div>
  );
};
