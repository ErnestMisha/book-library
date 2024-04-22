import { CreateBook, createBookSchema } from '@book-library/shared';
import { ref } from 'vue';

export function useValidate() {
  const errors = ref<Record<string, string>>({});

  async function validate(book: Partial<CreateBook>, cover?: File) {
    errors.value = await createBookSchema.spa(book).then((res) => {
      if (!res.success) {
        const fields: Record<string, string[]> =
          res.error.flatten().fieldErrors;
        const mappedFields: Record<string, string> = {};

        for (const field in fields) {
          mappedFields[field] = fields[field][0];
        }

        return mappedFields;
      }
      return {};
    });

    if (!cover) {
      errors.value.cover = 'Required';
    } else if (!cover.type.startsWith('image')) {
      errors.value.cover = 'Invalid file type';
    } else if (cover.size > 500 * 1024) {
      errors.value.cover = 'Cover image size is too large (max 500KB)';
    }
  }

  return { errors, validate };
}
