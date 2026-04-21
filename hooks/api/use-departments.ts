import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { departmentService } from '@/services/api';
import { toast } from 'sonner';

export const DEPARTMENT_KEYS = {
  all: ['departments'] as const,
  main: {
    lists: () => [...DEPARTMENT_KEYS.all, 'main', 'list'] as const,
    details: () => [...DEPARTMENT_KEYS.all, 'main', 'detail'] as const,
    detail: (id: string) => [...DEPARTMENT_KEYS.main.details(), id] as const,
  },
  sub: {
    lists: () => [...DEPARTMENT_KEYS.all, 'sub', 'list'] as const,
    byMain: (mainId: string) => [...DEPARTMENT_KEYS.all, 'sub', 'by-main', mainId] as const,
    details: () => [...DEPARTMENT_KEYS.all, 'sub', 'detail'] as const,
    detail: (id: string) => [...DEPARTMENT_KEYS.sub.details(), id] as const,
  },
};

export function useMainDepartments() {
  return useQuery({
    queryKey: DEPARTMENT_KEYS.main.lists(),
    queryFn: () => departmentService.getAllMain(),
  });
}

export function useMainDepartment(id: string) {
  return useQuery({
    queryKey: DEPARTMENT_KEYS.main.detail(id),
    queryFn: () => departmentService.getMainById(id),
    enabled: !!id,
  });
}

export function useMainDepartmentDashboard(id: string) {
  return useQuery({
    queryKey: [...DEPARTMENT_KEYS.main.detail(id), 'dashboard'],
    queryFn: () => departmentService.getMainByIdDashboard(id),
    enabled: !!id,
  });
}

export function useSubDepartments() {
  return useQuery({
    queryKey: DEPARTMENT_KEYS.sub.lists(),
    queryFn: () => departmentService.getAllSub(),
  });
}

export function useSubDepartment(id: string) {
  return useQuery({
    queryKey: DEPARTMENT_KEYS.sub.detail(id),
    queryFn: () => departmentService.getSubById(id),
    enabled: !!id,
  });
}

export function useSubDepartmentDashboard(id: string) {
  return useQuery({
    queryKey: [...DEPARTMENT_KEYS.sub.detail(id), 'dashboard'],
    queryFn: () => departmentService.getSubByIdDashboard(id),
    enabled: !!id,
  });
}

export function useSubDepartmentsByMain(mainId: string) {
  return useQuery({
    queryKey: DEPARTMENT_KEYS.sub.byMain(mainId),
    queryFn: () => departmentService.getSubByMainId(mainId),
    enabled: !!mainId,
  });
}

export function useCreateMainDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: any) => departmentService.createMain(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DEPARTMENT_KEYS.main.lists() });
      toast.success('Main department created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create main department');
    },
  });
}

export function useUpdateMainDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => departmentService.updateMain(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DEPARTMENT_KEYS.main.lists() });
      toast.success('Main department updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update main department');
    },
  });
}

export function useDeleteMainDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => departmentService.deleteMain(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DEPARTMENT_KEYS.main.lists() });
      toast.success('Main department deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete main department');
    },
  });
}

export function useCreateSubDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: any) => departmentService.createSub(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DEPARTMENT_KEYS.sub.lists() });
      queryClient.invalidateQueries({ queryKey: [...DEPARTMENT_KEYS.all, 'sub', 'by-main'] });
      toast.success('Sub department created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create sub department');
    },
  });
}

export function useUpdateSubDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => departmentService.updateSub(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DEPARTMENT_KEYS.sub.lists() });
      queryClient.invalidateQueries({ queryKey: [...DEPARTMENT_KEYS.all, 'sub', 'by-main'] });
      toast.success('Sub department updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update sub department');
    },
  });
}

export function useDeleteSubDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => departmentService.deleteSub(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DEPARTMENT_KEYS.sub.lists() });
      queryClient.invalidateQueries({ queryKey: [...DEPARTMENT_KEYS.all, 'sub', 'by-main'] });
      toast.success('Sub department deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete sub department');
    },
  });
}
