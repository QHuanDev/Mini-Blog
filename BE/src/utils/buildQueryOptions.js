export const buildQueryOptions = (options) => {
  const queryOptions = {};

  const limit = Number(options.limit ?? 10);
  const page = Number(options.page ?? 1);

  queryOptions.limit = limit ;
  queryOptions.offset = (page - 1) * limit;

  console.log(options);
  if (options.order_by) {
    queryOptions.order = [[
      options.order_by,
      options.order_dir.toLowerCase() == "asc" ? "ASC" : "DESC"
    ]];
  }

  return queryOptions;
};
