export const listBooksSchema = {
  description: 'returns list of books isbn',
  tags: ['books'],
  additionalProperties: false,
  response: {
    200: {
      description: 'Successful response',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          isbn: { type: 'string' }
        }
      }
    }
  }
};

export const getBookSchema = {
  description: 'returns book with given isbn',
  tags: ['books'],
  additionalProperties: false,
  params: {
    isbn: { type: 'string' }
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        title: { type: 'string' },
        isbn: { type: 'string' },
        authors: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        edition: { type: 'number' },
        length: { type: 'number' },
        totalAmount: { type: 'number' },
        available: { type: 'number' }
      }
    }
  }
};

export const createBookSchema = {
  description: 'creates book',
  tags: ['books'],
  additionalProperties: false,
  body: {
    type: 'object',
    required: ['title', 'isbn', 'authors'],
    properties: {
      title: { type: 'string' },
      isbn: { type: 'string' },
      authors: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      edition: { type: 'number' },
      length: { type: 'number' },
      totalAmount: { type: 'number' },
      available: { type: 'number' }
    }
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        isbn: { type: 'string' }
      }
    }
  }
};

export const updateBookSchema = {
  description: 'updates amount of available book copies for given isbn',
  tags: ['books'],
  additionalProperties: false,
  body: {
    type: 'object',
    properties: {
      available: { type: 'number' }
    }
  },
  params: {
    isbn: { type: 'string' }
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        isbn: { type: 'string' }
      }
    }
  }
};

export const deleteBookSchema = {
  description: 'deletes book with given isbn',
  tags: ['books'],
  additionalProperties: false,
  params: {
    isbn: { type: 'string' }
  }
};
