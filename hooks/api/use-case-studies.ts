import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { caseStudyService } from '@/services/api';
import { toast } from 'sonner';

export const CASE_STUDY_KEYS = {
  all: ['case-studies'] as const,
  lists: () => [...CASE_STUDY_KEYS.all, 'list'] as const,
  list: (filters?: { industry?: string }) => [...CASE_STUDY_KEYS.lists(), filters] as const,
  details: () => [...CASE_STUDY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...CASE_STUDY_KEYS.details(), id] as const,
};

export function useCaseStudies(filters?: { industry?: string }) {
  return useQuery({
    queryKey: CASE_STUDY_KEYS.list(filters),
    queryFn: () => caseStudyService.getAll(filters),
  });
}

export function useCaseStudy(id: string) {
  return useQuery({
    queryKey: CASE_STUDY_KEYS.detail(id),
    queryFn: () => caseStudyService.getById(id),
    enabled: !!id,
  });
}

export function useCreateCaseStudy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => caseStudyService.create(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CASE_STUDY_KEYS.lists() });
      toast.success('Case study created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create case study');
    },
  });
}

export function useUpdateCaseStudy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => caseStudyService.update(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CASE_STUDY_KEYS.lists() });
      toast.success('Case study updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update case study');
    },
  });
}

export function useDeleteCaseStudy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => caseStudyService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CASE_STUDY_KEYS.lists() });
      toast.success('Case study deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete case study');
    },
  });
}
