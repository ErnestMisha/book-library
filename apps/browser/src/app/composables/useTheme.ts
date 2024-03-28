import { ref, watch } from 'vue';

export function useTheme() {
  const theme = ref<'light' | 'dark'>(
    (localStorage.getItem('theme') as 'light' | 'dark') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'),
  );

  watch(theme, () => {
    localStorage.setItem('theme', theme.value);
  });

  function changeTheme(newTheme: 'light' | 'dark') {
    theme.value = newTheme;
  }

  return { theme, changeTheme };
}
