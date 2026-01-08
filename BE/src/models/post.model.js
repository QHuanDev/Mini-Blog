import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Post = sequelize.define(
  "Post",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    slug: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    excerpt: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    cover_image: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },

    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "draft",
    },

    view_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    reading_time: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    is_featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    published_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "posts",
    timestamps: true,
    underscored: true, // created_at, updated_at
  }
);

Post.findAllPost = async () => {
  return await Post.findAll({
    order: [["created_at", "DESC"]],
    where: { status: "published" },
  });
};
Post.findOneBySlug = async (slug) => {
  return await Post.findOne({
    where: { slug },
  });
};
Post.createPost = async ({
  title,
  slug,
  content,
  excerpt,
  cover_image,
  author_id,
  category_id,
  status,
  is_featured,
}) => {
  return await Post.create({
    title,
    slug,
    content,
    excerpt,
    cover_image: cover_image || null,
    author_id,
    category_id: category_id || null,
    status: status || "draft",
    is_featured: is_featured || false,
    published_at: status === "published" ? new Date() : null,
  });
};

Post.updatePost = async (
  slug,
  { title, content, excerpt, cover_image, category_id, status, is_featured }
) => {
  const post = await Post.findOne({ where: { slug } });
  if (!post) {
    return null;
  }
  return await post.update({
    title,
    content,
    excerpt,
    cover_image,
    category_id,
    status,
    is_featured,
  });
};

Post.findByAuthor = async (authorId) => {
  return await Post.findAll({
    where: { author_id: authorId },
    order: [["created_at", "DESC"]],
  });
};

Post.deletePost = async (slug) => {
  const post = await Post.findOne({ where: { slug } });
  if (!post) {
    return null;
  }
  await post.destroy();
  return post;
};

Post.publishPost = async (slug) => {
  const post = await Post.findOne({ where: { slug } });
  if (!post) {
    return null;
  }
  return await post.update({
    status: "published",
    published_at: new Date(),
  });
};

Post.archivePost = async (slug) => {
  const post = await Post.findOne({ where: { slug } });
  if (!post) {
    return null;
  }
  return await post.update({
    status: "archived",
  });
};

export default Post;
