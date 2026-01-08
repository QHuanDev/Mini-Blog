import ErrorCodes from "../constants/error-code.js";
import MESSAGE from "../constants/message.js";
import Post from "../models/post.model.js";
import ServiceError from "../utils/createErrors.js";
import { gennerateSlug } from "../utils/slug.js";

export const PostService = {
  getAll: async () => {
    const posts = await Post.findAllPost();
    return posts;
  },

  getOne: async (slug) => {
    const post = await Post.findOneBySlug(slug);
    if (!post) {
      throw new ServiceError(
        "POST_NOT_FOUND",
        MESSAGE.POST.NOT_FOUND,
        404,
        "Bài viết không tồn tại"
      );
    }
    return post;
  },

  create: async (post) => {
    const slug = gennerateSlug(post.title);
    post.slug = slug;
    const result = await Post.createPost(post);
    return {
      slug: result.slug,
      title: result.title,
      content: result.content,
      excerpt: result.excerpt,
      cover_image: result.cover_image,
      author_id: result.author_id,
      category_id: result.category_id,
    };
  },

  update: async (user_id, slug, post) => {
    const existingPost = await Post.findOneBySlug(slug);
    if (user_id !== existingPost.author_id) {
      throw new ServiceError(
        MESSAGE.POST.FORBIDDEN,
        ErrorCodes.POST_FORBIDDEN,
        403,
        "Bạn không có quyền chỉnh sửa bài viết này"
      );
    }
    const updatedPost = await Post.updatePost(slug, post);
    return updatedPost;
  },

  getPostsByAuthor: async (authorId) => {
    const posts = await Post.findByAuthor(authorId);
    return posts;
  },

  delete: async (user_id, slug) => {
    const existingPost = await Post.findOneBySlug(slug);
    if (!existingPost) {
      throw new ServiceError(
        "POST_NOT_FOUND",
        MESSAGE.POST.NOT_FOUND,
        404,
        "Bài viết không tồn tại"
      );
    }
    if (user_id !== existingPost.author_id) {
      throw new ServiceError(
        MESSAGE.POST.FORBIDDEN,
        ErrorCodes.POST_FORBIDDEN,
        403,
        "Bạn không có quyền xóa bài viết này"
      );
    }
    const deletedPost = await Post.deletePost(slug);
    return deletedPost;
  },

  publish: async (user_id, slug) => {
    const existingPost = await Post.findOneBySlug(slug);
    if (!existingPost) {
      throw new ServiceError(
        "POST_NOT_FOUND",
        MESSAGE.POST.NOT_FOUND,
        404,
        "Bài viết không tồn tại"
      );
    }
    if (user_id !== existingPost.author_id) {
      throw new ServiceError(
        MESSAGE.POST.FORBIDDEN,
        ErrorCodes.POST_FORBIDDEN,
        403,
        "Bạn không có quyền xuất bản bài viết này"
      );
    }
    const publishedPost = await Post.publishPost(slug);
    return publishedPost;
  },

  archive: async (user_id, slug) => {
    const existingPost = await Post.findOneBySlug(slug);
    if (!existingPost) {
      throw new ServiceError(
        "POST_NOT_FOUND",
        MESSAGE.POST.NOT_FOUND,
        404,
        "Bài viết không tồn tại"
      );
    }
    if (user_id !== existingPost.author_id) {
      throw new ServiceError(
        MESSAGE.POST.FORBIDDEN,
        ErrorCodes.POST_FORBIDDEN,
        403,
        "Bạn không có quyền lưu trữ bài viết này"
      );
    }
    const archivedPost = await Post.archivePost(slug);
    return archivedPost;
  },
};
