import { z } from 'zod';

const availableCount = z.number().int().min(0).max(10000);

export const bookSchema = z
  .object({
    title: z.string().min(5).max(40),
    isbn: z.number().int().min(1000000000000).max(9999999999999),
    authors: z.string().array().nonempty(),
    edition: z.number().int().min(1).max(30),
    length: z.number().int().min(5).max(2000),
    totalCount: z.number().int().min(1).max(10000),
    availableCount
  })
  .refine(({ totalCount, availableCount }) => availableCount <= totalCount);

export const updateBookSchema = z.object({ availableCount });
