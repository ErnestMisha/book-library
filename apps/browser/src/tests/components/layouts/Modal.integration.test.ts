import { mount } from '@vue/test-utils';
import Modal from 'apps/browser/src/app/components/layouts/Modal.vue';

suite('Modal component', () => {
  it('should dispaly Loader component', () => {
    const wrapper = mount(Modal, {
      props: {
        loading: true,
      },
    });

    expect(wrapper.find('i').exists()).toBeTruthy();
    expect(wrapper.find('article').exists()).toBeFalsy();
  });

  it('should display article', () => {
    const wrapper = mount(Modal, {
      props: {
        loading: false,
      },
    });

    expect(wrapper.find('i').exists()).toBeFalsy();
    expect(wrapper.find('article').exists()).toBeTruthy();
  });

  it('should emit closeModal event', async () => {
    const wrapper = mount(Modal, {
      props: {
        loading: true,
      },
    });

    dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape' }));
    await wrapper.find('div').trigger('click');

    expect(wrapper.emitted('closeModal')).toHaveLength(2);
  });
});
