import { getClient } from '@mysql/xdevapi';
import { config } from '../config';
import { books } from '../app/database';
import { cp, rm } from 'fs/promises';
import { join } from 'path';
import { createReadStream } from 'fs';

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
      schema.createCollection('books', { reuseExisting: true }),
    );
  const appAssetsPath = join(__dirname, '..', 'assets');
  const testAssetsPath = join(__dirname, '..', 'assets-copy');
  const tooLargeCoverPath = join(__dirname, 'assets', 'too-large-cover.jpg');
  const newCoverPath = join(__dirname, 'assets', 'new-cover.jpg');

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
    async restoreAssets() {
      await rm(appAssetsPath, { recursive: true });
      await cp(testAssetsPath, appAssetsPath, { recursive: true });
    },
    getTooLargeCoverStream() {
      return createReadStream(tooLargeCoverPath);
    },
    getNewCoverStream() {
      return createReadStream(newCoverPath);
    },
  };
}
