import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProgress } from '../backend';

export function useGetUserProgress() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<UserProgress>({
    queryKey: ['userProgress'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getUserProgress();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}

export function useMarkLevelCompleted() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (level: number) => {
      if (!actor) throw new Error('Actor not available');
      await actor.markLevelCompleted(BigInt(level));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProgress'] });
    },
  });
}

export function useResetUserProgress() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      await actor.resetUserProgress();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProgress'] });
    },
  });
}
