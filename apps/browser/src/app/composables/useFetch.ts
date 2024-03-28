import { Ref, ref, toValue, watchEffect } from 'vue';

export function useFetch<T>(url: Ref | string) {
  const data = ref<T | null>();

  watchEffect(async () => {
    data.value = null;

    const urlValue = toValue(url);

    data.value = await fetch(urlValue).then((res) => res.json());
  });

  return data;
}
