/*
  # Create scores table for Snake Game

  1. New Tables
    - `scores`
      - `id` (uuid, primary key)
      - `player_name` (text)
      - `score` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `scores` table
    - Add policies for public read and insert access
*/

-- Create scores table if it doesn't exist
CREATE TABLE IF NOT EXISTS scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name text NOT NULL,
  score integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can read scores" ON scores;
DROP POLICY IF EXISTS "Anyone can insert scores" ON scores;

-- Create policies
CREATE POLICY "Anyone can read scores"
  ON scores
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert scores"
  ON scores
  FOR INSERT
  TO public
  WITH CHECK (true);
