CREATE TABLE IF NOT EXISTS games (
  id          SERIAL PRIMARY KEY,
  board_size  INTEGER NOT NULL,
  win_length  INTEGER NOT NULL,
  status      TEXT NOT NULL CHECK (status IN ('won', 'draw')),
  player_x TEXT NOT NULL,
  player_o  TEXT NOT NULL,
  winner   TEXT,
  played_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
