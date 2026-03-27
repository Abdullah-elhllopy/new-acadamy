import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { aboutUsService, Value } from '@/services/api';
import { toast } from 'sonner';

export const ABOUT_US_KEYS = {
  all: ['about-us'] as const,
  detail: () => [...ABOUT_US_KEYS.all, 'detail'] as const,
};

export function useAboutUs() {
  return useQuery({
    queryKey: ABOUT_US_KEYS.detail(),
    queryFn: () => aboutUsService.get(),
  });
}

export function useAddAboutUs() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => aboutUsService.add(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ABOUT_US_KEYS.detail() });
      toast.success('About us information added successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to add about us information');
    },
  });
}

export function useUpdateAboutUs() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => aboutUsService.update(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ABOUT_US_KEYS.detail() });
      toast.success('About us information updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update about us information');
    },
  });
}

export function useAddValue() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (value: Value) => aboutUsService.addValue(value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ABOUT_US_KEYS.detail() });
      toast.success('Value added successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to add value');
    },
  });
}
