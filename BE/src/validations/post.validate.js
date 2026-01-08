import * as yup from "yup";

export const createPostValidate = yup.object({
  title: yup.string().max(255).required("Tiêu đề bài viết bắt buộc"),
  content: yup.string().required("Nội dung bài viết bắt buộc"),
  excerpt: yup.string().optional(),
  cover_image: yup.string().url("URL ảnh bìa không hợp lệ").optional(),
  category_id: yup.number().integer().optional(),
  status: yup
    .string()
    .oneOf(["draft", "published", "archived"], "Trạng thái không hợp lệ"),
  is_featured: yup.boolean().optional(),
});

export const updatePostValidate = yup.object({
  title: yup.string().max(255).required("Tiêu đề bài viết bắt buộc"),
  content: yup.string().required("Nội dung bài viết bắt buộc"),
  excerpt: yup.string().optional(),
  cover_image: yup.string().url("URL ảnh bìa không hợp lệ").optional(),
  category_id: yup.number().integer().optional(),
  status: yup
    .string()
    .oneOf(["draft", "published", "archived"], "Trạng thái không hợp lệ"),
  is_featured: yup.boolean().optional(),
});
