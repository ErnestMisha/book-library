import { useValidate } from '../../app/composables';

suite('useValidate', () => {
  it('should set validation errors - required fields', async () => {
    const { errors, validate } = useValidate();

    await validate({
      length: 100,
      title: 'Sample title',
      authors: ['Sample author'],
      edition: 3,
      totalCount: 10,
      availableCount: 8,
    });

    expect(errors.value).toMatchObject({
      isbn: 'Required',
      cover: 'Required',
    });
  });

  it('should set validation errors - invalid fields types', async () => {
    const { errors, validate } = useValidate();

    await validate(
      {
        length: 100,
        isbn: 1234567890123,
        title: '',
        authors: ['Sample author'],
        edition: 3,
        totalCount: 10,
        availableCount: 8,
      },
      new File(['foo'], 'foo.txt', {
        type: 'text/plain',
      }),
    );

    expect(errors.value).toMatchObject({
      title: 'Title must contain at least 5 characters',
      cover: 'Invalid file type',
    });
  });

  it('should not set validation errors', async () => {
    const { errors, validate } = useValidate();

    await validate(
      {
        length: 100,
        isbn: 1234567890123,
        title: 'Sample title',
        authors: ['Sample author'],
        edition: 3,
        totalCount: 10,
        availableCount: 8,
      },
      new File(['foo'], 'foo.png', {
        type: 'image/png',
      }),
    );

    expect(errors.value).toMatchObject({});
  });
});
