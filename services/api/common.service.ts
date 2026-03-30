import { apiClient } from './client';
import { endpoints } from './config';

export interface Partner {
  id?: string;
  name: string;
  image?: string;
  link?: string;
  isActive?: boolean;
}

export interface TeamMember {
  id?: string;
  name: string;
  job: string;
  image?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  linkedIn?: string | null;
}

export interface Slider {
  id:number ,
  title:string,
  description:string,
  imageFile:string | null,
  image:string | null
}

export interface ImageGroup {
  imageGroupId?: string;
  groupName: string;
  groupDescription?: string;
  groupImage?: string;
  createdAt?: string;
  numberOfImages ?: number;
}

export interface Image {
  createdAt?: string;
  imageFile?: null | File; 
  imageGroupId ?: string;
  imageId ?: string;
  imageSrc ?: string;
  text : string;
}
export interface GroupImageDetails {
  groubName: string;
  images: Image[];
}
class PartnerService {
  async getAll(): Promise<Partner[]> {
    return apiClient.get<Partner[]>(endpoints.partners.getAll);
  }

  async getById(id: string): Promise<Partner> {
    return apiClient.get<Partner>(endpoints.partners.getById(id));
  }

  async create(formData: FormData): Promise<Partner> {
    return apiClient.postFormData<Partner>(endpoints.partners.create, formData);
  }

  async update(formData: FormData): Promise<Partner> {
    return apiClient.postFormData<Partner>(endpoints.partners.update, formData);
  }

  async delete(id: string): Promise<void> {
    return apiClient.delete<void>(endpoints.partners.delete(id));
  }
}

class TeamService {
  async getAll(): Promise<TeamMember[]> {
    return apiClient.get<TeamMember[]>(endpoints.members.getAll);
  }

  async getById(id: string): Promise<TeamMember> {
    return apiClient.get<TeamMember>(endpoints.members.getById(id));
  }

  async create(formData: FormData): Promise<TeamMember> {
    return apiClient.postFormData<TeamMember>(endpoints.members.create, formData);
  }

  async update(formData: FormData): Promise<TeamMember> {
    return apiClient.postFormData<TeamMember>(endpoints.members.update, formData);
  }

  async delete(id: string): Promise<void> {
    return apiClient.delete<void>(endpoints.members.delete(id));
  }
}

class SliderService {
  async getAll(): Promise<Slider[]> {
    return apiClient.get<Slider[]>(endpoints.sliders.getAll);
  }

  async getById(id: string): Promise<Slider> {
    return apiClient.get<Slider>(endpoints.sliders.getById(id));
  }

  async create(formData: FormData): Promise<Slider> {
    return apiClient.postFormData<Slider>(endpoints.sliders.create, formData);
  }

  async update(formData: FormData): Promise<Slider> {
    return apiClient.postFormData<Slider>(endpoints.sliders.update, formData);
  }

  async delete(id: string): Promise<void> {
    return apiClient.get<void>(endpoints.sliders.delete(id));
  }
}

class ImagesCenterService {
  async getAllGroups(): Promise<ImageGroup[]> {
    return apiClient.get<ImageGroup[]>(endpoints.imagesCenter.groups.getAll);
  }

  async getGroupById(id: string): Promise<ImageGroup> {
    return apiClient.get<ImageGroup>(endpoints.imagesCenter.groups.getById(id));
  }

  async createGroup(formData: FormData): Promise<ImageGroup> {
    return apiClient.postFormData<ImageGroup>(endpoints.imagesCenter.groups.create, formData);
  }

  async updateGroup(formData: FormData): Promise<ImageGroup> {
    return apiClient.postFormData<ImageGroup>(endpoints.imagesCenter.groups.update, formData);
  }

  async deleteGroup(id: string): Promise<void> {
    return apiClient.delete<void>(endpoints.imagesCenter.groups.delete(id));
  }

  async getAllImages(): Promise<Image[]> {
    return apiClient.get<Image[]>(endpoints.imagesCenter.images.getAll);
  }

  async getImagesByGroupId(groupId: string): Promise<GroupImageDetails> {
    return apiClient.get<GroupImageDetails>(endpoints.imagesCenter.images.getByGroupId(groupId));
  }

  async createImage(formData: FormData): Promise<Image> {
    return apiClient.postFormData<Image>(endpoints.imagesCenter.images.create, formData);
  }

  async deleteImage(id: string): Promise<void> {
    return apiClient.delete<void>(endpoints.imagesCenter.images.delete(id));
  }
}

export const partnerService = new PartnerService();
export const teamService = new TeamService();
export const sliderService = new SliderService();
export const imagesCenterService = new ImagesCenterService();
