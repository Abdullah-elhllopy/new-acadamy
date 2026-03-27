import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { requestService, TrainingRequest, BeTrainerRequest, ContactMessage } from '@/services/api';
import { toast } from 'sonner';

export const REQUEST_KEYS = {
  all: ['requests'] as const,
  training: {
    lists: () => [...REQUEST_KEYS.all, 'training', 'list'] as const,
    detail: (id: string) => [...REQUEST_KEYS.all, 'training', 'detail', id] as const,
  },
  beTrainer: {
    lists: () => [...REQUEST_KEYS.all, 'be-trainer', 'list'] as const,
    detail: (id: string) => [...REQUEST_KEYS.all, 'be-trainer', 'detail', id] as const,
  },
  contact: {
    lists: () => [...REQUEST_KEYS.all, 'contact', 'list'] as const,
    detail: (id: string) => [...REQUEST_KEYS.all, 'contact', 'detail', id] as const,
  },
  emailSubscription: {
    lists: () => [...REQUEST_KEYS.all, 'email-subscription', 'list'] as const,
  },
};

export function useTrainingRequests() {
  return useQuery({
    queryKey: REQUEST_KEYS.training.lists(),
    queryFn: () => requestService.getAllTrainingRequests(),
  });
}

export function useTrainingRequest(id: string) {
  return useQuery({
    queryKey: REQUEST_KEYS.training.detail(id),
    queryFn: () => requestService.getTrainingRequestById(id),
    enabled: !!id,
  });
}

export function useCreateTrainingRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TrainingRequest) => requestService.createTrainingRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REQUEST_KEYS.training.lists() });
      toast.success('Training request submitted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to submit training request');
    },
  });
}

export function useUpdateTrainingRequestStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      requestService.updateTrainingRequestStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REQUEST_KEYS.training.lists() });
      toast.success('Request status updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update request status');
    },
  });
}

export function useBeTrainerRequests() {
  return useQuery({
    queryKey: REQUEST_KEYS.beTrainer.lists(),
    queryFn: () => requestService.getAllBeTrainerRequests(),
  });
}

export function useBeTrainerRequest(id: string) {
  return useQuery({
    queryKey: REQUEST_KEYS.beTrainer.detail(id),
    queryFn: () => requestService.getBeTrainerRequestById(id),
    enabled: !!id,
  });
}

export function useCreateBeTrainerRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => requestService.createBeTrainerRequest(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REQUEST_KEYS.beTrainer.lists() });
      toast.success('Trainer application submitted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to submit trainer application');
    },
  });
}

export function useUpdateBeTrainerRequestStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      requestService.updateBeTrainerRequestStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REQUEST_KEYS.beTrainer.lists() });
      toast.success('Request status updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update request status');
    },
  });
}

export function useContactMessages() {
  return useQuery({
    queryKey: REQUEST_KEYS.contact.lists(),
    queryFn: () => requestService.getAllContactMessages(),
  });
}

export function useContactMessage(id: string) {
  return useQuery({
    queryKey: REQUEST_KEYS.contact.detail(id),
    queryFn: () => requestService.getContactMessageById(id),
    enabled: !!id,
  });
}

export function useCreateContactMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ContactMessage) => requestService.createContactMessage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REQUEST_KEYS.contact.lists() });
      toast.success('Message sent successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to send message');
    },
  });
}

export function useEmailSubscriptions() {
  return useQuery({
    queryKey: REQUEST_KEYS.emailSubscription.lists(),
    queryFn: () => requestService.getAllEmailSubscriptions(),
  });
}

export function useCreateEmailSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (email: string) => requestService.createEmailSubscription(email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REQUEST_KEYS.emailSubscription.lists() });
      toast.success('Successfully subscribed to newsletter');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to subscribe');
    },
  });
}
