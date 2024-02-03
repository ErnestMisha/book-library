import { getClient } from '@mysql/xdevapi';
import { config } from '../../config';
import { Book as BookType } from '@book-library/shared/types';

export class Book {
  static #dbClient = getClient({
    schema: config.mysqlDb,
    user: config.mysqlUser,
    password: config.mysqlPass,
    port: config.mysqlPort
  });

  static #collection = 'books';

  static async createCollection() {
    const session = await this.#dbClient.getSession();
    const schema = session.getDefaultSchema();

    await schema.createCollection(this.#collection, {
      reuseExisting: true
    });

    await session.close();
  }

  static async seedData(data: BookType[]) {
    const session = await this.#dbClient.getSession();
    const books = session.getDefaultSchema().getCollection(this.#collection);
    const count = await books.count();

    if (!count) {
      await books.add(data).execute();
    }

    await session.close();
  }

  static async listBooks() {
    const session = await this.#dbClient.getSession();
    const books = session.getDefaultSchema().getCollection(this.#collection);
    const queryRes = await books.find().fields('isbn').execute();

    await session.close();

    return queryRes.fetchAll() as BookType[];
  }

  static async getBook(isbn: string) {
    const session = await this.#dbClient.getSession();
    const books = session.getDefaultSchema().getCollection(this.#collection);
    const queryRes = await books
      .find(`isbn = :isbn`)
      .bind('isbn', isbn)
      .fields('title', 'authors', 'isbn', 'edition', 'length', 'totalAmount', 'available')
      .limit(1)
      .execute();

    await session.close();

    return queryRes.fetchOne() as BookType;
  }

  static async createBook(book: BookType) {
    const session = await this.#dbClient.getSession();
    const books = session.getDefaultSchema().getCollection(this.#collection);

    await books.add(book).execute();
    await session.close();
  }

  static async updateBook(isbn: string, available: boolean) {
    const session = await this.#dbClient.getSession();
    const books = session.getDefaultSchema().getCollection(this.#collection);

    await books.modify('isbn = :isbn').set('available', available).bind('isbn', isbn).execute();
    await session.close();
  }

  static async deleteBook(isbn: string) {
    const session = await this.#dbClient.getSession();
    const books = session.getDefaultSchema().getCollection(this.#collection);

    await books.remove('isbn = :isbn').bind('isbn', isbn).execute();
    await session.close();
  }
}
