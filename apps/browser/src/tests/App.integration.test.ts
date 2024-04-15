import { flushPromises, mount } from '@vue/test-utils';
import App from '../app/App.vue';
import BookCard from '../app/components/layouts/BookCard.vue';
import BookDetails from '../app/views/BookDetails.vue';
import AddBook from '../app/views/AddBook.vue';
import Loader from '../app/components/layouts/Loader.vue';

suite('App component', () => {
  const book = {
    isbn: 9780313231506,
    title: 'Democratic Ideals and Reality',
    authors: ['Halford John Mackinder'],
    edition: 1,
    coverExtension: '.jpg',
    lenght: 278,
    totalCount: 12,
    availableCount: 2,
  };

  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({
      matches: false,
    })),
  );
  vi.stubGlobal(
    'fetch',
    vi.fn((url) =>
      url === '/books'
        ? Promise.resolve({
            json: () => ({
              book,
            }),
          })
        : Promise.resolve({ json: () => book }),
    ),
  );

  it('should change view to BookDetails', async () => {
    const wrapper = mount(App);

    expect(wrapper.findComponent(Loader).exists()).toBeTruthy();

    await flushPromises();
    await wrapper.findComponent(BookCard).trigger('click');
    await flushPromises();

    expect(wrapper.findComponent(BookDetails).exists()).toBeTruthy();
    expect(wrapper.findComponent(Loader).exists()).toBeFalsy();
  });

  it('should change view to AddBook', async () => {
    const wrapper = mount(App);

    expect(wrapper.findComponent(Loader).exists()).toBeTruthy();

    await flushPromises();
    await wrapper.find('#add-book-button').trigger('click');

    expect(wrapper.findComponent(AddBook).exists()).toBeTruthy();
    expect(wrapper.findComponent(Loader).exists()).toBeFalsy();
  });
});
