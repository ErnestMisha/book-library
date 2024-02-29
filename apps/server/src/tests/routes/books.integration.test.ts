import createServer from 'fastify';
import { app } from '../../app/app';
import {
  validatorCompiler,
  serializerCompiler,
} from 'fastify-type-provider-zod';
import { getHelpers } from '../helpers';
import { Book } from '@book-library/shared';
import { books } from '../../app/database';

suite('/books route', async () => {
  const { clearDb, seedDb } = await getHelpers();
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
        url: '/books',
      });

      const data = response.json<Book[]>();

      expect(response.statusCode).toBe(200);
      expect(data).toMatchObject(
        books.map(({ isbn, title, authors, edition }) => ({
          isbn,
          title,
          authors,
          edition,
        }))
      );
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

    it('should respond 400 status code', async () => {
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

  describe('PATCH /', () => {
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

    it('should respond 404 status code', async () => {
      const response = await server.inject({
        method: 'PATCH',
        url: `/books/1234567891234`,
        body: {
          availableCount: 10000,
        },
      });

      expect(response.statusCode).toBe(404);
    });

    it('should respond 400 status code', async () => {
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

  describe('DELETE /', () => {
    it('should respond with 204 status code', async () => {
      const response = await server.inject({
        method: 'DELETE',
        url: `/books/${books.at(-1).isbn}`,
      });

      expect(response.statusCode).toBe(204);
    });

    it('should respond 404 status code', async () => {
      const response = await server.inject({
        method: 'DELETE',
        url: `/books/1234567891234`,
      });

      expect(response.statusCode).toBe(404);
    });

    it('should respond 400 status code', async () => {
      const response = await server.inject({
        method: 'DELETE',
        url: `/books/invalid-isbn`,
      });

      expect(response.statusCode).toBe(400);
    });
  });
});
