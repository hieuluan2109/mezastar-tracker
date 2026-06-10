import { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { FilterBar } from './components/FilterBar';
import { StatsDashboard } from './components/StatsDashboard';
import { TagCard } from './components/TagCard';
import { TagDetailModal } from './components/TagDetailModal';
import { AddTagModal } from './components/AddTagModal';
import { AddSeasonModal } from './components/AddSeasonModal';
import { defaultSeasons, defaultTags } from './data/defaultTags';
import type { Season, MezastarTag, CollectionData, FilterState } from './types';
import { Sparkles, Trophy, RotateCcw } from 'lucide-react';

function App() {
  // --- 1. Core States ---
  const [seasons, setSeasons] = useState<Season[]>(() => {
    const saved = localStorage.getItem('mezastar_seasons');
    return saved ? JSON.parse(saved) : defaultSeasons;
  });

  const [tags, setTags] = useState<MezastarTag[]>(() => {
    const saved = localStorage.getItem('mezastar_tags');
    return saved ? JSON.parse(saved) : defaultTags;
  });

  const [collection, setCollection] = useState<CollectionData>(() => {
    const saved = localStorage.getItem('mezastar_collection');
    return saved ? JSON.parse(saved) : {};
  });

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    seasonId: 'season-1',
    rarity: [],
    type: '',
    ownership: 'all',
  });

  // Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('mezastar_theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  const handleToggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  // Sync theme to localStorage and data-theme attribute
  useEffect(() => {
    localStorage.setItem('mezastar_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Modal open states
  const [selectedTag, setSelectedTag] = useState<MezastarTag | null>(null);
  const [isAddTagOpen, setIsAddTagOpen] = useState(false);
  const [isAddSeasonOpen, setIsAddSeasonOpen] = useState(false);

  // --- 2. LocalStorage Syncing ---
  useEffect(() => {
    localStorage.setItem('mezastar_seasons', JSON.stringify(seasons));
  }, [seasons]);

  useEffect(() => {
    localStorage.setItem('mezastar_tags', JSON.stringify(tags));
  }, [tags]);

  useEffect(() => {
    localStorage.setItem('mezastar_collection', JSON.stringify(collection));
  }, [collection]);

  // --- 3. Collection Handlers ---
  const handleQuantityChange = (tagId: string, delta: number) => {
    setCollection((prev) => {
      const currentQty = prev[tagId]?.quantity || 0;
      const newQty = Math.max(0, currentQty + delta);
      
      const newCollection = { ...prev };
      if (newQty === 0) {
        // We can keep the note if it exists, or just set qty to 0
        newCollection[tagId] = {
          ...newCollection[tagId],
          quantity: 0
        };
      } else {
        newCollection[tagId] = {
          ...newCollection[tagId],
          quantity: newQty
        };
      }
      return newCollection;
    });
  };

  const handleSaveNote = (tagId: string, note: string) => {
    setCollection((prev) => {
      const current = prev[tagId] || { quantity: 0 };
      return {
        ...prev,
        [tagId]: {
          ...current,
          notes: note,
        },
      };
    });
    alert('Đã lưu ghi chú thành công!');
  };

  const handleDeleteTag = (tagId: string) => {
    setTags((prev) => prev.filter(t => t.id !== tagId));
    setCollection((prev) => {
      const updated = { ...prev };
      delete updated[tagId];
      return updated;
    });
    setSelectedTag(null);
  };

  // --- 4. Tag & Season Creation Handlers ---
  const handleAddTag = (tagData: Omit<MezastarTag, 'id'>, initialQty: number) => {
    const newId = `custom-tag-${Date.now()}`;
    const newTag: MezastarTag = {
      ...tagData,
      id: newId,
    };

    setTags((prev) => [...prev, newTag]);
    
    if (initialQty > 0) {
      setCollection((prev) => ({
        ...prev,
        [newId]: {
          quantity: initialQty,
          notes: tagData.notes || '',
        },
      }));
    }
  };

  const handleAddSeason = (name: string, description: string) => {
    const newId = `custom-season-${Date.now()}`;
    const newSeason: Season = {
      id: newId,
      name,
      description,
      isCustom: true,
    };

    setSeasons((prev) => [...prev, newSeason]);
    // Automatically switch to the newly created season
    setFilters((prev) => ({ ...prev, seasonId: newId }));
  };

  // --- 5. Backup & Restore (JSON Import/Export) ---
  const handleExport = () => {
    const exportData = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      seasons,
      tags,
      collection,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mezastar_dex_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = (jsonData: string) => {
    try {
      const data = JSON.parse(jsonData);
      if (!data.seasons || !data.tags || !data.collection) {
        alert('File sao lưu không hợp lệ. Vui lòng chọn đúng file JSON được xuất từ ứng dụng.');
        return;
      }

      if (confirm('Bạn có chắc chắn muốn nhập dữ liệu này? Toàn bộ bộ sưu tập hiện tại sẽ bị ghi đè.')) {
        setSeasons(data.seasons);
        setTags(data.tags);
        setCollection(data.collection);
        alert('Đã nhập dữ liệu thành công!');
      }
    } catch (err) {
      alert('Không thể đọc file. Vui lòng đảm bảo file JSON không bị lỗi định dạng.');
    }
  };

  const handleResetCollection = () => {
    if (confirm('CẢNH BÁO: Hành động này sẽ đặt toàn bộ số lượng thẻ đã thu thập của bạn về 0 (giữ nguyên danh sách thẻ custom). Bạn có muốn tiếp tục?')) {
      setCollection({});
      alert('Đã reset bộ sưu tập về trạng thái trống.');
    }
  };

  // --- 6. Stats calculation ---
  const currentSeason = seasons.find(s => s.id === filters.seasonId);
  const seasonName = currentSeason ? currentSeason.name : 'Mùa sưu tập';

  const totalTagsInSelectedSeason = tags.filter(t => t.seasonId === filters.seasonId).length;
  const collectedTagsInSelectedSeason = tags
    .filter(t => t.seasonId === filters.seasonId)
    .filter(t => (collection[t.id]?.quantity || 0) > 0).length;

  // Global counts for navbar
  const totalGlobalTags = tags.length;
  const collectedGlobalTags = tags.filter(t => (collection[t.id]?.quantity || 0) > 0).length;

  // --- 7. Filter Logic ---
  const filteredTags = tags.filter((tag) => {
    // 1. Season filter
    if (tag.seasonId !== filters.seasonId) return false;

    // 2. Search filter (by name or card catalog number)
    const searchQuery = filters.search.trim().toLowerCase();
    if (searchQuery) {
      const matchesName = tag.name.toLowerCase().includes(searchQuery);
      const matchesNo = tag.no.toLowerCase().includes(searchQuery);
      if (!matchesName && !matchesNo) return false;
    }

    // 3. Type filter
    if (filters.type && tag.type !== filters.type) return false;

    // 4. Rarity filter (if any rarity is checked)
    if (filters.rarity.length > 0 && !filters.rarity.includes(tag.rarity)) return false;

    // 5. Ownership status filter
    const qty = collection[tag.id]?.quantity || 0;
    if (filters.ownership === 'owned' && qty === 0) return false;
    if (filters.ownership === 'missing' && qty > 0) return false;

    return true;
  });

  return (
    <div className="min-h-screen bg-root text-primary flex flex-col pb-12 theme-transition">        {/* Navbar Header */}
      <Navbar
        onExport={handleExport}
        onImport={handleImport}
        onReset={handleResetCollection}
        collectedCount={collectedGlobalTags}
        totalCount={totalGlobalTags}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Body container */}
      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 flex-1">
        
        {/* Banner Welcome Message */}
        <div className="relative mb-8 rounded-2xl bg-gradient-to-r from-rose-900/40 via-panel/60 to-panel/40 p-6 border border-rose-900/30 overflow-hidden shadow-2xl entrance-fade">
          <div className="absolute right-0 top-0 h-40 w-40 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute left-1/3 bottom-0 h-28 w-28 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <h2 className="text-xl font-extrabold text-primary flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-400 fill-yellow-400/20" />
                <span>Chào mừng collector Pokémon Mezastar!</span>
              </h2>
              <p className="text-xs text-secondary max-w-2xl leading-relaxed">
                Theo dõi tiến trình thu thập thẻ Meza Tag của bạn trực quan và dễ dàng. 
                Bạn có thể click vào bất kỳ thẻ bài nào để ghi lại địa điểm chơi, ngày săn được hoặc thông tin chi tiết. 
                Sử dụng nút <b>"Thêm thẻ thủ công"</b> để theo dõi các thẻ custom đặc biệt không xuất hiện trên trang chủ.
              </p>
            </div>
            
            <div className="shrink-0 flex items-center space-x-2 bg-root/40 px-4 py-2.5 rounded-xl border border-primary">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <div>
                <span className="text-[10px] text-secondary font-bold block leading-none uppercase">Bộ Sưu Tập Mùa Này</span>
                <span className="text-sm font-black text-primary">{collectedTagsInSelectedSeason} / {totalTagsInSelectedSeason}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Dashboard */}
        <StatsDashboard
          tags={tags}
          collection={collection}
          activeSeasonId={filters.seasonId}
          seasonName={seasonName}
        />

        {/* Filters and Search toolbar */}
        <FilterBar
          seasons={seasons}
          filters={filters}
          onFilterChange={setFilters}
          onAddTag={() => setIsAddTagOpen(true)}
          onAddSeason={() => setIsAddSeasonOpen(true)}
        />

        {/* Tags Dex Grid with entrance animations */}
        {filteredTags.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {filteredTags.map((tag, index) => (
              <div key={tag.id} className="card-entrance" style={{ animationDelay: `${Math.min(index * 0.04, 1.5)}s` }}>
                <TagCard
                  tag={tag}
                  quantity={collection[tag.id]?.quantity || 0}
                  hasNotes={!!collection[tag.id]?.notes}
                  onQuantityChange={handleQuantityChange}
                  onCardClick={() => setSelectedTag(tag)}
                />
              </div>
            ))}
          </div>
        ) : (
          /* Empty Search/Filter State */
          <div className="text-center py-16 border border-dashed border-primary rounded-2xl bg-panel/10 backdrop-blur-sm max-w-md mx-auto">
            <div className="h-12 w-12 rounded-full bg-panel border border-primary flex items-center justify-center mx-auto mb-4 text-secondary">
              <RotateCcw className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-primary mb-1">Không tìm thấy thẻ nào</h3>
            <p className="text-xs text-secondary px-6 leading-relaxed">
              Không có thẻ bài Mezastar nào khớp với bộ lọc hoặc tìm kiếm hiện tại của bạn. Thử thay đổi từ khóa hoặc bộ lọc độ hiếm xem sao!
            </p>
            {filters.seasonId === 'special' && (
              <button
                onClick={() => setIsAddTagOpen(true)}
                className="mt-4 inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-extrabold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
              >
                <span>Thêm thẻ custom đầu tiên</span>
              </button>
            )}
          </div>
        )}

      </main>

      {/* --- Modals Overlay Render --- */}

      {/* 1. Tag Details Modal */}
      {selectedTag && (
        <TagDetailModal
          tag={selectedTag}
          quantity={collection[selectedTag.id]?.quantity || 0}
          noteText={collection[selectedTag.id]?.notes || ''}
          onClose={() => setSelectedTag(null)}
          onSaveNote={handleSaveNote}
          onQuantityChange={handleQuantityChange}
          onDeleteTag={handleDeleteTag}
        />
      )}

      {/* 2. Add Tag Form Modal */}
      {isAddTagOpen && (
        <AddTagModal
          seasons={seasons}
          defaultSeasonId={filters.seasonId}
          onClose={() => setIsAddTagOpen(false)}
          onAddTag={handleAddTag}
        />
      )}

      {/* 3. Add Season Form Modal */}
      {isAddSeasonOpen && (
        <AddSeasonModal
          onClose={() => setIsAddSeasonOpen(false)}
          onAddSeason={handleAddSeason}
          existingSeasons={seasons}
        />
      )}

    </div>
  );
}

export default App;
