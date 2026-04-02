import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { trainerReviewService } from '@/services/api';
import { toast } from 'sonner';

export const TRAINER_REVIEW_KEYS = {
  all: ['trainer-reviews'] as const,
  lists: () => [...TRAINER_REVIEW_KEYS.all, 'list'] as const,
  byTrainer: (trainerId: string) => [...TRAINER_REVIEW_KEYS.all, 'trainer', trainerId] as const,
  details: () => [...TRAINER_REVIEW_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...TRAINER_REVIEW_KEYS.details(), id] as const,
};

export function useTrainerReviews() {
  return useQuery({
    queryKey: TRAINER_REVIEW_KEYS.lists(),
    queryFn: () => trainerReviewService.getAll(),
  });
}

export function useTrainerReviewsByTrainerId(trainerId: string) {
  return useQuery({
    queryKey: TRAINER_REVIEW_KEYS.byTrainer(trainerId),
    queryFn: () => trainerReviewService.getByTrainerId(trainerId),
    enabled: !!trainerId,
  });
}

export function useTrainerReview(id: string) {
  return useQuery({
    queryKey: TRAINER_REVIEW_KEYS.detail(id),
    queryFn: () => trainerReviewService.getById(id),
    enabled: !!id,
  });
}

export function useCreateTrainerReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => trainerReviewService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRAINER_REVIEW_KEYS.lists() });
      toast.success('Review submitted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to submit review');
    },
  });
}

export function useUpdateTrainerReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => trainerReviewService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRAINER_REVIEW_KEYS.lists() });
      toast.success('Review updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update review');
    },
  });
}

export function useDeleteTrainerReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => trainerReviewService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRAINER_REVIEW_KEYS.lists() });
      toast.success('Review deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete review');
    },
  });
}
