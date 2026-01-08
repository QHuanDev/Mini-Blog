import { Router } from "express";
import {
  archivePost,
  createPost,
  deletePost,
  getAllPosts,
  getMyPosts,
  getPost,
  publishPost,
  updatePost,
} from "../controllers/post.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const PostRoute = Router();

PostRoute.get("/", getAllPosts);
PostRoute.get("/my-posts", authenticate, getMyPosts);
PostRoute.get("/:slug", getPost);
PostRoute.post("/", authenticate, createPost);
PostRoute.patch("/:slug", authenticate, updatePost);
PostRoute.delete("/:slug", authenticate, deletePost);
PostRoute.patch("/:slug/publish", authenticate, publishPost);
PostRoute.patch("/:slug/archive", authenticate, archivePost);

export default PostRoute;
