import { Books } from '../database';
import { Handlers } from './types';

export function getHandlers(model: Books): Handlers {
  return {
    async list(req, rep) {
      return model.list();
    },

    async get(req, rep) {
      const book = await model.get(Number(req.params.isbn));

      return book ? book : rep.notFound();
    },

    async create(req, rep) {
      const book = await model.get(req.body.isbn);

      if (book) {
        return rep.conflict();
      }

      await model.create(req.body);

      rep.code(201).header('Location', `/books/${req.body.isbn}`);
      return { isbn: req.body.isbn };
    },

    async update(req, rep) {
      if (!req.body.totalCount && !req.body.availableCount) {
        return rep.badRequest();
      }

      const isbn = Number(req.params.isbn);
      const book = await model.get(isbn);

      if (!book) {
        return rep.notFound();
      }

      await model.update(isbn, req.body);

      rep.code(204);
    },

    async delete(req, rep) {
      const affectedCount = await model.delete(Number(req.params.isbn));

      if (!affectedCount) {
        return rep.notFound();
      }

      rep.code(204);
    },
  };
}
