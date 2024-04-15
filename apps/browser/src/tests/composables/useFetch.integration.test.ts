import { ref } from 'vue';
import { useFetch } from '../../app/composables';
import { flushPromises } from '@vue/test-utils';

suite('useFetch', () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(() => Promise.resolve({ json: vi.fn() })),
  );

  it('should automatically refetch data after url change', async () => {
    const url = ref('sample/1');

    useFetch(url);
    expect(fetch).toHaveBeenCalledOnce();

    url.value = 'sample/2';

    await flushPromises();
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it('should set data to null while fetching', async () => {
    const { data } = useFetch('sample');

    expect(data.value).toBeNull();

    await flushPromises();

    expect(data.value).not.toBeNull();
  });
});
