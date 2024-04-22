import { Book } from '@book-library/shared';
import { ref, onMounted } from 'vue';

export function useBookDetails(isbn: Book['isbn']) {
  const book = ref<Book>();
  const edit = ref(false);
  const count = ref({
    available: 0,
    total: 0,
  });
  const error = ref('');

  async function save() {
    error.value = '';

    if (count.value.available > count.value.total) {
      error.value = 'Available count cannot be greater than total count';
      return;
    }

    if (count.value.available < 0) {
      error.value = 'Available count cannot be lower than zero';
      return;
    }

    if (count.value.total < 1) {
      error.value = 'Available count cannot be lower than one';
      return;
    }

    const res = await fetch(`/books/${isbn}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        availableCount: count.value.available,
        totalCount: count.value.total,
      }),
    });

    if (!res.ok) {
      error.value = 'Something went wrong please try again later';
    }

    edit.value = false;
  }

  function enableEdit() {
    edit.value = true;
    error.value = '';
  }

  onMounted(async () => {
    book.value = await fetch(`/books/${isbn}`).then((res) => res.json());
    count.value.available = book.value!.availableCount;
    count.value.total = book.value!.totalCount;
  });

  return { book, edit, count, error, save, enableEdit };
}
