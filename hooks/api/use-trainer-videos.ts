// import { useMutation, useQuery, useQueryClient } from '@tantml:react-query';
import { trainerVideoService } from '@/services/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const TRAINER_VIDEO_KEYS = {
  all: ['trainer-videos'] as const,
  lists: () => [...TRAINER_VIDEO_KEYS.all, 'list'] as const,
  byTrainer: (trainerId: string) => [...TRAINER_VIDEO_KEYS.all, 'trainer', trainerId] as const,
  details: () => [...TRAINER_VIDEO_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...TRAINER_VIDEO_KEYS.details(), id] as const,
};

export function useTrainerVideos() {
  return useQuery({
    queryKey: TRAINER_VIDEO_KEYS.lists(),
    queryFn: () => trainerVideoService.getAll(),
  });
}

export function useTrainerVideosByTrainerId(trainerId: string) {
  return useQuery({
    queryKey: TRAINER_VIDEO_KEYS.byTrainer(trainerId),
    queryFn: () => trainerVideoService.getByTrainerId(trainerId),
    enabled: !!trainerId,
  });
}

export function useTrainerVideo(id: string) {
  return useQuery({
    queryKey: TRAINER_VIDEO_KEYS.detail(id),
    queryFn: () => trainerVideoService.getById(id),
    enabled: !!id,
  });
}

export function useCreateTrainerVideo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => trainerVideoService.create(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRAINER_VIDEO_KEYS.lists() });
      toast.success('Video created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create video');
    },
  });
}

export function useUpdateTrainerVideo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => trainerVideoService.update(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRAINER_VIDEO_KEYS.lists() });
      toast.success('Video updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update video');
    },
  });
}

export function useDeleteTrainerVideo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => trainerVideoService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRAINER_VIDEO_KEYS.lists() });
      toast.success('Video deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete video');
    },
  });
}
