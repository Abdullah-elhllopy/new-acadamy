import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { partnerService, teamService, sliderService, imagesCenterService } from '@/services/api';
import { toast } from 'sonner';

export const PARTNER_KEYS = {
  all: ['partners'] as const,
  lists: () => [...PARTNER_KEYS.all, 'list'] as const,
  detail: (id: string) => [...PARTNER_KEYS.all, 'detail', id] as const,
};

export const TEAM_KEYS = {
  all: ['team'] as const,
  lists: () => [...TEAM_KEYS.all, 'list'] as const,
  detail: (id: string) => [...TEAM_KEYS.all, 'detail', id] as const,
};

export const SLIDER_KEYS = {
  all: ['sliders'] as const,
  lists: () => [...SLIDER_KEYS.all, 'list'] as const,
  detail: (id: string) => [...SLIDER_KEYS.all, 'detail', id] as const,
};

export const IMAGES_CENTER_KEYS = {
  all: ['images-center'] as const,
  groups: {
    lists: () => [...IMAGES_CENTER_KEYS.all, 'groups', 'list'] as const,
    detail: (id: string) => [...IMAGES_CENTER_KEYS.all, 'groups', 'detail', id] as const,
  },
  images: {
    lists: () => [...IMAGES_CENTER_KEYS.all, 'images', 'list'] as const,
    byGroup: (groupId: string) => [...IMAGES_CENTER_KEYS.all, 'images', 'by-group', groupId] as const,
  },
};

// Partners
export function usePartners() {
  return useQuery({
    queryKey: PARTNER_KEYS.lists(),
    queryFn: () => partnerService.getAll(),
  });
}

export function usePartner(id: string) {
  return useQuery({
    queryKey: PARTNER_KEYS.detail(id),
    queryFn: () => partnerService.getById(id),
    enabled: !!id,
  });
}

export function useCreatePartner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => partnerService.create(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PARTNER_KEYS.lists() });
      toast.success('Partner created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create partner');
    },
  });
}

export function useUpdatePartner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => partnerService.update(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PARTNER_KEYS.lists() });
      toast.success('Partner updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update partner');
    },
  });
}

export function useDeletePartner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => partnerService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PARTNER_KEYS.lists() });
      toast.success('Partner deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete partner');
    },
  });
}

// Team
export function useTeamMembers() {
  return useQuery({
    queryKey: TEAM_KEYS.lists(),
    queryFn: () => teamService.getAll(),
  });
}

export function useTeamMember(id: string) {
  return useQuery({
    queryKey: TEAM_KEYS.detail(id),
    queryFn: () => teamService.getById(id),
    enabled: !!id,
  });
}

export function useCreateTeamMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => teamService.create(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEAM_KEYS.lists() });
      toast.success('Team member created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create team member');
    },
  });
}

export function useUpdateTeamMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => teamService.update(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEAM_KEYS.lists() });
      toast.success('Team member updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update team member');
    },
  });
}

export function useDeleteTeamMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => teamService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEAM_KEYS.lists() });
      toast.success('Team member deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete team member');
    },
  });
}

// Sliders
export function useSliders() {
  return useQuery({
    queryKey: SLIDER_KEYS.lists(),
    queryFn: () => sliderService.getAll(),
  });
}

export function useSlider(id: string) {
  return useQuery({
    queryKey: SLIDER_KEYS.detail(id),
    queryFn: () => sliderService.getById(id),
    enabled: !!id,
  });
}

export function useCreateSlider() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => sliderService.create(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SLIDER_KEYS.lists() });
      toast.success('Slider created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create slider');
    },
  });
}

export function useUpdateSlider() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => sliderService.update(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SLIDER_KEYS.lists() });
      toast.success('Slider updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update slider');
    },
  });
}

export function useDeleteSlider() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => sliderService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SLIDER_KEYS.lists() });
      toast.success('Slider deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete slider');
    },
  });
}

// Images Center
export function useImageGroups() {
  return useQuery({
    queryKey: IMAGES_CENTER_KEYS.groups.lists(),
    queryFn: () => imagesCenterService.getAllGroups(),
  });
}

export function useImageGroup(id: string) {
  return useQuery({
    queryKey: IMAGES_CENTER_KEYS.groups.detail(id),
    queryFn: () => imagesCenterService.getGroupById(id),
    enabled: !!id,
  });
}

export function useImagesByGroup(groupId: string) {
  return useQuery({
    queryKey: IMAGES_CENTER_KEYS.images.byGroup(groupId),
    queryFn: () => imagesCenterService.getImagesByGroupId(groupId),
    enabled: !!groupId,
  });
}

export function useCreateImageGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => imagesCenterService.createGroup(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: IMAGES_CENTER_KEYS.groups.lists() });
      toast.success('Image group created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create image group');
    },
  });
}

export function useUpdateImageGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => imagesCenterService.updateGroup(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: IMAGES_CENTER_KEYS.groups.lists() });
      toast.success('Image group updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update image group');
    },
  });
}

export function useDeleteImageGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => imagesCenterService.deleteGroup(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: IMAGES_CENTER_KEYS.groups.lists() });
      toast.success('Image group deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete image group');
    },
  });
}

export function useCreateImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => imagesCenterService.createImage(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: IMAGES_CENTER_KEYS.images.lists() });
      toast.success('Image uploaded successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to upload image');
    },
  });
}

export function useDeleteImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => imagesCenterService.deleteImage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: IMAGES_CENTER_KEYS.images.lists() });
      toast.success('Image deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete image');
    },
  });
}
