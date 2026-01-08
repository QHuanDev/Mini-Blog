import slugify from "slugify";

export const gennerateSlug = title =>{
  const slug = slugify(title, { 
    lower: true,        // chữ thường
    strict: true,       // bỏ ký tự đặc biệt
    locale: "vi",       // hỗ trợ tiếng Việt
    trim: true,})

return slug;
}
