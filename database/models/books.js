import { getClient } from "@mysql/xdevapi";
import { config } from "../../config.js";

export class Books {
  static #dbClient = getClient({
    schema: config.mysqlDb,
    user: config.mysqlUser,
    password: config.mysqlPass,
    port: config.mysqlPort,
  });

  static #collection = "books";

  static async createCollection() {
    const session = await this.#dbClient.getSession();
    const schema = session.getDefaultSchema();

    const books = await schema.createCollection(this.#collection, {
      reuseExisting: true,
    });

    await session.close();
  }

  static async seedData(data) {
    const session = await this.#dbClient.getSession();
    const books = session.getDefaultSchema().getCollection(this.#collection);
    const count = await books.count();

    if (!count) {
      await books.add(data).execute();
    }

    await session.close();
  }
}
