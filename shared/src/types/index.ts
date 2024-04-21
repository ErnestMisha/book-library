import { z } from 'zod';
import {
  listBooksSchema,
  createBookSchema,
  getBookSchema,
  updateBookSchema,
} from '../schemas';

export type BookList = z.infer<typeof listBooksSchema>;
export type BookListElement = z.infer<
  typeof listBooksSchema.shape.books.element
>;
export type Book = z.infer<typeof getBookSchema>;
export type UpdateBook = z.infer<typeof updateBookSchema>;
export type CreateBook = z.infer<typeof createBookSchema>;
