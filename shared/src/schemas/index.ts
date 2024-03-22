import { z } from 'zod';

export const listBooksSchema = z.array(
  z.object({
    isbn: z.number().int().min(1000000000000).max(9999999999999),
    title: z.string().min(5).max(200),
    authors: z.string().min(5).max(80).array().nonempty(),
    edition: z.number().int().min(1).max(30),
    coverExtension: z.string().min(2).max(10).nullable(),
  }),
);

export const getBookSchema = listBooksSchema.element.extend({
  availableCount: z.number().int().min(0).max(10000),
  totalCount: z.number().int().min(1).max(10000),
  length: z.number().int().min(5).max(2000),
});

export const createBookSchema = getBookSchema.omit({ coverExtension: true });

export const updateBookSchema = getBookSchema
  .pick({
    availableCount: true,
    totalCount: true,
  })
  .partial();
