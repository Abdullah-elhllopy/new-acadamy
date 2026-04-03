import { apiClient } from './client';
import { endpoints } from './config';
import { TrainerReview } from '@/shared/types';

// TODO: Backend endpoints not yet implemented
// Waiting for backend team — do not remove this comment

// MOCK DATA - Remove when backend is ready
const MOCK_REVIEWS: TrainerReview[] = [
  {
    id: 'review-001',
    trainerId: 'trainer-001',
    userId: 'user-001',
    userName: 'Ahmed Hassan',
    userAvatar: '/avatars/user1.jpg',
    rating: 5,
    comment: 'Excellent trainer! Very knowledgeable and explains concepts clearly.',
    courseId: 'course-001',
    courseName: 'Advanced TypeScript Development',
    approved: true,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: 'review-002',
    trainerId: 'trainer-001',
    userId: 'user-002',
    userName: 'Sara Mohammed',
    userAvatar: '/avatars/user2.jpg',
    rating: 4,
    comment: 'Great course content and well-structured lessons. Highly recommended!',
    courseId: 'course-002',
    courseName: 'React & Next.js Masterclass',
    approved: true,
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10'),
  },
  {
    id: 'review-003',
    trainerId: 'trainer-001',
    userId: 'user-003',
    userName: 'Omar Ali',
    userAvatar: '/avatars/user3.jpg',
    rating: 5,
    comment: 'Best trainer I have worked with. Patient and very helpful.',
    courseId: 'course-001',
    courseName: 'Advanced TypeScript Development',
    approved: true,
    createdAt: new Date('2024-02-25'),
    updatedAt: new Date('2024-02-25'),
  },
  {
    id: 'review-004',
    trainerId: 'trainer-002',
    userId: 'user-004',
    userName: 'Fatima Abdullah',
    userAvatar: '/avatars/user4.jpg',
    rating: 4,
    comment: 'Very professional and organized. Learned a lot from this course.',
    courseId: 'course-003',
    courseName: 'Full Stack Web Development',
    approved: true,
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-03-05'),
  },
  {
    id: 'review-005',
    trainerId: 'trainer-001',
    userId: 'user-005',
    userName: 'Khalid Ibrahim',
    rating: 3,
    comment: 'Good content but needs more practical examples.',
    approved: false,
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-10'),
  },
];

export const trainerReviewService = {
  getAll: async (): Promise<TrainerReview[]> => {
    // const response : TrainerReview[] = await apiClient.get(endpoints.trainers.reviews.getAll);
    // return response;
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_REVIEWS;
  },

  getByTrainerId: async (trainerId: string): Promise<TrainerReview[]> => {
    // const response : TrainerReview[] = await apiClient.get(endpoints.trainers.reviews.getByTrainerId(trainerId));
    // return response;
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_REVIEWS
  },

  getById: async (id: string): Promise<TrainerReview> => {
    // const response : TrainerReview = await apiClient.get(`${endpoints.trainers.reviews.getAll}/${id}`);
    // return response;
    await new Promise(resolve => setTimeout(resolve, 300));
    const review = MOCK_REVIEWS.find(r => r.id === id);
    if (!review) throw new Error('Review not found');
    return review;
  },

  create: async (data: any): Promise<TrainerReview> => {
    // const response : TrainerReview = await apiClient.post(endpoints.trainers.reviews.create, data);
    // return response;
    await new Promise(resolve => setTimeout(resolve, 500));
    const newReview: TrainerReview = {
      id: `review-${Date.now()}`,
      trainerId: data.trainerId,
      userId: data.userId,
      userName: data.userName || 'Anonymous User',
      userAvatar: data.userAvatar,
      rating: data.rating,
      comment: data.comment,
      courseId: data.courseId,
      courseName: data.courseName,
      approved: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    MOCK_REVIEWS.push(newReview);
    return newReview;
  },

  update: async (data: any): Promise<TrainerReview> => {
    // const response : TrainerReview = await apiClient.post(endpoints.trainers.reviews.update, data);
    // return response;
    await new Promise(resolve => setTimeout(resolve, 500));
    const review = MOCK_REVIEWS.find(r => r.id === data.id);
    if (!review) throw new Error('Review not found');
    review.rating = data.rating ?? review.rating;
    review.comment = data.comment ?? review.comment;
    review.approved = data.approved ?? review.approved;
    review.updatedAt = new Date();
    return review;
  },

  delete: async (id: string): Promise<void> => {
    // await apiClient.get(endpoints.trainers.reviews.delete(id));
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = MOCK_REVIEWS.findIndex(r => r.id === id);
    if (index > -1) MOCK_REVIEWS.splice(index, 1);
  },
};
