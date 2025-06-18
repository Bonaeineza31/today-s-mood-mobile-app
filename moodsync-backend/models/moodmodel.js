import pool from "../config/db.js";

export const logMood = async ({ userId, label, value, emoji, note }) => {
  const [result] = await pool.query(
    "INSERT INTO moods (user_id, label, value, emoji, note, created_at) VALUES (?, ?, ?, ?, ?, NOW())",
    [userId, label, value, emoji, note]
  );
  return result.insertId;
};

export const getUserMoods = async (userId) => {
  const [rows] = await pool.query("SELECT * FROM moods WHERE user_id = ? ORDER BY created_at DESC", [userId]);
  return rows;
};

export const getMoodStats = async (userId) => {
  const [rows] = await pool.query("SELECT label, value, created_at FROM moods WHERE user_id = ?", [userId]);
  return rows;
};
