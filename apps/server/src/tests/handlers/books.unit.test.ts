import { getHandlers } from '../../app/handlers';
import { Books, books } from '../../app/database';
import { FastifyRequest, FastifyReply } from 'fastify';
import { HttpErrorReplys } from '@fastify/sensible';
import { booksSchema } from '../../app/schemas';
import { z } from 'zod';
import { PassThrough } from 'stream';

suite('Books handlers', () => {
  const modelMock = {
    list: vi.fn(() => books),
    get: vi.fn((isbn: number) => books.find((book) => book.isbn === isbn)),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn((isbn: number) =>
      Boolean(books.find((book) => book.isbn === isbn)),
    ),
    selectCoverExtension: vi.fn(() => null),
    saveCoverExtension: vi.fn(),
  } as unknown as Books;
  const reqMock = {
    params: books[0],
    body: books[0],
    query: { limit: 20, offset: 0 },
    file() {
      return { mimetype: 'image/webp', file: new PassThrough() };
    },
  } as unknown as ReqMock;
  let repMock;

  const {
    list,
    get,
    create,
    update,
    delete: remove,
    uploadBookCover,
  } = getHandlers(modelMock);

  vi.mock('stream/promises', () => ({ pipeline: vi.fn() }));
  vi.mock('fs', () => ({
    createWriteStream: vi.fn(),
  }));
  vi.mock('path', () => ({ join: vi.fn() }));
  vi.mock('fs/promises', () => ({ rm: vi.fn(), readdir: vi.fn(() => []) }));

  beforeEach(() => {
    repMock = {
      code: vi.fn(() => repMock),
      header: vi.fn(),
      notFound: vi.fn(),
      conflict: vi.fn(),
      badRequest: vi.fn(),
      unsupportedMediaType: vi.fn(),
      payloadTooLarge: vi.fn(),
    } as unknown as FastifyReply & HttpErrorReplys;
  });

  describe('list', () => {
    it('should return list of books', async () => {
      const res = await list(reqMock, repMock);

      expect(res.limit).toBe(reqMock.query.limit);
      expect(res.offset).toBe(reqMock.query.offset);
      expect(res.books).toMatchObject(books);
    });
  });

  describe('get', () => {
    it('should return book with given isbn', async () => {
      const res = await get(reqMock, repMock);

      expect(res).toMatchObject(books[0]);
    });

    it('should call notFound method', async () => {
      await get({ ...reqMock, params: { isbn: 123456789123 } }, repMock);

      expect(repMock.notFound).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create new book', async () => {
      const res = await create(
        {
          ...reqMock,
          body: {
            ...reqMock.body,
            isbn: 1234567891234,
          },
        },
        repMock,
      );

      expect(repMock.code).toHaveBeenCalledWith(201);
      expect(repMock.header).toHaveBeenCalledWith(
        'Location',
        `/books/1234567891234`,
      );
      expect((res as { isbn: number }).isbn).toBe(1234567891234);
    });

    it('should call conflict method', async () => {
      await create(reqMock, repMock);

      expect(repMock.conflict).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update book with given isbn', async () => {
      await update(
        {
          ...reqMock,
          body: { ...reqMock.body, totalCount: 100, availableCount: 0 },
        },
        repMock,
      );

      expect(repMock.code).toHaveBeenCalledWith(204);
    });

    it('should call badRequest method', async () => {
      await update(
        {
          ...reqMock,
          body: {
            ...reqMock,
            totalCount: undefined,
            availableCount: undefined,
          },
        },
        repMock,
      );

      expect(repMock.badRequest).toHaveBeenCalled();
    });

    it('should call notFound method', async () => {
      await update(
        { ...reqMock, params: { ...reqMock.params, isbn: 123456789123 } },
        repMock,
      );

      expect(repMock.notFound).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should delete book with given isbn', async () => {
      await remove(reqMock, repMock);

      expect(repMock.code).toHaveBeenCalledWith(204);
    });

    it('should call notFound method', async () => {
      await remove(
        { ...reqMock, params: { ...reqMock.params, isbn: 123456789123 } },
        repMock,
      );

      expect(repMock.notFound).toHaveBeenCalled();
    });
  });

  describe('uploadBookCover', () => {
    it('should call unsupportedMediaType method', async () => {
      await uploadBookCover(
        {
          ...reqMock,
          file() {
            return { mimetype: 'text/plain', file: new PassThrough() };
          },
        } as unknown as ReqMock,
        repMock,
      );

      expect(repMock.unsupportedMediaType).toHaveBeenCalled();
    });

    it('should call notFound method', async () => {
      await uploadBookCover(
        { ...reqMock, params: { isbn: 1234567890123 } },
        repMock,
      );

      expect(repMock.notFound).toHaveBeenCalled();
    });

    it('should call payloadTooLarge method', async () => {
      await uploadBookCover(
        {
          ...reqMock,
          file() {
            return {
              mimetype: 'image/gif',
              file: { truncated: true },
            };
          },
        } as unknown as ReqMock,
        repMock,
      );

      expect(repMock.payloadTooLarge).toHaveBeenCalled();
    });

    it('should upload book cover', async () => {
      await uploadBookCover(reqMock, repMock);

      expect(repMock.code).toHaveBeenCalledWith(204);
    });
  });
});

type ReqMock = FastifyRequest<{
  Params: { isbn: number };
  Body: z.infer<typeof booksSchema.create.schema.body> &
    z.infer<typeof booksSchema.update.schema.body>;
  Querystring: z.infer<typeof booksSchema.list.schema.querystring>;
}>;
