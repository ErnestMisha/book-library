import { nextTick } from 'vue';
import { useTheme } from '../../app/composables';

suite('useTheme', () => {
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({
      matches: false,
    })),
  );

  it('should set localStorage theme item', async () => {
    const { theme, changeTheme } = useTheme();

    expect(window.localStorage).toHaveLength(0);
    changeTheme('dark');
    await nextTick();
    expect(window.localStorage.getItem('theme')).toBe('dark');
  });
});
