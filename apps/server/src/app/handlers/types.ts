import { booksSchema } from '../schemas';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export type Handlers = {
  list(
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<z.infer<(typeof booksSchema.list.schema.response)['200']>>;
  get(
    req: FastifyRequest<{
      Params: z.infer<typeof booksSchema.get.schema.params>;
    }>,
    rep: FastifyReply,
  ): Promise<z.infer<(typeof booksSchema.get.schema.response)['200']> | void>;
  create(
    req: FastifyRequest<{
      Body: z.infer<typeof booksSchema.create.schema.body>;
    }>,
    rep: FastifyReply,
  ): Promise<z.infer<
    (typeof booksSchema.create.schema.response)['201']
  > | void>;
  update(
    req: FastifyRequest<{
      Params: z.infer<typeof booksSchema.update.schema.params>;
      Body: z.infer<typeof booksSchema.update.schema.body>;
    }>,
    rep: FastifyReply,
  ): Promise<void>;
  delete(
    req: FastifyRequest<{
      Params: z.infer<typeof booksSchema.delete.schema.params>;
    }>,
    rep: FastifyReply,
  ): Promise<void>;
  uploadBookCover(
    req: FastifyRequest<{
      Params: z.infer<typeof booksSchema.uploadBookCover.schema.params>;
    }>,
    rep: FastifyReply,
  ): Promise<void>;
};
