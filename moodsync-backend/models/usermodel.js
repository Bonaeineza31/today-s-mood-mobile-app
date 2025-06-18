import pool from "../config/db.js";

export const createUser = async ({ name, email, password, role = "user", isVerified = false }) => {
  const result = await pool.query(
    "INSERT INTO users (name, email, password, role, is_verified) VALUES ($1, $2, $3, $4, $5) RETURNING id",
    [name, email, password, role, isVerified]
  );
  return result.rows[0].id;
};

export const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
};

export const findUserById = async (id) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
};

export const verifyUserEmail = async (email) => {
  await pool.query("UPDATE users SET is_verified = true WHERE email = $1", [email]);
};

export const getAllUsers = async () => {
  const result = await pool.query("SELECT id, name, email, role, is_verified, is_active FROM users");
  return result.rows;
};

export const setUserActiveStatus = async (id, isActive) => {
  const result = await pool.query("UPDATE users SET is_active = $1 WHERE id = $2", [isActive, id]);
  return result.rowCount;
};

export const updateUserRole = async (id, role) => {
  const result = await pool.query("UPDATE users SET role = $1 WHERE id = $2", [role, id]);
  return result.rowCount;
};

export const deleteUserById = async (id) => {
  const result = await pool.query("DELETE FROM users WHERE id = $1", [id]);
  return result.rowCount;
};