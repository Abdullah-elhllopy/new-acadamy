import { apiClient } from './client';
import { endpoints } from './config';
import { CaseStudy } from '@/shared/types';

// TODO: Backend endpoints not yet implemented
// Expected: GET/POST/DELETE /api/CaseStudy/*
// Waiting for backend team — do not remove this comment

export const caseStudyService = {
  getAll: async (params?: { industry?: string }): Promise<CaseStudy[]> => {
    let url: string = endpoints.caseStudies.getAll;
    if (params?.industry) {
      url = endpoints.caseStudies.getByIndustry(params.industry);
    }
    return apiClient.get<CaseStudy[]>(url);
  },

  getById: async (id: string): Promise<CaseStudy> => {
    return apiClient.get<CaseStudy>(endpoints.caseStudies.getById(id));
  },

  create: async (formData: FormData): Promise<CaseStudy> => {
    return apiClient.postFormData<CaseStudy>(endpoints.caseStudies.create, formData);
  },

  update: async (formData: FormData): Promise<CaseStudy> => {
    return apiClient.postFormData<CaseStudy>(endpoints.caseStudies.update, formData);
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.get(endpoints.caseStudies.delete(id));
  },
};
