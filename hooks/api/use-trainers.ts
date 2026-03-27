import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { trainerService } from '@/services/api';
import { toast } from 'sonner';

export const TRAINER_KEYS = {
  all: ['trainers'] as const,
  lists: () => [...TRAINER_KEYS.all, 'list'] as const,
  details: () => [...TRAINER_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...TRAINER_KEYS.details(), id] as const,
};

export function useTrainers() {
  return useQuery({
    queryKey: TRAINER_KEYS.lists(),
    queryFn: () => trainerService.getAll(),
  });
}

export function useTrainer(id: string) {
  return useQuery({
    queryKey: TRAINER_KEYS.detail(id),
    queryFn: () => trainerService.getById(id),
    enabled: !!id,
  });
}

export function useCreateTrainer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => trainerService.create(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRAINER_KEYS.lists() });
      toast.success('Trainer created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create trainer');
    },
  });
}

export function useUpdateTrainer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => trainerService.update(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRAINER_KEYS.lists() });
      toast.success('Trainer updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update trainer');
    },
  });
}

export function useDeleteTrainer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => trainerService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRAINER_KEYS.lists() });
      toast.success('Trainer deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete trainer');
    },
  });
}
