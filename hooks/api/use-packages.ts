import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PackageService, type PackageFormData } from '@/services/api/package.service';
import { toast } from 'sonner';

export const usePackages = () => {
  return useQuery({
    queryKey: ['packages'],
    queryFn: () => PackageService.getAll(),
  });
};

export const useCreatePackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PackageFormData) => PackageService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      toast.success('Package created successfully');
    },
    onError: () => {
      toast.error('Failed to create package');
    },
  });
};

export const useDeletePackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => PackageService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      toast.success('Package deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete package');
    },
  });
};
