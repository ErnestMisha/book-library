import { ref } from 'vue';
import { useFetchBooks } from '../../app/composables';
import { flushPromises } from '@vue/test-utils';

suite('useFetch', () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(() =>
      Promise.resolve({
        json: vi.fn(() => ({
          books: [],
          offset: 0,
          totalCount: 8,
        })),
      }),
    ),
  );

  it('should automatically refetch data after url change', async () => {
    const url = ref('sample/1');

    useFetchBooks(url);
    expect(fetch).toHaveBeenCalledOnce();

    url.value = 'sample/2';

    await flushPromises();
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it('should set data to null while fetching', async () => {
    const { books } = useFetchBooks('sample');

    expect(books.value).toBeNull();

    await flushPromises();

    expect(books.value).not.toBeNull();
  });

  it('should set prevPage to false and nextPage to true', async () => {
    const { prevPage, nextPage } = useFetchBooks('sample');

    await flushPromises();

    expect(prevPage.value).toBeFalsy();
    expect(nextPage.value).toBeTruthy();
  });

  it('should set prevPage to true and nextPage to false', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          json: vi.fn(() => ({
            books: [],
            offset: 8,
            totalCount: 8,
          })),
        }),
      ),
    );

    const { prevPage, nextPage } = useFetchBooks('sample');

    await flushPromises();

    expect(prevPage.value).toBeTruthy();
    expect(nextPage.value).toBeFalsy();
  });
});
