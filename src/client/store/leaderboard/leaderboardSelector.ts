import { useAppSelector } from 'src/client/store/hooks';

export const useLeaderboardSelector = () =>
  useAppSelector((store) => store.leaderboard);
