'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { Season, MezastarTag, CollectionData } from '../types';
import { defaultSeasons, defaultTags } from '../data/defaultTags';

interface CollectionContextValue {
  // Raw state
  seasons: Season[];
  tags: MezastarTag[];
  collection: CollectionData;

  // Collection operations
  handleQuantityChange: (tagId: string, delta: number) => void;
  handleSaveNote: (tagId: string, note: string) => void;
  handleDeleteTag: (tagId: string) => void;

  // Tag & Season creation
  handleAddTag: (tagData: Omit<MezastarTag, 'id'>, initialQty: number) => void;
  handleAddSeason: (name: string, description: string) => string;

  // Backup & Restore
  handleExport: () => void;
  handleImport: (jsonData: string) => void;
  handleResetCollection: () => void;

  // Computed globals
  totalGlobalTags: number;
  collectedGlobalTags: number;
}

const CollectionContext = createContext<CollectionContextValue | null>(null);

export function CollectionProvider({ children }: { children: ReactNode }) {
  // --- Core State ---
  const [seasons] = useState<Season[]>(defaultSeasons);

  const [tags, setTags] = useState<MezastarTag[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mezastar_tags');
      if (saved) {
        const savedTags: MezastarTag[] = JSON.parse(saved);
        // Only keep custom tags from localStorage (isCustom is set by handleAddTag)
        const customTags = savedTags.filter((t) => t.isCustom);
        return [...defaultTags, ...customTags];
      }
      return defaultTags;
    }
    return defaultTags;
  });

  const [collection, setCollection] = useState<CollectionData>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mezastar_collection');
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  // --- Persist to localStorage ---
  useEffect(() => {
    localStorage.setItem('mezastar_collection', JSON.stringify(collection));
  }, [collection]);

  useEffect(() => {
    localStorage.setItem('mezastar_tags', JSON.stringify(tags));
  }, [tags]);

  // --- Computed ---
  const totalGlobalTags = tags.length;
  const collectedGlobalTags = tags.filter(
    (t) => (collection[t.id]?.quantity || 0) > 0
  ).length;

  // --- Handlers ---
  const handleQuantityChange = useCallback((tagId: string, delta: number) => {
    setCollection((prev) => {
      const currentQty = prev[tagId]?.quantity || 0;
      const newQty = Math.max(0, currentQty + delta);
      return {
        ...prev,
        [tagId]: {
          ...(prev[tagId] || {}),
          quantity: newQty,
        },
      };
    });
  }, []);

  const handleSaveNote = useCallback((tagId: string, note: string) => {
    setCollection((prev) => ({
      ...prev,
      [tagId]: {
        ...(prev[tagId] || { quantity: 0 }),
        notes: note,
      },
    }));
    alert('Đã lưu ghi chú thành công!');
  }, []);

  const handleDeleteTag = useCallback((tagId: string) => {
    setTags((prev) => prev.filter((t) => t.id !== tagId));
    setCollection((prev) => {
      const updated = { ...prev };
      delete updated[tagId];
      return updated;
    });
  }, []);

  const handleAddTag = useCallback(
    (tagData: Omit<MezastarTag, 'id'>, initialQty: number) => {
      const newId = `custom-tag-${Date.now()}`;
      const newTag: MezastarTag = { ...tagData, id: newId };
      setTags((prev) => [...prev, newTag]);
      if (initialQty > 0) {
        setCollection((prev) => ({
          ...prev,
          [newId]: { quantity: initialQty, notes: tagData.notes || '' },
        }));
      }
    },
    []
  );

  const [seasonList, setSeasonList] = useState<Season[]>(seasons);

  const handleAddSeason = useCallback((name: string, description: string) => {
    const newId = `custom-season-${Date.now()}`;
    setSeasonList((prev) => [
      ...prev,
      { id: newId, name, description, isCustom: true },
    ]);
    return newId;
  }, []);

  const handleExport = useCallback(() => {
    const exportData = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      seasons: activeSeasons,
      tags,
      collection,
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mezastar_dex_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [seasons, tags, collection]);

  const handleImport = useCallback((jsonData: string) => {
    try {
      const data = JSON.parse(jsonData);
      if (!data.seasons || !data.tags || !data.collection) {
        alert(
          'File sao lưu không hợp lệ. Vui lòng chọn đúng file JSON được xuất từ ứng dụng.'
        );
        return;
      }
      if (
        confirm(
          'Bạn có chắc chắn muốn nhập dữ liệu này? Toàn bộ bộ sưu tập hiện tại sẽ bị ghi đè.'
        )
      ) {
        setTags(data.tags);
        setCollection(data.collection);
        alert('Đã nhập dữ liệu thành công!');
      }
    } catch {
      alert(
        'Không thể đọc file. Vui lòng đảm bảo file JSON không bị lỗi định dạng.'
      );
    }
  }, []);

  const handleResetCollection = useCallback(() => {
    if (
      confirm(
        'CẢNH BÁO: Hành động này sẽ đặt toàn bộ số lượng thẻ đã thu thập của bạn về 0 (giữ nguyên danh sách thẻ custom). Bạn có muốn tiếp tục?'
      )
    ) {
      setCollection({});
    }
  }, []);

  const activeSeasons = seasonList.length > 0 ? seasonList : seasons;

  const value: CollectionContextValue = {
    seasons: activeSeasons,
    tags,
    collection,
    handleQuantityChange,
    handleSaveNote,
    handleDeleteTag,
    handleAddTag,
    handleAddSeason,
    handleExport,
    handleImport,
    handleResetCollection,
    totalGlobalTags,
    collectedGlobalTags,
  };

  return (
    <CollectionContext.Provider value={value}>
      {children}
    </CollectionContext.Provider>
  );
}

export function useCollection(): CollectionContextValue {
  const ctx = useContext(CollectionContext);
  if (!ctx) throw new Error('useCollection must be used within a CollectionProvider');
  return ctx;
}
