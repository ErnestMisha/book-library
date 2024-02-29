import { getClient } from '@mysql/xdevapi';
import { config } from '../config';
import { books } from '../app/database';

export async function getHelpers() {
  const client = await getClient({
    schema: config.mysqlDb,
    user: config.mysqlUser,
    password: config.mysqlPass,
    port: config.mysqlPort,
  })
    .getSession()
    .then((session) => session.getDefaultSchema())
    .then((schema) =>
      schema.createCollection('books', { reuseExisting: true })
    );

  return {
    async clearDb() {
      await client.remove('true').execute();
    },
    async seedDb() {
      await client.add(books).execute();
    },
    async getBook(isbn: number) {
      return client
        .find(`isbn = :isbn`)
        .bind('isbn', isbn)
        .execute()
        .then((res) => res.fetchOne());
    },
  };
}
