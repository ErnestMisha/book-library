import { mount } from '@vue/test-utils';
import App from '../app/app.vue';

suite('App component', () => {
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({
      matches: false,
    }))
  );

  it('should set localStorage theme item', async () => {
    const wrapper = mount(App);

    await wrapper.find('#theme-button').trigger('click');

    expect(window.localStorage.getItem('theme')).toBe('dark');
  });
});
