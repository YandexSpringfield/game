import { useAppSelector } from 'src/client/store/hooks';

export const useUserSelector = () => useAppSelector((store) => store.user);
