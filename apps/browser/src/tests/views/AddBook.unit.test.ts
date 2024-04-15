import { mount } from '@vue/test-utils';
import AddBook from '../../app/views/AddBook.vue';
import { useSubmit, SubmitStatus } from '../../app/composables';
import { nextTick, ref } from 'vue';
import Loader from '../../app/components/layouts/Loader.vue';

suite('AddBook component', () => {
  vi.mock('../../app/composables');

  it('should render form', () => {
    vi.mocked(useSubmit).mockReturnValueOnce({
      errors: ref({}),
      status: ref(SubmitStatus.Idle),
      submit: vi.fn(),
    });

    const wrapper = mount(AddBook);

    expect(wrapper.find('form').exists()).toBeTruthy();
    expect(wrapper.findAll('button')).toHaveLength(2);
  });

  it('should render Loader component', () => {
    vi.mocked(useSubmit).mockReturnValueOnce({
      errors: ref({}),
      status: ref(SubmitStatus.Submitting),
      submit: vi.fn(),
    });

    const wrapper = mount(AddBook);

    expect(wrapper.findComponent(Loader).exists()).toBeTruthy();
    expect(wrapper.findAll('button')).toHaveLength(1);
  });

  it('should render error icon', () => {
    vi.mocked(useSubmit).mockReturnValueOnce({
      errors: ref({}),
      status: ref(SubmitStatus.Error),
      submit: vi.fn(),
    });

    const wrapper = mount(AddBook);

    expect(wrapper.find('.pi-exclamation-circle').exists()).toBeTruthy();
    expect(wrapper.findAll('button')).toHaveLength(1);
  });

  it('should emit closeModal event', async () => {
    const status = ref(SubmitStatus.Idle);

    vi.mocked(useSubmit).mockReturnValueOnce({
      errors: ref({}),
      status,
      submit: vi.fn(),
    });

    const wrapper = mount(AddBook);
    status.value = SubmitStatus.Success;

    await nextTick();
    await wrapper.find('.pi-times').trigger('click');

    expect(wrapper.emitted('closeModal')).toHaveLength(2);
    expect(wrapper.findAll('button')).toHaveLength(1);
  });
});
