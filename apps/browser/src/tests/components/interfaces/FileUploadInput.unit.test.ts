import { mount } from '@vue/test-utils';
import FileUploadInput from '../../../app/components/interfaces/FileUploadInput.vue';

suite('FileUploadInput component', () => {
  it('should not render error paragraph', () => {
    const wrapper = mount(FileUploadInput, {
      props: {
        label: 'test',
      },
    });

    expect(wrapper.find('p').exists()).toBeFalsy();
  });

  it('should render error paragraph', () => {
    const wrapper = mount(FileUploadInput, {
      props: {
        label: 'test',
        error: 'test error',
      },
    });

    expect(wrapper.find('p').text()).toBe('test error');
  });
});
