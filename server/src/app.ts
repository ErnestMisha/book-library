import { join } from 'path';
import AutoLoad from '@fastify/autoload';
import { FastifyPluginAsync } from 'fastify';
import { books, Book } from './database';
import { config } from './config';

export const app: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  // Place here your custom code!
  if (config.environment === 'development') {
    await Book.createCollection();
    await Book.seedData(books);
  }
  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts
  });
};
