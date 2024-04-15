import { CreateBook } from '@book-library/shared';
import { useSubmit, SubmitStatus } from '../../app/composables';

suite('useSubmit', () => {
  const book: CreateBook = {
    length: 100,
    isbn: 1234567890123,
    title: 'Sample title',
    authors: ['Sample author'],
    edition: 3,
    totalCount: 10,
    availableCount: 8,
  };
  const cover = new File(['foo'], 'foo.png', {
    type: 'image/png',
  });

  it('should set status to error', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve({ ok: false })),
    );

    const { status, submit } = useSubmit();

    expect(status.value).toBe(SubmitStatus.Idle);

    await submit(book, cover);

    expect(status.value).toBe(SubmitStatus.Error);
  });

  it('should set status to success', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve({ ok: true })),
    );

    const { status, submit } = useSubmit();

    expect(status.value).toBe(SubmitStatus.Idle);

    await submit(book, cover);

    expect(status.value).toBe(SubmitStatus.Success);
  });
});
