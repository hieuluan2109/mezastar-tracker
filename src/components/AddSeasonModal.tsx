import React, { useState } from 'react';
import { X, Plus, AlertCircle } from 'lucide-react';
import type { Season } from '../types';

interface AddSeasonModalProps {
  onClose: () => void;
  onAddSeason: (name: string, description: string) => void;
  existingSeasons: Season[];
}

export const AddSeasonModal: React.FC<AddSeasonModalProps> = ({
  onClose,
  onAddSeason,
  existingSeasons,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Vui lòng nhập tên Season');
      return;
    }

    const isDuplicate = existingSeasons.some(
      s => s.name.toLowerCase() === name.trim().toLowerCase()
    );
    if (isDuplicate) {
      setError('Tên Season này đã tồn tại');
      return;
    }

    onAddSeason(name.trim(), description.trim());
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
    >
      <div className="relative w-full max-w-md rounded-2xl bg-panel border border-primary/80 shadow-2xl p-6 md:p-8 animate-in fade-in zoom-in-95 duration-200 theme-transition">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-secondary hover:text-primary bg-badge p-1.5 rounded-lg border border-primary hover:bg-elevated transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-black text-primary mb-6">Tạo Mùa Sưu Tầm Mới</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {error && (
            <div className="flex items-center space-x-2 text-red-400 bg-red-950/20 border border-red-900/30 p-3 rounded-xl text-xs font-semibold">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Season Name */}
          <div className="space-y-1">
            <label htmlFor="add-season-name" className="text-xs font-bold text-secondary">Tên Mùa Sưu Tầm *</label>
            <input
              id="add-season-name"
              type="text"
              placeholder="Ví dụ: Double Chain Set 1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-input border border-primary text-primary placeholder-theme text-sm focus:outline-none focus:border-rose-500/50 transition-colors"
              autoFocus
            />
          </div>

          {/* Season Description */}
          <div className="space-y-1">
            <label htmlFor="add-season-description" className="text-xs font-bold text-secondary">Mô tả chi tiết</label>
            <textarea
              id="add-season-description"
              placeholder="Ví dụ: Phát hành từ tháng 8/2026..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-20 px-3 py-2 rounded-xl bg-input border border-primary text-primary placeholder-theme text-sm focus:outline-none focus:border-rose-500/50 transition-colors resize-none"
            ></textarea>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-bold rounded-xl border border-primary text-secondary hover:text-primary hover:bg-elevated transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="inline-flex items-center space-x-1.5 bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all shadow-md shadow-rose-950/20 active:scale-98"
            >
              <Plus className="h-4 w-4" />
              <span>Tạo Mùa mới</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
