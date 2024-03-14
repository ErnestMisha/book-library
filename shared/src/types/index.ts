import { z } from 'zod';
import { bookBaseSchema, getBookSchema, updateBookSchema } from '../schemas';

export type BookListElement = z.infer<typeof bookBaseSchema>;
export type Book = z.infer<typeof getBookSchema>;
export type UpdateBook = z.infer<typeof updateBookSchema>;
