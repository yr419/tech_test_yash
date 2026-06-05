import { pool } from './db/pool';
import { Request, Response } from 'express';

/**
 * POST /games
 */
export async function saveGame(req: Request, res: Response) {
  const {
    playerX,
    playerO,
    winner,
    status,
    boardSize,
    winLength,
  } = req.body;

  if (!playerX || !playerO || !status || !boardSize || !winLength) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await pool.query(
      `
      INSERT INTO games (
        player_x,
        player_o,
        winner,
        status,
        board_size,
        win_length
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      `,
      [
        playerX,
        playerO,
        winner ?? null,
        status,
        boardSize,
        winLength,
      ]
    );

    res.json({ success: true });
  } catch (err) {
    console.error('saveGame error:', err);
    res.status(500).json({ error: 'Failed to save game' });
  }
}

/**
 * GET /stats
 */
export async function getStats(_req: Request, res: Response) {
  try {
    const result = await pool.query(`
      WITH players AS (
        SELECT player_x AS name FROM games
        UNION
        SELECT player_o AS name FROM games
      )

      SELECT
        p.name,
        COUNT(CASE WHEN g.winner = p.name THEN 1 END) AS wins,
        COUNT(CASE 
          WHEN g.winner IS NOT NULL 
           AND g.winner != p.name 
          THEN 1 
        END) AS losses
      FROM players p
      LEFT JOIN games g
        ON p.name IN (g.player_x, g.player_o)
      GROUP BY p.name
      ORDER BY wins DESC;
    `);

    res.json(result.rows);
  } catch (err) {
    console.error('getStats error:', err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
}