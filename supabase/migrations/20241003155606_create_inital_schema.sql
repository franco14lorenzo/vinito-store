-- Create enums
CREATE TYPE wine_status AS ENUM ('draft', 'active', 'inactive', 'deleted');
CREATE TYPE tasting_status AS ENUM ('draft', 'active', 'inactive', 'deleted');

-- Create tables with enums
CREATE TABLE admin (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  surname TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  created_by BIGINT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_by BIGINT
);

CREATE TABLE wines (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  description TEXT,
  winery TEXT NOT NULL,
  year INT NOT NULL,
  variety TEXT NOT NULL,
  volume_ml INT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  cost_usd_blue NUMERIC(10, 2) NOT NULL,
  status wine_status NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  created_by BIGINT REFERENCES admin(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_by BIGINT
);

CREATE TABLE tastings (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  pairings TEXT,
  price NUMERIC(10, 2) NOT NULL,
  status tasting_status NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  created_by BIGINT REFERENCES admin(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_by BIGINT
);

CREATE TABLE tasting_wines (
  tasting_id BIGINT REFERENCES tastings(id),
  wine_id BIGINT REFERENCES wines(id),
  PRIMARY KEY (tasting_id, wine_id)
);

CREATE INDEX idx_wines_status ON wines(status);
CREATE INDEX idx_tastings_status ON tastings(status);