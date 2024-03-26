import { mount } from '@vue/test-utils';
import AppHeader from '../../app/components/AppHeader.vue';

suite('AppHeader component', () => {
  it('should emit changeTheme event', async () => {
    const wrapper = mount(AppHeader, {
      props: { theme: 'light' },
    });

    await wrapper.find('#theme-button').trigger('click');

    expect(wrapper.emitted()).toHaveProperty('changeTheme');
  });
});
