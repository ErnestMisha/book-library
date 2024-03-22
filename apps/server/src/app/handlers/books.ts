import { Books } from '../database';
import { Handlers } from './types';
import { pipeline } from 'stream/promises';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { rm, readdir } from 'fs/promises';

export function getHandlers(model: Books): Handlers {
  const assetsPath = join(__dirname, '..', '..', 'assets', 'books');

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
      const isbn = Number(req.params.isbn);

      const coverExtension = await model.selectCoverExtension(isbn);

      if (coverExtension) {
        await rm(join(assetsPath, `${isbn}.${coverExtension}`));
      }

      const affectedCount = await model.delete(isbn);

      if (!affectedCount) {
        return rep.notFound();
      }

      rep.code(204);
    },

    async uploadBookCover(req, rep) {
      const { mimetype, file } = await req.file();
      const { isbn } = req.params;

      if (!mimetype.startsWith('image')) {
        return rep.unsupportedMediaType();
      }

      const fileType = mimetype.split('/').at(-1);
      const filePath = join(assetsPath, `${isbn}.${fileType}`);

      const book = await model.get(Number(isbn));

      if (!book) {
        return rep.notFound();
      }

      await pipeline(file, createWriteStream(filePath));

      if (file.truncated) {
        await rm(filePath);
        return rep.payloadTooLarge();
      }

      await model.saveCoverExtension(Number(isbn), fileType);

      const coversToDelete = (await readdir(assetsPath)).filter(
        (cover) => cover.startsWith(isbn) && cover !== `${isbn}.${fileType}`,
      );

      for (const cover of coversToDelete) {
        await rm(join(assetsPath, cover));
      }

      rep.code(204);
    },
  };
}
