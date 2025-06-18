import pool from "../config/db.js";

export const createBlog = async ({ title, content, authorId }) => {
  const [result] = await pool.query(
    "INSERT INTO blogs (title, content, author_id, created_at) VALUES (?, ?, ?, NOW())",
    [title, content, authorId]
  );
  return result.insertId;
};

export const getAllBlogs = async () => {
  const [rows] = await pool.query(`
    SELECT b.id, b.title, b.content, b.author_id, u.name AS author_name, b.created_at
    FROM blogs b
    JOIN users u ON b.author_id = u.id
    ORDER BY b.created_at DESC
  `);
  return rows;
};

export const getBlogById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM blogs WHERE id = ?", [id]);
  return rows[0];
};

export const updateBlog = async ({ id, title, content }) => {
  const [result] = await pool.query(
    "UPDATE blogs SET title = ?, content = ? WHERE id = ?",
    [title, content, id]
  );
  return result.affectedRows;
};

export const deleteBlog = async (id) => {
  const [result] = await pool.query("DELETE FROM blogs WHERE id = ?", [id]);
  return result.affectedRows;
};

export const getBlogsByAuthor = async (authorId) => {
  const [rows] = await pool.query("SELECT * FROM blogs WHERE author_id = ?", [authorId]);
  return rows;
};
