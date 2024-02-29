import { Collection, getClient } from '@mysql/xdevapi';
import { config } from '../../../config';
import { Book, UpdateBook } from '@book-library/shared';

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
    await this.collection.add(data).execute();
  }

  async list() {
    return this.collection
      .find()
      .fields('isbn', 'title', 'authors', 'edition')
      .execute()
      .then((res) => res.fetchAll());
  }

  async get(isbn: number) {
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
      .execute()
      .then((res) => res.fetchOne());
  }

  async create(book: Book) {
    await this.collection.add(book).execute();
  }

  async update(isbn: number, book: UpdateBook) {
    const query = this.collection.modify('isbn = :isbn').bind('isbn', isbn);

    if (book.totalCount) {
      query.set('totalCount', book.totalCount);
    }

    if (book.availableCount) {
      query.set('availableCount', book.availableCount);
    }

    await query.execute();
  }

  async delete(isbn: number) {
    return this.collection
      .remove('isbn = :isbn')
      .bind('isbn', isbn)
      .execute()
      .then((res) => res.getAffectedItemsCount());
  }
}
