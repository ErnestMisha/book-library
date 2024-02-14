import { Book } from '../database';
import { RouteHandler } from 'fastify';
import { Dto } from './dto';

export class Books {
  list: RouteHandler<Dto['List']> = async (req, rep) => Book.listBooks();

  get: RouteHandler<Dto['Get']> = async (req, rep) => {
    const book = await Book.getBook(Number(req.params.isbn));

    if (!book) {
      return rep.notFound();
    }

    return book;
  };

  create: RouteHandler<Dto['Create']> = async (req, rep) => {
    await Book.createBook(req.body);

    return { isbn: req.body.isbn };
  };

  update: RouteHandler<Dto['Update']> = async (req, rep) => {
    const isbn = Number(req.params.isbn);

    await Book.updateBook(isbn, req.body.availableCount);

    return { isbn };
  };

  delete: RouteHandler<Dto['Delete']> = async (req, rep) => {
    await Book.deleteBook(Number(req.params.isbn));
  };
}
