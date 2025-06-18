import {
  createBlogPost,
  getAllBlogPosts,
  editBlogPost,
  removeBlogPost,
} from "../services/blogservice";

export const create = async (req, res) => {
  try {
    const result = await createBlogPost({ ...req.body, user: req.user });
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const blogs = await getAllBlogPosts();
    res.status(200).json(blogs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const blogId = parseInt(req.params.id);
    const { title, content } = req.body;
    const result = await editBlogPost({ blogId, title, content, user: req.user });
    res.status(200).json(result);
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

export const remove = async (req, res) => {
  try {
    const blogId = parseInt(req.params.id);
    const result = await removeBlogPost({ blogId, user: req.user });
    res.status(200).json(result);
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};
