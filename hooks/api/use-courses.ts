import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { courseService, Course, CourseFilterByCategory, CourseFilterByBool, WWWL, FilteredPagedCoursesRequest } from '@/services/api';
import { toast } from 'sonner';

export const COURSE_KEYS = {
  all: ['courses'] as const,
  lists: () => [...COURSE_KEYS.all, 'list'] as const,
  list: (filters?: unknown) => [...COURSE_KEYS.lists(), filters] as const,
  details: () => [...COURSE_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...COURSE_KEYS.details(), id] as const,
};

export function useCourses() {
  return useQuery({
    queryKey: COURSE_KEYS.lists(),
    queryFn: () => courseService.getAll(),
    // select: (data) => data.allCoursesDetails,
  });
}
export function useCourse(id : string){
  return useQuery({
    queryKey: COURSE_KEYS.detail(id),
    queryFn: () => courseService.getById(id),
    enabled: !!id,
  });

}
export function useCourseForDashboard(id: string) {
  return useQuery({
    queryKey: COURSE_KEYS.detail(id),
    queryFn: () => courseService.getByIdForDashBoard(id),
    enabled: !!id,
  });
}
export function useUserCourses(id: string) {
  return useQuery({
    queryKey: COURSE_KEYS.detail(id),
    queryFn: () => courseService.getCoursesByUserId(id),
    enabled: !!id,
  });
}

export function useCoursesFilterByName(name: string) {
  return useQuery({
    queryKey: [...COURSE_KEYS.lists(), 'filter-name', name],
    queryFn: () => courseService.filterByName(name),
    enabled: !!name,
  });
}

export function useCoursesFilterByCategory(filter: CourseFilterByCategory) {
  return useQuery({
    queryKey: [...COURSE_KEYS.lists(), 'filter-category', filter],
    queryFn: () => courseService.filterByCategory(filter),
    enabled: !!filter.categoryIds?.length,
  });
}

export function useCoursesFilterByBool(filter: CourseFilterByBool, p0?: { enabled: boolean; }) {
  return useQuery({
    queryKey: [...COURSE_KEYS.lists(), 'filter-bool', filter],
    queryFn: () => courseService.filterByBool(filter),
    enabled : p0?.enabled ?? true,
  });
}

export function useCreateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => courseService.create(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COURSE_KEYS.lists() });
      toast.success('Course created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create course');
    },
  });
}

export function useUpdateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ courseId, formData }: { courseId: string; formData: FormData }) =>
      courseService.update(courseId, formData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: COURSE_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: COURSE_KEYS.detail(variables.courseId) });
      toast.success('Course updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update course');
    },
  });
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => courseService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COURSE_KEYS.lists() });
      toast.success('Course deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete course');
    },
  });
}

export function useOnlinePaymentReservation() {
  return useMutation({
    mutationFn: (courseId: string) => courseService.onlinePaymentReservation(courseId),
    onSuccess: (data: { data: { checkoutUrl: string } }) => {
      // Redirect to payment URL
      window.location.href = data.data.checkoutUrl;
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to initiate payment');
    },
  });
}

export function useAddWWWL() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: WWWL) => courseService.addWWWL(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: COURSE_KEYS.detail(variables.courseid) });
      toast.success('Learning outcome added successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to add learning outcome');
    },
  });
}

export function useFilteredPagedCourses(request: FilteredPagedCoursesRequest) {
  return useQuery({
    queryKey: [...COURSE_KEYS.lists(), 'filtered-paged', request],
    queryFn: () => courseService.getFilteredPaged(request),
  });
}

export function useCourseTypes() {
  return useQuery({
    queryKey: [...COURSE_KEYS.all, 'types'],
    queryFn: () => courseService.getCourseTypes(),
    staleTime : Infinity
  });
}
