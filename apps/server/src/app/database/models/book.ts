import { Collection, getClient } from '@mysql/xdevapi';
import { config } from '../../../config';
import { Book } from '@book-library/shared';

export class Books {
  private collectionName = 'books';
  private _collection: Collection;

  async connect() {
    this._collection = await getClient({
      schema: config.mysqlDb,
      user: config.mysqlUser,
      password: config.mysqlPass,
      port: config.mysqlPort,
    })
      .getSession()
      .then((session) => session.getDefaultSchema())
      .then((schema) =>
        schema.createCollection(this.collectionName, { reuseExisting: true })
      );
    await this._collection.dropIndex('isbn');
    await this._collection.createIndex('isbn', {
      fields: [{ field: '$.isbn', type: 'BIGINT', required: true }],
    });
  }

  private get collection() {
    if (!this._collection) {
      throw new Error('Connection not initialized, use `connect()` first !!!');
    }

    return this._collection;
  }

  async seedData(data: Book[]) {
    if (!(await this.collection.count())) {
      await this.collection.add(data).execute();
    }
  }

  async listBooks() {
    return this.collection
      .find()
      .fields('isbn')
      .execute()
      .then((res) => res.fetchAll());
  }

  async getBook(isbn: number) {
    return this.collection
      .find(`isbn = :isbn`)
      .bind('isbn', isbn)
      .fields(
        'title',
        'authors',
        'isbn',
        'edition',
        'length',
        'totalCount',
        'availableCount'
      )
      .limit(1)
      .execute()
      .then((res) => res.fetchOne());
  }

  async createBook(book: Book) {
    await this.collection.add(book).execute();
  }

  async updateBook(isbn: number, availableCount: number) {
    return this.collection
      .modify('isbn = :isbn')
      .set('availableCount', availableCount)
      .bind('isbn', isbn)
      .execute()
      .then((res) => res.getAffectedItemsCount());
  }

  async deleteBook(isbn: number) {
    return this.collection
      .remove('isbn = :isbn')
      .bind('isbn', isbn)
      .execute()
      .then((res) => res.getAffectedItemsCount());
  }
}
