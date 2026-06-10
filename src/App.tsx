import { useState, useMemo, lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { FilterBar } from './components/FilterBar';
import { StatsDashboard } from './components/StatsDashboard';
import { TagCard } from './components/TagCard';
import { useCollection } from './context/CollectionContext';
import { useFilters } from './context/FilterContext';
import type { MezastarTag } from './types';
import { Sparkles, Trophy, RotateCcw } from 'lucide-react';

const TagDetailModal = lazy(() => import('./components/TagDetailModal').then(m => ({ default: m.TagDetailModal })));
const AddTagModal = lazy(() => import('./components/AddTagModal').then(m => ({ default: m.AddTagModal })));

function ModalFallback() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay p-4 backdrop-blur-md">
      <div className="w-full max-w-lg rounded-2xl bg-panel border border-primary/80 shadow-2xl p-8 animate-pulse">
        <div className="h-6 w-48 skeleton-shimmer rounded-lg mb-6"></div>
        <div className="space-y-4">
          <div className="h-10 skeleton-shimmer rounded-xl"></div>
          <div className="h-10 skeleton-shimmer rounded-xl"></div>
          <div className="h-20 skeleton-shimmer rounded-xl"></div>
          <div className="h-10 w-32 skeleton-shimmer rounded-xl ml-auto"></div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const { tags, collection } = useCollection();
  const { filters, currentSeasonName } = useFilters();

  // Modal open states (local — not drilled deeply)
  const [selectedTag, setSelectedTag] = useState<MezastarTag | null>(null);
  const [isAddTagOpen, setIsAddTagOpen] = useState(false);
  // isAddSeasonOpen removed — seasons are added via defaultTags.ts data file

  // --- Stats ---
  const totalTagsInSelectedSeason = useMemo(
    () => tags.filter((t) => t.seasonId === filters.seasonId).length,
    [tags, filters.seasonId]
  );

  const collectedTagsInSelectedSeason = useMemo(
    () =>
      tags.filter(
        (t) =>
          t.seasonId === filters.seasonId &&
          (collection[t.id]?.quantity || 0) > 0
      ).length,
    [tags, collection, filters.seasonId]
  );

  // --- Filter Logic ---
  const filteredTags = useMemo(
    () =>
      tags.filter((tag) => {
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

        // 4. Rarity filter
        if (filters.rarity.length > 0 && !filters.rarity.includes(tag.rarity))
          return false;

        // 5. Ownership status filter
        const qty = collection[tag.id]?.quantity || 0;
        if (filters.ownership === 'owned' && qty === 0) return false;
        if (filters.ownership === 'missing' && qty > 0) return false;

        return true;
      }),
    [tags, collection, filters]
  );

  return (
    <div className="min-h-screen bg-root text-primary flex flex-col pb-12 theme-transition">
      <Navbar />

      {/* Main Body container */}
      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 flex-1">
        {/* Banner Welcome Message */}
        <div className="relative mb-8 rounded-2xl bg-gradient-to-r from-rose-900/40 via-panel/60 to-panel/40 p-6 border border-rose-900/30 overflow-hidden shadow-2xl entrance-fade">
          <div className="absolute right-0 top-0 h-40 w-40 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute left-1/3 bottom-0 h-28 w-28 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <h2 className="text-xl font-extrabold text-primary flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-400 fill-yellow-400/20" aria-hidden="true" />
                <span>Chào mừng collector Pokémon Mezastar!</span>
              </h2>
              <p className="text-xs text-secondary max-w-2xl leading-relaxed">
                Theo dõi tiến trình thu thập thẻ Meza Tag của bạn trực quan và
                dễ dàng. Bạn có thể click vào bất kỳ thẻ bài nào để ghi lại địa
                điểm chơi, ngày săn được hoặc thông tin chi tiết. Sử dụng nút{' '}
                <b>&quot;Thêm thẻ thủ công&quot;</b> để theo dõi các thẻ custom
                đặc biệt không xuất hiện trên trang chủ.
              </p>
            </div>

            <div className="shrink-0 flex items-center space-x-2 bg-root/40 px-4 py-2.5 rounded-xl border border-primary">
              <Trophy className="h-5 w-5 text-yellow-500" aria-hidden="true" />
              <div>
                <span className="text-[10px] text-secondary font-bold block leading-none uppercase">
                  Bộ Sưu Tập Mùa Này
                </span>
                <span className="text-sm font-black text-primary">
                  {collectedTagsInSelectedSeason} / {totalTagsInSelectedSeason}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Dashboard */}
        <StatsDashboard
          tags={tags}
          collection={collection}
          activeSeasonId={filters.seasonId}
          seasonName={currentSeasonName}
        />

        {/* Filters and Search toolbar */}
        <FilterBar
          onAddTag={() => setIsAddTagOpen(true)}
        />

        {/* Tags Dex Grid with entrance animations */}
        {filteredTags.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {filteredTags.map((tag, index) => (
              <div
                key={tag.id}
                className="card-entrance"
                style={{
                  animationDelay: `${Math.min(index * 0.04, 1.5)}s`,
                }}
              >
                <TagCard
                  tag={tag}
                  quantity={collection[tag.id]?.quantity || 0}
                  hasNotes={!!collection[tag.id]?.notes}
                  onCardClick={() => setSelectedTag(tag)}
                />
              </div>
            ))}
          </div>
        ) : (
          /* Empty Search/Filter State */
          <div className="text-center py-16 border border-dashed border-primary rounded-2xl bg-panel/10 backdrop-blur-sm max-w-md mx-auto">
            <div className="h-12 w-12 rounded-full bg-panel border border-primary flex items-center justify-center mx-auto mb-4 text-secondary">
              <RotateCcw className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="text-base font-bold text-primary mb-1">
              Không tìm thấy thẻ nào
            </h3>
            <p className="text-xs text-secondary px-6 leading-relaxed">
              Không có thẻ bài Mezastar nào khớp với bộ lọc hoặc tìm kiếm hiện
              tại của bạn. Thử thay đổi từ khóa hoặc bộ lọc độ hiếm xem sao!
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

      {/* --- Modals --- */}

      {selectedTag && (
        <Suspense fallback={<ModalFallback />}>
          <TagDetailModal
            tag={selectedTag}
            quantity={collection[selectedTag.id]?.quantity || 0}
            noteText={collection[selectedTag.id]?.notes || ''}
            onClose={() => setSelectedTag(null)}
          />
        </Suspense>
      )}

      {isAddTagOpen && (
        <Suspense fallback={<ModalFallback />}>
          <AddTagModal
            defaultSeasonId={filters.seasonId}
            onClose={() => setIsAddTagOpen(false)}
          />
        </Suspense>
      )}

    </div>
  );
}

export default App;
