import { VueWrapper, mount } from '@vue/test-utils';
import LabeledInput from '../../../app/components/interfaces/LabeledInput.vue';

suite('LabeledInput component', () => {
  it('should not render error paragraph', () => {
    const wrapper = mount(LabeledInput, {
      props: {
        label: 'test',
      },
    });

    expect(wrapper.find('p').exists()).toBeFalsy();
  });

  it('should render error paragraph', () => {
    const wrapper = mount(LabeledInput, {
      props: {
        label: 'test',
        error: 'test error',
      },
    });

    expect(wrapper.find('p').text()).toBe('test error');
  });

  it('should update parent v-model value to array', async () => {
    const wrapper = mount(LabeledInput, {
      props: {
        label: 'test',
        modelValue: null,
        modelModifiers: { array: true },
        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
      },
    }) as VueWrapper<any>;

    await wrapper.find('input').setValue('test, elements, sth');

    expect(wrapper.props('modelValue')).toMatchObject([
      'test',
      'elements',
      'sth',
    ]);
  });

  it('should update parent v-model value to number', async () => {
    const wrapper = mount(LabeledInput, {
      props: {
        label: 'test',
        modelValue: null,
        modelModifiers: { number: true },
        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
      },
    }) as VueWrapper<any>;

    await wrapper.find('input').setValue('123-456-789');

    expect(wrapper.props('modelValue')).toBe(123456789);
  });
});
