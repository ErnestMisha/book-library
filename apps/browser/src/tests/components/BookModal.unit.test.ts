import { mount } from '@vue/test-utils';
import BookModal from '../../app/components/BookModal.vue';
import { Book } from '@book-library/shared';
import { ref } from 'vue';
import { useFetch } from '../../app/composables';

suite('BookModal component', () => {
  vi.mock('../../app/composables');

  it('should emit closeModal event', async () => {
    const wrapper = mountBookModal();

    await wrapper.find('button').trigger('keyup.esc');
    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('closeModal')).toHaveLength(2);
  });

  it('should display loader while fetching data', async () => {
    const wrapper = mountBookModal();

    expect(wrapper.find('i').exists()).toBe(true);
    expect(wrapper.find('article').exists()).toBe(false);
  });

  it('should display actual content after fetching data', async () => {
    vi.mocked(useFetch).mockReturnValueOnce(
      ref<Book>({
        title:
          'Najlepsze miejsce na świecie. Gdzie Wschód zderza się z Zachodem',
        authors: ['Jacek Bartosiak'],
        isbn: 9788308080719,
        edition: 1,
        length: 496,
        totalCount: 20,
        availableCount: 4,
        coverExtension: 'jpg',
      }),
    );

    const wrapper = mountBookModal();

    expect(wrapper.find('i').exists()).toBe(false);
    expect(wrapper.find('article').exists()).toBe(true);
  });
});

function mountBookModal() {
  return mount(BookModal, {
    props: { isbn: 1234567890123 },
    global: {
      directives: {
        focus: (el: HTMLElement) => el.focus(),
      },
    },
  });
}
