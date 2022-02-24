import { useAppSelector } from '@store/hooks';

export const useLeaderboardSelector = () =>
  useAppSelector((store) => store.leaderboard);
