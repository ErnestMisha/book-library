import { Ref, ref, toValue, watchEffect } from 'vue';

export function useFetch<T>(url: Ref | string) {
  const data = ref<T | null>();

  async function refetch() {
    data.value = null;
    data.value = await fetch(toValue(url)).then((res) => res.json());
  }

  watchEffect(async () => {
    refetch();
  });

  return { data, refetch };
}
