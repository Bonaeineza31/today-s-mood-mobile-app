import pool from "../config/db.js";

export const logMood = async ({ userId, label, value, emoji, note }) => {
  const result = await pool.query(
    "INSERT INTO moods (user_id, label, value, emoji, note, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING id",
    [userId, label, value, emoji, note]
  );
  return result.rows[0].id;
};

export const getUserMoods = async (userId) => {
  const result = await pool.query(
    "SELECT * FROM moods WHERE user_id = $1 ORDER BY created_at DESC",
    [userId]
  );
  return result.rows;
};

export const getMoodStats = async (userId) => {
  const result = await pool.query(
    "SELECT label, value, created_at FROM moods WHERE user_id = $1",
    [userId]
  );
  return result.rows;
};