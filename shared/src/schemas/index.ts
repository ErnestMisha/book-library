import { z } from 'zod';

const availableCount = z.number().int().min(0).max(10000);
const totalCount = z.number().int().min(1).max(10000);
export const bookBaseSchema = z.object({
  isbn: z.number().int().min(1000000000000).max(9999999999999),
  title: z.string().min(5).max(200),
  authors: z.string().min(5).max(80).array().nonempty(),
  edition: z.number().int().min(1).max(30),
});

export const listBooksSchema = z.array(bookBaseSchema);

export const getBookSchema = z
  .object({
    length: z.number().int().min(5).max(2000),
    totalCount,
    availableCount,
  })
  .merge(bookBaseSchema);

export const updateBookSchema = z.object({
  availableCount: availableCount.optional(),
  totalCount: totalCount.optional(),
});
