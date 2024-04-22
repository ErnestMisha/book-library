import { ref, computed, onMounted } from 'vue';
import { useTheme } from './useTheme';
import { useFetchBooks } from './useFetchBooks';
import BookDetails from '../views/BookDetails.vue';
import AddBook from '../views/AddBook.vue';

export function useApp() {
  const offset = ref(0);
  const { theme, changeTheme } = useTheme();
  const { books, prevPage, nextPage, refetch } = useFetchBooks(
    computed(() => `/books?limit=12&offset=${offset.value}`),
  );
  const currView = ref<'BookDetails' | 'AddBook'>();
  const views = {
    BookDetails,
    AddBook,
  };
  const isbn = ref<number>();
  const scrollUpButton = ref(false);

  function changeView(name: 'BookDetails' | 'AddBook', newIsbn?: number) {
    currView.value = name;
    isbn.value = newIsbn;
  }

  async function closeModal() {
    currView.value = undefined;
    await refetch();
  }

  function scrollUp() {
    scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  async function deleteBook(isbn: number) {
    await fetch(`/books/${isbn}`, { method: 'DELETE' });
    await refetch();
  }

  onMounted(() => {
    addEventListener('scroll', (event) => {
      if (scrollY > 200) {
        scrollUpButton.value = true;
      } else {
        scrollUpButton.value = false;
      }
    });
  });

  return {
    offset,
    theme,
    changeTheme,
    books,
    prevPage,
    nextPage,
    currView,
    views,
    isbn,
    scrollUpButton,
    changeView,
    closeModal,
    scrollUp,
    deleteBook,
  };
}
