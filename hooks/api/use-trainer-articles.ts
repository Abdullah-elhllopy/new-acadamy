import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { trainerArticleService } from '@/services/api';
import { toast } from 'sonner';

export const TRAINER_ARTICLE_KEYS = {
  all: ['trainer-articles'] as const,
  lists: () => [...TRAINER_ARTICLE_KEYS.all, 'list'] as const,
  byTrainer: (trainerId: string) => [...TRAINER_ARTICLE_KEYS.all, 'trainer', trainerId] as const,
  details: () => [...TRAINER_ARTICLE_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...TRAINER_ARTICLE_KEYS.details(), id] as const,
};

export function useTrainerArticles() {
  return useQuery({
    queryKey: TRAINER_ARTICLE_KEYS.lists(),
    queryFn: () => trainerArticleService.getAll(),
  });
}

export function useTrainerArticlesByTrainerId(trainerId: string) {
  return useQuery({
    queryKey: TRAINER_ARTICLE_KEYS.byTrainer(trainerId),
    queryFn: () => trainerArticleService.getByTrainerId(trainerId),
    enabled: !!trainerId,
  });
}

export function useTrainerArticle(id: string) {
  return useQuery({
    queryKey: TRAINER_ARTICLE_KEYS.detail(id),
    queryFn: () => trainerArticleService.getById(id),
    enabled: !!id,
  });
}

export function useCreateTrainerArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => trainerArticleService.create(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRAINER_ARTICLE_KEYS.lists() });
      toast.success('Article created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create article');
    },
  });
}

export function useUpdateTrainerArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => trainerArticleService.update(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRAINER_ARTICLE_KEYS.lists() });
      toast.success('Article updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update article');
    },
  });
}

export function useDeleteTrainerArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => trainerArticleService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRAINER_ARTICLE_KEYS.lists() });
      toast.success('Article deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete article');
    },
  });
}
