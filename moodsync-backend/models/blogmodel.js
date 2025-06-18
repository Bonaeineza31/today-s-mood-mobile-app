import pool from "../config/db.js";

export const createBlog = async ({ title, content, authorId }) => {
  const result = await pool.query(
    "INSERT INTO blogs (title, content, author_id, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id",
    [title, content, authorId]
  );
  return result.rows[0].id;
};

export const getAllBlogs = async () => {
  const result = await pool.query(`
    SELECT b.id, b.title, b.content, b.author_id, u.name AS author_name, b.created_at
    FROM blogs b
    JOIN users u ON b.author_id = u.id
    ORDER BY b.created_at DESC
  `);
  return result.rows;
};

export const getBlogById = async (id) => {
  const result = await pool.query("SELECT * FROM blogs WHERE id = $1", [id]);
  return result.rows[0];
};

export const updateBlog = async ({ id, title, content }) => {
  const result = await pool.query(
    "UPDATE blogs SET title = $1, content = $2 WHERE id = $3",
    [title, content, id]
  );
  return result.rowCount;
};

export const deleteBlog = async (id) => {
  const result = await pool.query("DELETE FROM blogs WHERE id = $1", [id]);
  return result.rowCount;
};

export const getBlogsByAuthor = async (authorId) => {
  const result = await pool.query("SELECT * FROM blogs WHERE author_id = $1", [authorId]);
  return result.rows;
};
