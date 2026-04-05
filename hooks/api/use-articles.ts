import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { articleService } from '@/services/api';
import { toast } from 'sonner';

export const ARTICLE_KEYS = {
  all: ['articles'] as const,
  lists: () => [...ARTICLE_KEYS.all, 'list'] as const,
  list: (filters?: { search?: string; categoryId?: string }) => 
    [...ARTICLE_KEYS.lists(), filters] as const,
  details: () => [...ARTICLE_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...ARTICLE_KEYS.details(), id] as const,
  byTrainer: (trainerId: string) => [...ARTICLE_KEYS.all, 'trainer', trainerId] as const,

};

export function useArticles(filters?: { search?: string; categoryId?: string }) {
  return useQuery({
    queryKey: ARTICLE_KEYS.list(filters),
    queryFn: () => articleService.getAll(filters),
  });
}

export function useArticle(id: string) {
  return useQuery({
    queryKey: ARTICLE_KEYS.detail(id),
    queryFn: () => articleService.getById(id),
    enabled: !!id,
  });
}
export function useTrainerArticlesByTrainerId(trainerId: string) { //add this on article service
  return useQuery({
    queryKey: ARTICLE_KEYS.byTrainer(trainerId),
    queryFn: () => articleService.getByTrainerId(trainerId),
    enabled: !!trainerId,
  });
}

export function useCreateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => articleService.create(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ARTICLE_KEYS.lists() });
      toast.success('Article created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create article');
    },
  });
}

export function useUpdateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => articleService.update(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ARTICLE_KEYS.lists() });
      toast.success('Article updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update article');
    },
  });
}

export function useDeleteArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => articleService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ARTICLE_KEYS.lists() });
      toast.success('Article deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete article');
    },
  });
}
