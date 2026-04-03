import { apiClient } from './client';
import { endpoints } from './config';
import { TrainerVideo } from '@/shared/types';

// TODO: Backend endpoints not yet implemented
// Waiting for backend team — do not remove this comment

// MOCK DATA - Remove when backend is ready
const MOCK_VIDEOS: TrainerVideo[] = [
  {
    id: 'video-001',
    trainerId: 'trainer-001',
    titleEn: 'Introduction to TypeScript',
    titleAr: 'مقدمة في تايب سكريبت',
    descriptionEn: 'Learn the basics of TypeScript',
    descriptionAr: 'تعلم أساسيات تايب سكريبت',
    videoUrl: 'https://example.com/video1.mp4',
    thumbnail: '/thumbnails/video1.jpg',
    duration: 1800,
    views: 150,
    published: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'video-002',
    trainerId: 'trainer-001',
    titleEn: 'Advanced React Patterns',
    titleAr: 'أنماط ريأكت المتقدمة',
    descriptionEn: 'Master advanced React patterns',
    descriptionAr: 'إتقان أنماط ريأكت المتقدمة',
    videoUrl: 'https://example.com/video2.mp4',
    thumbnail: '/thumbnails/video2.jpg',
    duration: 2400,
    views: 230,
    published: true,
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10'),
  },
];

export const trainerVideoService = {
  getAll: async (): Promise<TrainerVideo[]> => {
    // const response : TrainerVideo[] = await apiClient.get(endpoints.trainers.videos.getAll);
    // return response;
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_VIDEOS;
  },

  getByTrainerId: async (trainerId: string): Promise<TrainerVideo[]> => {
    // const response : TrainerVideo[]   = await apiClient.get(endpoints.trainers.videos.getByTrainerId(trainerId));
    // return response;
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_VIDEOS;
  },

  getById: async (id: string): Promise<TrainerVideo> => {
    // const response : TrainerVideo = await apiClient.get(`${endpoints.trainers.videos.getAll}/${id}`);
    // return response;
    await new Promise(resolve => setTimeout(resolve, 300));
    const video = MOCK_VIDEOS.find(v => v.id === 'video-001');
    if (!video) throw new Error('Video not found');
    return video;
  },

  create: async (formData: FormData): Promise<TrainerVideo> => {
    // const response : TrainerVideo = await apiClient.postFormData(endpoints.trainers.videos.create, formData);
    // return response;
    await new Promise(resolve => setTimeout(resolve, 500));
    const newVideo: TrainerVideo = {
      id: `video-${Date.now()}`,
      trainerId: formData.get('trainerId') as string || 'trainer-001',
      titleEn: formData.get('titleEn') as string || 'New Video',
      titleAr: formData.get('titleAr') as string || 'فيديو جديد',
      descriptionEn: formData.get('descriptionEn') as string,
      descriptionAr: formData.get('descriptionAr') as string,
      videoUrl: 'https://example.com/new-video.mp4',
      thumbnail: '/thumbnails/default.jpg',
      duration: 0,
      views: 0,
      published: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    MOCK_VIDEOS.push(newVideo);
    return newVideo;
  },

  update: async (formData: FormData): Promise<TrainerVideo> => {
    // const response : TrainerVideo = await apiClient.postFormData(endpoints.trainers.videos.update, formData);
    // return response;
    await new Promise(resolve => setTimeout(resolve, 500));
    const id = formData.get('id') as string;
    const video = MOCK_VIDEOS.find(v => v.id ===  'video-001');
    if (!video) throw new Error('Video not found');
    video.titleEn = formData.get('titleEn') as string || video.titleEn;
    video.titleAr = formData.get('titleAr') as string || video.titleAr;
    video.updatedAt = new Date();
    return video;
  },

  delete: async (id: string): Promise<void> => {
    // await apiClient.get(endpoints.trainers.videos.delete(id));
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = MOCK_VIDEOS.findIndex(v => v.id === id);
    if (index > -1) MOCK_VIDEOS.splice(index, 1);
  },
};
