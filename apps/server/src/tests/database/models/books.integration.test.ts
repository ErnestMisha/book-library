import { Books, books } from '../../../app/database';
import { Book, UpdateBook } from '@book-library/shared';
import { getHelpers } from '../../helpers';

suite('Books model', async () => {
  const { getBook, clearDb, seedDb } = await getHelpers();
  const model = new Books();
  await model.connect();
  const bookList = books
    .map(({ isbn, title, authors, edition }) => ({
      isbn,
      title,
      authors,
      edition,
    }))
    .sort((prev, next) => prev.isbn - next.isbn);

  beforeEach(async () => {
    await clearDb();
    await seedDb();
  });

  it('should return sorted lists of books', async () => {
    const listOne = await model.list(6, 0);
    const listTwo = await model.list(6, 6);
    const listThree = await model.list(6, 12);

    expect(listOne).toHaveLength(6);
    expect(listOne).toMatchObject(bookList.slice(0, 6));
    expect(listTwo).toHaveLength(6);
    expect(listTwo).toMatchObject(bookList.slice(6, 12));
    expect(listThree).toHaveLength(4);
    expect(listThree).toMatchObject(bookList.slice(12));
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

  it('should save cover extension', async () => {
    const ext = 'webp';

    await model.saveCoverExtension(books[3].isbn, ext);

    const book = await getBook(books[3].isbn);

    expect(book.coverExtension).toBe(ext);
  });

  it('should select cover extension', async () => {
    const ext = await model.selectCoverExtension(books[4].isbn);

    expect(ext).toBe(books[4].coverExtension);
  });
});
