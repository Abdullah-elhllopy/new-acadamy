import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { lectureService } from '@/services/api/lecture.service';
import { toast } from 'sonner';

export const LECTURE_KEYS = {
  all: ['lectures'] as const,
  lists: () => [...LECTURE_KEYS.all, 'list'] as const,
  details: () => [...LECTURE_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...LECTURE_KEYS.details(), id] as const,
  courseWithLectures: (courseId: string) => [...LECTURE_KEYS.all, 'course', courseId] as const,
  byChapter: (chapterId: string) => [...LECTURE_KEYS.all, 'chapter', chapterId] as const,
  comments: (lectureId: string) => [...LECTURE_KEYS.all, 'comments', lectureId] as const,
  topics: (lectureId: string) => [...LECTURE_KEYS.all, 'topics', lectureId] as const,
};

export function useLectures() {
  return useQuery({
    queryKey: LECTURE_KEYS.lists(),
    queryFn: () => lectureService.getAll(),
  });
}

export function useLecture(id: string) {
  return useQuery({
    queryKey: LECTURE_KEYS.detail(id),
    queryFn: () => lectureService.getById(id),
    enabled: !!id,
  });
}

export function useCourseWithLectures(courseId: string) {
  return useQuery({
    queryKey: LECTURE_KEYS.courseWithLectures(courseId),
    queryFn: () => lectureService.getCourseWithLectures(courseId),
    enabled: !!courseId,
  });
}

export function useLecturesByChapter(chapterId: string) {
  return useQuery({
    queryKey: LECTURE_KEYS.byChapter(chapterId),
    queryFn: () => lectureService.getLecturesByChapter(chapterId),
    enabled: !!chapterId,
  });
}

export function useCreateLecture() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => lectureService.createLecture(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LECTURE_KEYS.all });
      toast.success('Lecture created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create lecture');
    },
  });
}

export function useCreateChapter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => lectureService.createChapter(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LECTURE_KEYS.all });
      toast.success('Chapter created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create chapter');
    },
  });
}

export function useRemoveLectureFromCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { courseId: string; lectureId: string }) =>
      lectureService.removeLectureFromCourse(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LECTURE_KEYS.all });
      toast.success('Lecture removed successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to remove lecture');
    },
  });
}

export function useDeleteLecture() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => lectureService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LECTURE_KEYS.all });
      toast.success('Lecture deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete lecture');
    },
  });
}

// Comments
export function useLectureComments(lectureId: string) {
  return useQuery({
    queryKey: LECTURE_KEYS.comments(lectureId),
    queryFn: () => lectureService.getCommentsByLecture(lectureId),
    enabled: !!lectureId,
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => lectureService.deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...LECTURE_KEYS.all, 'comments'] });
      toast.success('Comment deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete comment');
    },
  });
}

// Topics
export function useLectureTopics(lectureId: string) {
  return useQuery({
    queryKey: LECTURE_KEYS.topics(lectureId),
    queryFn: () => lectureService.getTopicsByLecture(lectureId),
    enabled: !!lectureId,
  });
}

export function useDeleteTopic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => lectureService.deleteTopic(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...LECTURE_KEYS.all, 'topics'] });
      toast.success('Topic deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete topic');
    },
  });
}

// Questions
export function useCreateQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => lectureService.createQuestion(formData),
    onSuccess: () => {
      toast.success('Question created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create question');
    },
  });
}
