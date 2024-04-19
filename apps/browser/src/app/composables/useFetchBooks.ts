import { BookList } from '@book-library/shared';
import { Ref, ref, toValue, watchEffect } from 'vue';

export function useFetchBooks(url: Ref | string) {
  const books = ref<BookList['books'] | null>();
  const prevPage = ref<boolean>();
  const nextPage = ref<boolean>();

  async function refetch() {
    books.value = null;
    const data: BookList = await fetch(toValue(url)).then((res) => res.json());
    books.value = data.books;
    prevPage.value = data.offset > 0;
    nextPage.value = data.books.length + data.offset < data.totalCount;
  }

  watchEffect(async () => {
    refetch();
  });

  return { books, prevPage, nextPage, refetch };
}
