import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ratingService } from '@/services/api';
import { toast } from 'sonner';

export const RATING_KEYS = {
  all: ['ratings'] as const,
  byArticle: (articleId: string) => [...RATING_KEYS.all, 'article', articleId] as const,
};

export function useArticleRating(articleId: string) {
  return useQuery({
    queryKey: RATING_KEYS.byArticle(articleId),
    queryFn: () => ratingService.getByArticleId(articleId),
    enabled: !!articleId,
  });
}

export function useRateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ articleId, rating }: { articleId: string; rating: number }) =>
      ratingService.rate(articleId, rating),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: RATING_KEYS.byArticle(variables.articleId) });
      toast.success('Rating submitted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to submit rating');
    },
  });
}
