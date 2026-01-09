import * as yup from "yup";
export const paginationValidate = yup.object({
  page: yup
    .number()
    .optional()
    .nullable()
    .transform((_, originalValue) => {
      const num = Number(originalValue);
      if (
        originalValue === undefined ||
        originalValue === null ||
        originalValue === "" ||
        isNaN(num) ||
        num < 1
      ) {
        return 1;
      }
      return num;
    }),
  limit: yup
    .number()
    .optional()
    .nullable()
    .transform((_, originalValue) => {
      const num = Number(originalValue);
      if (
        originalValue === undefined ||
        originalValue === null ||
        originalValue === "" ||
        isNaN(num) ||
        num < 1
      ) {
        return 10;
      }

      if (num > 100) {
        return 100;
      }

      return num;
    }),
}).default({ page: 1, limit: 10 });
