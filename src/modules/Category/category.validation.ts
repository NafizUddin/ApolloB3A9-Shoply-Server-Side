import { z } from 'zod';

const createCategoryValidation = z.object({
  body: z.object({
    category: z.string({
      required_error: 'Category Name is required',
    }),
    image: z.string({
      required_error: 'Category image is required',
    }),
  }),
});

export const categoryValidation = {
  createCategoryValidation,
};
