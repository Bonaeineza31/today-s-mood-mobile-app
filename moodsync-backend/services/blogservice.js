import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
} from "../models/blogmodel.js";

export const createBlogPost = async ({ title, content, user }) => {
  if (!title || !content) throw new Error("Title and content required");
  const id = await createBlog({ title, content, authorId: user.id });
  return { id, message: "Blog created" };
};

export const getAllBlogPosts = async () => {
  return await getAllBlogs();
};

export const editBlogPost = async ({ blogId, title, content, user }) => {
  const blog = await getBlogById(blogId);
  if (!blog) throw new Error("Blog not found");

  // Only author or superadmin
  if (blog.author_id !== user.id && user.role !== "superadmin") {
    throw new Error("Not authorized to edit this blog");
  }

  await updateBlog({ id: blogId, title, content });
  return { message: "Blog updated" };
};

export const removeBlogPost = async ({ blogId, user }) => {
  const blog = await getBlogById(blogId);
  if (!blog) throw new Error("Blog not found");

  if (blog.author_id !== user.id && user.role !== "superadmin") {
    throw new Error("Not authorized to delete this blog");
  }

  await deleteBlog(blogId);
  return { message: "Blog deleted" };
};
