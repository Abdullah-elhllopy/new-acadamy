import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { articleCategoryService } from '@/services/api';
import { toast } from 'sonner';

export const ARTICLE_CATEGORY_KEYS = {
  all: ['article-categories'] as const,
  lists: () => [...ARTICLE_CATEGORY_KEYS.all, 'list'] as const,
  details: () => [...ARTICLE_CATEGORY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...ARTICLE_CATEGORY_KEYS.details(), id] as const,
};

export function useArticleCategories() {
  return useQuery({
    queryKey: ARTICLE_CATEGORY_KEYS.lists(),
    queryFn: () => articleCategoryService.getAll(),
  });
}

export function useArticleCategory(id: string) {
  return useQuery({
    queryKey: ARTICLE_CATEGORY_KEYS.detail(id),
    queryFn: () => articleCategoryService.getById(id),
    enabled: !!id,
  });
}

export function useCreateArticleCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => articleCategoryService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ARTICLE_CATEGORY_KEYS.lists() });
      toast.success('Category created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create category');
    },
  });
}

export function useUpdateArticleCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => articleCategoryService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ARTICLE_CATEGORY_KEYS.lists() });
      toast.success('Category updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update category');
    },
  });
}

export function useDeleteArticleCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => articleCategoryService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ARTICLE_CATEGORY_KEYS.lists() });
      toast.success('Category deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete category');
    },
  });
}
