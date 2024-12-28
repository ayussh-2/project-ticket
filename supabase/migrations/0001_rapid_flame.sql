/*
  # Initial Schema Setup for Hackathon Dashboard

  1. New Tables
    - `profiles`
      - Stores Google OAuth user profile data
      - Links to auth.users
    - `hackers`
      - Main table for hacker registration data
      - Links to teams and creators
    - `teams`
      - Team management
      - Allows for team name consistency
    - `calendar_events`
      - Tracks hackathon dates and modifications
    
  2. Security
    - RLS policies for each table
    - Authenticated users can:
      - Read all hackers/teams
      - Create new hackers/teams
      - Update only their own entries
    - Audit trail via created_by and updated_by
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table for Google OAuth users
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text NOT NULL,
  full_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Teams table
CREATE TABLE teams (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL UNIQUE,
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE teams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read teams"
  ON teams FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create teams"
  ON teams FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Hackers table
CREATE TABLE hackers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  team_id uuid REFERENCES teams(id),
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  share_token text UNIQUE DEFAULT encode(gen_random_bytes(32), 'base64')
);

ALTER TABLE hackers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read hackers"
  ON hackers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create hackers"
  ON hackers FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update own entries"
  ON hackers FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by);

-- Calendar events table
CREATE TABLE calendar_events (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  description text,
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read calendar events"
  ON calendar_events FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create calendar events"
  ON calendar_events FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teams_updated_at
  BEFORE UPDATE ON teams
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hackers_updated_at
  BEFORE UPDATE ON hackers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_calendar_events_updated_at
  BEFORE UPDATE ON calendar_events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default calendar event
INSERT INTO calendar_events (
  title,
  start_date,
  end_date,
  description
) VALUES (
  'Hackathon 2025',
  '2025-03-08 00:00:00+00',
  '2025-03-10 23:59:59+00',
  'Annual Hackathon Event'
);