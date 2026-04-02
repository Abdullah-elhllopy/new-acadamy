import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { commentService } from '@/services/api';
import { toast } from 'sonner';

export const COMMENT_KEYS = {
  all: ['comments'] as const,
  byArticle: (articleId: string) => [...COMMENT_KEYS.all, 'article', articleId] as const,
};

export function useComments(articleId: string) {
  return useQuery({
    queryKey: COMMENT_KEYS.byArticle(articleId),
    queryFn: () => commentService.getByArticleId(articleId),
    enabled: !!articleId,
  });
}

export function useAddComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ articleId, comment }: { articleId: string; comment: string }) =>
      commentService.create(articleId, { comment }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: COMMENT_KEYS.byArticle(variables.articleId) });
      toast.success('Comment added successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to add comment');
    },
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ articleId, commentId }: { articleId: string; commentId: string }) =>
      commentService.delete(articleId, commentId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: COMMENT_KEYS.byArticle(variables.articleId) });
      toast.success('Comment deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete comment');
    },
  });
}
