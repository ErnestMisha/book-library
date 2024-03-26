import { mount, flushPromises } from '@vue/test-utils';
import BookModal from '../../app/components/BookModal.vue';

suite('BookModal component', () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(() => Promise.resolve({ json: vi.fn() })),
  );

  it('should emit closeModal event', async () => {
    const wrapper = mount(BookModal, {
      props: { isbn: 1234567890123 },
    });

    await wrapper.find('button').trigger('keyup.esc');
    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('closeModal')).toHaveLength(2);
  });

  it('should display loader while fetching data', async () => {
    const wrapper = mount(BookModal, {
      props: { isbn: 1234567890123 },
    });

    expect(wrapper.find('i').exists()).toBe(true);
    expect(wrapper.find('article').exists()).toBe(false);
  });

  it('should display actual content after fetching data', async () => {
    const wrapper = mount(BookModal, {
      props: { isbn: 1234567890123 },
    });

    await flushPromises();

    expect(wrapper.find('i').exists()).toBe(false);
    expect(wrapper.find('article').exists()).toBe(true);
  });
});
