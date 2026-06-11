-- ========================================
-- Mezastar Tracker - Supabase Schema
-- ========================================
-- Run this SQL in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql/new

-- 1. User Collections Table
CREATE TABLE IF NOT EXISTS public.user_collections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  tag_id TEXT NOT NULL,
  quantity INTEGER DEFAULT 0,
  notes TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, tag_id)
);

-- 2. Enable Row Level Security
ALTER TABLE public.user_collections ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies: users can only see/edit their own data
CREATE POLICY "Users can view their own collections"
  ON public.user_collections
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own collections"
  ON public.user_collections
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own collections"
  ON public.user_collections
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own collections"
  ON public.user_collections
  FOR DELETE
  USING (auth.uid() = user_id);

-- 4. Index for faster queries
CREATE INDEX IF NOT EXISTS idx_user_collections_user_id
  ON public.user_collections(user_id);
