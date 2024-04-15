import { mount } from '@vue/test-utils';
import AppHeader from '../../../app/components/layouts/AppHeader.vue';

suite('AppHeader component', () => {
  it('should emit changeTheme event', async () => {
    const wrapper = mount(AppHeader, {
      props: { theme: 'light' },
    });

    await wrapper.find('#theme-button').trigger('click');

    expect(wrapper.emitted()).toHaveProperty('changeTheme');
  });

  it('should emit addBook event', async () => {
    const wrapper = mount(AppHeader, {
      props: { theme: 'light' },
    });

    await wrapper.find('#add-book-button').trigger('click');

    expect(wrapper.emitted()).toHaveProperty('addBook');
  });
});
