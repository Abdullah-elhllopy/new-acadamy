import { apiClient } from './client';
import { endpoints } from './config';

export interface AboutUs {
  id?: string;
  phone: string;
  email: string;
  aboutUs: string;
  pdf?: string;
  name: string;
  image?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  link?: string;
  instgram?: string;
  ourVision?: string;
  ourMessage?: string;
  workingFrom?: number;
  workingTo?: number;
  address: string;
  workingHours?: string;
  ourValues?: OurValue[];
}

export interface OurValue {
  id:number;
  title: string;
  description: string;
}

class AboutUsService {
  async get(): Promise<AboutUs> {
    return apiClient.get<AboutUs>(endpoints.aboutUs.get);
  }

  async add(formData: FormData): Promise<AboutUs> {
    return apiClient.postFormData<AboutUs>(endpoints.aboutUs.add, formData);
  }

  async update(formData: FormData): Promise<AboutUs> {
    return apiClient.postFormData<AboutUs>(endpoints.aboutUs.update, formData);
  }

  async addValue(value: OurValue): Promise<void> {
    const formData = new FormData();
    if (value.title) formData.append('Title', value.title);
    if (value.description) formData.append('Description', value.description);
    return apiClient.postFormData<void>(endpoints.aboutUs.addValue, formData);
  }
}

export const aboutUsService = new AboutUsService();
