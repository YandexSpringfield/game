import { useAppSelector } from '@store/hooks';

export const useUserSelector = () => useAppSelector((store) => store.user);
export const useUserThemeSelector = () =>
  useAppSelector((store) => store.user.theme);
