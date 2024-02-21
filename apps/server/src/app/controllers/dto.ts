import { booksSchema } from '../schemas';
import { z } from 'zod';

export type Dto = {
  List: {
    Reply: z.infer<(typeof booksSchema.list.schema.response)['200']>;
  };
  Get: {
    Params: z.infer<typeof booksSchema.get.schema.params>;
    Reply: z.infer<(typeof booksSchema.get.schema.response)['200']>;
  };
  Create: {
    Body: z.infer<typeof booksSchema.create.schema.body>;
    Reply: z.infer<(typeof booksSchema.create.schema.response)['201']>;
  };
  Update: {
    Params: z.infer<typeof booksSchema.update.schema.params>;
    Body: z.infer<typeof booksSchema.update.schema.body>;
    Reply: z.infer<(typeof booksSchema.update.schema.response)['204']>;
  };
  Delete: {
    Params: z.infer<typeof booksSchema.delete.schema.params>;
    Reply: z.infer<(typeof booksSchema.delete.schema.response)['204']>;
  };
};
