'use client'

import React, { useRef } from 'react';
import { Download, Upload, RefreshCw, Trophy, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCollection } from '../context/CollectionContext';

export const Navbar: React.FC = React.memo(() => {
  const { theme, toggleTheme } = useTheme();
  const {
    totalGlobalTags,
    collectedGlobalTags,
    handleExport,
    handleImport,
    handleResetCollection,
  } = useCollection();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        handleImport(result);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerImport = () => {
    fileInputRef.current?.click();
  };

  const percentage =
    totalGlobalTags > 0
      ? Math.round((collectedGlobalTags / totalGlobalTags) * 100)
      : 0;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-primary bg-root/80 backdrop-blur-md theme-transition">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 shadow-lg shadow-rose-950/30 animate-pulse-glow">
            <span className="font-extrabold text-white text-xl">M</span>
            <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-yellow-400 border-2 border-root"></div>
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight text-primary sm:text-xl flex items-center">
              MEZASTAR{' '}
              <span className="ml-1.5 text-xs font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                DEX
              </span>
            </h1>
            <p className="text-[10px] text-secondary -mt-1 hidden sm:block">
              Personal Collection Tracker
            </p>
          </div>
        </div>

        {/* Collection Quick Info */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-badge px-3.5 py-1.5 rounded-xl border border-primary">
            <Trophy className="h-4 w-4 text-yellow-400" aria-hidden="true" />
            <span className="text-xs font-semibold text-secondary">
              Bộ sưu tập:
            </span>
            <span className="text-sm font-bold text-primary">
              {collectedGlobalTags} / {totalGlobalTags}
            </span>
            <span className="text-xs font-black text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded ml-1">
              {percentage}%
            </span>
          </div>
        </div>

        {/* Actions Button */}
        <div className="flex items-center space-x-2">
          {/* Hidden File Input for Import */}
          <input
            id="import-file-input"
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            className="hidden"
          />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={
              theme === 'dark'
                ? 'Chuyển sang giao diện sáng'
                : 'Chuyển sang giao diện tối'
            }
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-primary bg-panel text-secondary transition-colors hover:bg-badge hover:text-primary focus-ring"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4" aria-hidden="true" />
            )}
          </button>

          <button
            onClick={handleExport}
            aria-label="Xuất file sao lưu (JSON)"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-primary bg-panel text-secondary transition-colors hover:bg-badge hover:text-primary focus-ring"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
          </button>

          <button
            onClick={triggerImport}
            aria-label="Nhập file sao lưu (JSON)"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-primary bg-panel text-secondary transition-colors hover:bg-badge hover:text-primary focus-ring"
          >
            <Upload className="h-4 w-4" aria-hidden="true" />
          </button>

          <button
            onClick={handleResetCollection}
            aria-label="Xóa hết dữ liệu sưu tập"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-900/30 bg-red-950/20 text-red-400 transition-colors hover:bg-red-900/30 hover:text-red-300 focus-ring"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
});
