import { apiClient } from './client';
import { endpoints } from './config';

export interface TrainingRequest {
  requestId?: string;
  fullName: string;
  email: string;
  phone: string;
  courseId: string;
  organizationName?: string;
  numberOfTrainees?: number;
  message?: string;
  status?: 'pending' | 'approved' | 'rejected';
  createdAt?: string;
}

export interface BeTrainerRequest {
  requestId?: string;
  fullName: string;
  email: string;
  phone: string;
  specialization: string;
  experience: number;
  cvFile?: File;
  imageFile?: File;
  linkedin?: string;
  message?: string;
  status?: 'pending' | 'approved' | 'rejected';
  createdAt?: string;
}

export interface ContactMessage {
  messageId?: string;
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt?: string;
}

export interface EmailSubscription {
  subscriptionId?: string;
  email: string;
  createdAt?: string;
}

class RequestService {
  async getAllTrainingRequests(): Promise<TrainingRequest[]> {
    return apiClient.get<TrainingRequest[]>(endpoints.requests.training.getAll);
  }

  async getTrainingRequestById(id: string): Promise<TrainingRequest> {
    return apiClient.get<TrainingRequest>(endpoints.requests.training.getById(id));
  }

  async createTrainingRequest(data: TrainingRequest): Promise<TrainingRequest> {
    return apiClient.post<TrainingRequest>(endpoints.requests.training.create, data);
  }

  async updateTrainingRequestStatus(id: string, status: string): Promise<void> {
    return apiClient.post<void>(endpoints.requests.training.updateStatus, { id, status });
  }

  async getAllBeTrainerRequests(): Promise<BeTrainerRequest[]> {
    return apiClient.get<BeTrainerRequest[]>(endpoints.requests.beTrainer.getAll);
  }

  async getBeTrainerRequestById(id: string): Promise<BeTrainerRequest> {
    return apiClient.get<BeTrainerRequest>(endpoints.requests.beTrainer.getById(id));
  }

  async createBeTrainerRequest(formData: FormData): Promise<BeTrainerRequest> {
    return apiClient.postFormData<BeTrainerRequest>(endpoints.requests.beTrainer.create, formData);
  }

  async updateBeTrainerRequestStatus(id: string, status: string): Promise<void> {
    return apiClient.post<void>(endpoints.requests.beTrainer.updateStatus, { id, status });
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    return apiClient.get<ContactMessage[]>(endpoints.requests.contact.getAll);
  }

  async getContactMessageById(id: string): Promise<ContactMessage> {
    return apiClient.get<ContactMessage>(endpoints.requests.contact.getById(id));
  }

  async createContactMessage(data: ContactMessage): Promise<ContactMessage> {
    return apiClient.post<ContactMessage>(endpoints.requests.contact.create, data);
  }

  async getAllEmailSubscriptions(): Promise<EmailSubscription[]> {
    return apiClient.get<EmailSubscription[]>(endpoints.requests.emailSubscription.getAll);
  }

  async createEmailSubscription(email: string): Promise<EmailSubscription> {
    return apiClient.post<EmailSubscription>(endpoints.requests.emailSubscription.create, { email });
  }
}

export const requestService = new RequestService();
