import { mount } from '@vue/test-utils';
import Header from '../../../app/components/layout/AppHeader.vue';

suite('Header component', () => {
  it('should emit change-theme event', async () => {
    const wrapper = mount(Header, {
      props: { theme: 'light' },
    });

    await wrapper.find('#theme-button').trigger('click');

    expect(wrapper.emitted()).toHaveProperty('change-theme');
  });
});
