import { z } from 'zod';
import { bookSchema } from '../schemas';

export type Book = z.infer<typeof bookSchema>;
