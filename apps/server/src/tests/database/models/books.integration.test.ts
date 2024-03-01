import { Books, books } from '../../../app/database';
import { Book, UpdateBook } from '@book-library/shared';
import { getHelpers } from '../../helpers';

suite('Books model', async () => {
  const { getBook, clearDb, seedDb } = await getHelpers();
  const model = new Books();
  await model.connect();

  beforeEach(async () => {
    await clearDb();
    await seedDb();
  });

  it('should return list of all books', async () => {
    const list = await model.list();

    expect(list).toHaveLength(9);
    for (const book of list) {
      expect(book).toHaveProperty('isbn');
      expect(book).toHaveProperty('title');
      expect(book).toHaveProperty('authors');
      expect(book).toHaveProperty('edition');
    }
  });

  it('should return book with given isbn', async () => {
    const book = await model.get(books[0].isbn);

    expect(book).toMatchObject(books[0]);
  });

  it('should create new book', async () => {
    const newBook: Book = {
      title: 'Najlepsze miejsce na świecie. Gdzie Wschód zderza się z Zachodem',
      authors: ['Jacek Bartosiak'],
      isbn: 9788308080719,
      edition: 1,
      length: 496,
      totalCount: 20,
      availableCount: 4,
    };

    await model.create(newBook);

    const book = await getBook(newBook.isbn);

    expect(book).toMatchObject(newBook);
  });

  it('should update book with given isbn', async () => {
    const updateBook: UpdateBook = { totalCount: 100, availableCount: 1 };

    await model.update(books.at(-1).isbn, updateBook);

    const book = await getBook(books.at(-1).isbn);

    expect(book.totalCount).toBe(updateBook.totalCount);
    expect(book.availableCount).toBe(updateBook.availableCount);
  });

  it('should delete book with given isbn', async () => {
    await model.delete(books[2].isbn);

    const book = await getBook(books[2].isbn);

    expect(book).toBeUndefined();
  });

  it('test case', () => {
    expect(1).toBe(1);
  });
});
