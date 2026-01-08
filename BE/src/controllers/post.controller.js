import MESSAGE from "../constants/message.js";
import handleAsync from "../middleware/handleAsync.js";
import { PostService } from "../services/post.service.js";
import { Response } from "../utils/createResponse.js";
import {
  createPostValidate,
  updatePostValidate,
} from "../validations/post.validate.js";

export const getAllPosts = handleAsync(async (req, res) => {
  const posts = await PostService.getAll();
  return Response(res, MESSAGE.POST.GET_ALL_SUCCESS, posts);
});

export const getMyPosts = handleAsync(async (req, res) => {
  const userId = req.user.id;
  const posts = await PostService.getPostsByAuthor(userId);
  return Response(res, MESSAGE.POST.GET_ALL_SUCCESS, posts);
});

export const getPost = handleAsync(async (req, res) => {
  const { slug } = req.params;
  const post = await PostService.getOne(slug);
  return Response(res, MESSAGE.POST.GET_SUCCESS, post);
});

export const createPost = handleAsync(async (req, res) => {
  await createPostValidate.validate(req.body, { abortEarly: false });
  const postData = req.body;
  postData.author_id = req.user.id;
  const newPost = await PostService.create(postData);
  return Response(res, MESSAGE.POST.CREATE_SUCCESS, newPost);
});

export const updatePost = handleAsync(async (req, res) => {
  await updatePostValidate.validate(req.body, { abortEarly: false });
  const { slug } = req.params;
  const postData = req.body;
  const user_id = req.user.id;
  const updatedPost = await PostService.update(user_id, slug, postData);
  return Response(res, MESSAGE.POST.UPDATE_SUCCESS, updatedPost);
});

export const deletePost = handleAsync(async (req, res) => {
  const { slug } = req.params;
  const user_id = req.user.id;
  await PostService.delete(user_id, slug);
  return Response(res, MESSAGE.POST.DELETE_SUCCESS, null);
});

export const publishPost = handleAsync(async (req, res) => {
  const { slug } = req.params;
  const user_id = req.user.id;
  const publishedPost = await PostService.publish(user_id, slug);
  return Response(res, MESSAGE.POST.PUBLISH_SUCCESS, publishedPost);
});

export const archivePost = handleAsync(async (req, res) => {
  const { slug } = req.params;
  const user_id = req.user.id;
  const archivedPost = await PostService.archive(user_id, slug);
  return Response(res, MESSAGE.POST.ARCHIVE_SUCCESS, archivedPost);
});
