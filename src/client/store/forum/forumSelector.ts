import { useAppSelector } from '@store';

export const useForumSelector = () => useAppSelector((store) => store.forum);
