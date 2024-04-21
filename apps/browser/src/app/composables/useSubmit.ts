import { CreateBook } from '@book-library/shared';
import { ref } from 'vue';
import { useValidate } from './useValidate';

export function useSubmit() {
  const status = ref(SubmitStatus.Idle);
  const { errors, validate } = useValidate();

  async function submit(book: Partial<CreateBook>, cover?: File) {
    await validate(book, cover);

    if (Object.values(errors.value).length) {
      return;
    }

    status.value = SubmitStatus.Submitting;

    const bookRes = await fetch('/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });

    if (!bookRes.ok) {
      await fetch(`/books/${book.isbn}`, { method: 'DELETE' });
      status.value = SubmitStatus.Error;
      return;
    }

    const formData = new FormData();
    formData.set('', cover!);

    const coverRes = await fetch(`/books/${book.isbn}/cover`, {
      method: 'PUT',
      body: formData,
    });

    if (!coverRes.ok) {
      await fetch(`/books/${book.isbn}`, { method: 'DELETE' });
      status.value = SubmitStatus.Error;
      return;
    }

    status.value = SubmitStatus.Success;
  }

  return { errors, status, submit };
}

export enum SubmitStatus {
  Idle,
  Submitting,
  Error,
  Success,
}
