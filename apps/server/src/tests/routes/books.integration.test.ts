import createServer from 'fastify';
import { app } from '../../app/app';
import {
  validatorCompiler,
  serializerCompiler,
} from 'fastify-type-provider-zod';
import { getHelpers } from '../helpers';
import { Book } from '@book-library/shared';
import { books } from '../../app/database';
import formAutoContent from 'form-auto-content';

suite('/books route', async () => {
  const {
    clearDb,
    seedDb,
    restoreAssets,
    getTooLargeCoverStream,
    getNewCoverStream,
  } = await getHelpers();
  const server = createServer()
    .setValidatorCompiler(validatorCompiler)
    .setSerializerCompiler(serializerCompiler)
    .register(app);

  beforeEach(async () => {
    await clearDb();
    await seedDb();
  });

  describe('GET /', () => {
    it('should respond with list of books', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/books?limit=20&offset=0',
      });

      const data = response.json<Book[]>();

      expect(response.statusCode).toBe(200);
      expect(data).toMatchObject({
        books: books
          .map(({ isbn, title, authors, edition }) => ({
            isbn,
            title,
            authors,
            edition,
          }))
          .sort((prev, next) => prev.isbn - next.isbn),
        limit: 20,
        offset: 0,
      });
    });
  });

  describe('GET /:isbn', () => {
    it('should respond with book', async () => {
      const response = await server.inject({
        method: 'GET',
        url: `/books/${books[0].isbn}`,
      });

      const data = response.json<Book>();

      expect(response.statusCode).toBe(200);
      expect(data).toMatchObject(books[0]);
    });

    it('should respond with 404 status code', async () => {
      const response = await server.inject({
        method: 'GET',
        url: `/books/9999999999999`,
      });

      expect(response.statusCode).toBe(404);
    });
  });

  describe('POST /', () => {
    it('should respond with new book details', async () => {
      const isbn = 9999999999999;
      const response = await server.inject({
        method: 'POST',
        url: `/books`,
        body: {
          isbn,
          title: 'string',
          authors: ['string'],
          edition: 30,
          length: 2000,
          totalCount: 10000,
          availableCount: 10000,
        },
      });

      const data = response.json<{ isbn: number }>();

      expect(response.statusCode).toBe(201);
      expect(data.isbn).toMatchObject(isbn);
      expect(response.headers.location).toBe(`/books/${isbn}`);
    });

    it('should respond with 400 status code', async () => {
      const response = await server.inject({
        method: 'POST',
        url: `/books`,
        body: {
          title: 'string',
          availableCount: 10000,
        },
      });

      expect(response.statusCode).toBe(400);
    });
  });

  describe('PATCH /:isbn', () => {
    it('should respond with 204 status code', async () => {
      const response = await server.inject({
        method: 'PATCH',
        url: `/books/${books.at(-1).isbn}`,
        body: {
          availableCount: 10000,
        },
      });

      expect(response.statusCode).toBe(204);
    });

    it('should respond with 404 status code', async () => {
      const response = await server.inject({
        method: 'PATCH',
        url: `/books/1234567891234`,
        body: {
          availableCount: 10000,
        },
      });

      expect(response.statusCode).toBe(404);
    });

    it('should respond with 400 status code', async () => {
      const response = await server.inject({
        method: 'PATCH',
        url: `/books/invalid-isbn`,
        body: {
          availableCount: 10000,
        },
      });

      expect(response.statusCode).toBe(400);
    });
  });

  describe('DELETE /:isbn', () => {
    afterEach(async () => {
      await restoreAssets();
    });

    it('should respond with 204 status code', async () => {
      const response = await server.inject({
        method: 'DELETE',
        url: `/books/${books.at(-1).isbn}`,
      });

      expect(response.statusCode).toBe(204);
    });

    it('should respond with 404 status code', async () => {
      const response = await server.inject({
        method: 'DELETE',
        url: `/books/1234567891234`,
      });

      expect(response.statusCode).toBe(404);
    });

    it('should respond with 400 status code', async () => {
      const response = await server.inject({
        method: 'DELETE',
        url: `/books/invalid-isbn`,
      });

      expect(response.statusCode).toBe(400);
    });
  });

  describe('PUT /:isbn/cover', () => {
    afterEach(async () => {
      await restoreAssets();
    });

    it('should respond with 404 status code', async () => {
      const response = await server.inject({
        method: 'PUT',
        url: `/books/invalid-isbn/cover`,
      });

      expect(response.statusCode).toBe(400);
    });

    it('should respond with 413 status code', async () => {
      const response = await server.inject({
        method: 'PUT',
        url: `/books/${books.at(-2).isbn}/cover`,
        ...formAutoContent({
          file: getTooLargeCoverStream(),
        }),
      });

      expect(response.statusCode).toBe(413);
    });

    it('should respond with 204 status code', async () => {
      const response = await server.inject({
        method: 'PUT',
        url: `/books/${books.at(-2).isbn}/cover`,
        ...formAutoContent({
          file: getNewCoverStream(),
        }),
      });

      expect(response.statusCode).toBe(204);
    });
  });
});
