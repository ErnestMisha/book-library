import { mount } from '@vue/test-utils';
import AppHeader from '../../../app/components/layouts/AppHeader.vue';

suite('AppHeader component', () => {
  it('should emit changeTheme event', async () => {
    const wrapper = mount(AppHeader, {
      props: { theme: 'light' },
    });

    await wrapper.find('.pi-moon').trigger('click');

    expect(wrapper.emitted()).toHaveProperty('changeTheme');
  });

  it('should emit addBook event', async () => {
    const wrapper = mount(AppHeader, {
      props: { theme: 'light' },
    });

    await wrapper.find('.pi-plus').trigger('click');

    expect(wrapper.emitted()).toHaveProperty('addBook');
  });

  it('should emit prevPage event', async () => {
    const wrapper = mount(AppHeader, {
      props: { theme: 'light', prevPage: true },
    });

    await wrapper.find('.pi-arrow-left').trigger('click');

    expect(wrapper.emitted()).toHaveProperty('prevPage');
  });

  it('should emit nextPage event', async () => {
    const wrapper = mount(AppHeader, {
      props: { theme: 'light', nextPage: true },
    });

    await wrapper.find('.pi-arrow-right').trigger('click');

    expect(wrapper.emitted()).toHaveProperty('nextPage');
  });

  it('should not emit prevPage nor nextPage event', async () => {
    const wrapper = mount(AppHeader, {
      props: { theme: 'light' },
    });

    await wrapper.find('.pi-arrow-left').trigger('click');
    await wrapper.find('.pi-arrow-right').trigger('click');

    expect(wrapper.emitted()).not.toHaveProperty('prevPage');
    expect(wrapper.emitted()).not.toHaveProperty('nextPage');
  });
});
