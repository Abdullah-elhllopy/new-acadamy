'use client'

import { useState } from 'react'
import { useComments, useAddComment, useDeleteComment } from '@/hooks/api/use-comments'
import { useAuth } from '@/shared/hooks/useAuth'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Skeleton } from '@/components/ui/skeleton'
import { SimpleAvatar } from '@/components/shared/simple-avatar'
import { Trash2 } from 'lucide-react'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { formatDistanceToNow } from 'date-fns'
import { ar } from 'date-fns/locale'

interface CommentsSectionProps {
  articleId: string
}

export function CommentsSection({ articleId }: CommentsSectionProps) {
  const { language } = useLanguage()
  const isArabic = language === 'ar'
  const { isAuthenticated, user } = useAuth()
  const [comment, setComment] = useState('')

  const { data: comments, isLoading } = useComments(articleId)
  const addComment = useAddComment()
  const deleteComment = useDeleteComment()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) return

    await addComment.mutateAsync({ articleId, comment })
    setComment('')
  }

  const handleDelete = (commentId: string) => {
    if (confirm(isArabic ? 'هل تريد حذف هذا التعليق؟' : 'Delete this comment?')) {
      deleteComment.mutate({ articleId, commentId })
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-primary">
        {isArabic ? 'التعليقات' : 'Comments'}
      </h3>

      {isAuthenticated && (
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                placeholder={isArabic ? 'اكتب تعليقك...' : 'Write your comment...'}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                required
                minLength={10}
              />
              <div className="flex justify-end">
                <Button type="submit" disabled={addComment.isPending}>
                  {addComment.isPending
                    ? (isArabic ? 'جاري الإرسال...' : 'Posting...')
                    : (isArabic ? 'إضافة تعليق' : 'Add Comment')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {isLoading ? (
          [...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : !comments || comments.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              {isArabic ? 'لا توجد تعليقات بعد' : 'No comments yet'}
            </CardContent>
          </Card>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <SimpleAvatar
                    src={comment.userAvatar}
                    alt={comment.userName}
                    className="h-12 w-12"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">{comment.userName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(comment.createdAt), {
                            addSuffix: true,
                            locale: isArabic ? ar : undefined,
                          })}
                        </p>
                      </div>
                      {user?.userId === comment.userId && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(comment.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <p className="mt-2 text-muted-foreground">{comment.comment}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
