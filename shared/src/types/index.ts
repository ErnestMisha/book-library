import { z } from 'zod';
import { getBookSchema, updateBookSchema } from '../schemas';

export type Book = z.infer<typeof getBookSchema>;
export type UpdateBook = z.infer<typeof updateBookSchema>;
