import { useAppSelector } from '@store/hooks';

export const useUserSelector = () => useAppSelector((store) => store.user);
