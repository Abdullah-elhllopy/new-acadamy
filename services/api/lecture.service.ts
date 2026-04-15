import { apiClient } from './client';
import { endpoints } from './config';

export interface Lecture {
  lectureid?: string;
  lecturename: string;
  lecturedescription?: string;
  lectureIndex?: number;
  duration?: number;
  video?: string;
  link?: string;
  courseId?: string;
}

export interface Chapter {
  chapterId?: string;
  chaptername: string;
  courseId: string;
  lectures?: Lecture[];
}

export interface Comment {
  commentId: string;
  commentText: string;
  userName: string;
  userEmail: string;
  createdAt: string;
  lectureId: string;
}

export interface Topic {
  topicId: string;
  topicText: string;
  userName: string;
  userEmail: string;
  createdAt: string;
  lectureId: string;
}

export interface Question {
  questionId?: string;
  questionText: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  correctAnswer: number;
  lectureId: string;
}

export interface CourseWithLectures {
  courseId: string;
  courseName: string;
  courseType?: string;
  courseSpecies?: string;
  courseLectures: (Lecture | Chapter)[];
  numberOfLectures?: number;
}

class LectureService {
  async getAll(): Promise<Lecture[]> {
    const response = await apiClient.get<{ data: Lecture[] }>(endpoints.lectures.getAll);
    return response.data || [];
  }

  async getById(id: string): Promise<Lecture> {
    return apiClient.get<Lecture>(endpoints.lectures.getById(id));
  }

  async getCourseWithLectures(courseId: string): Promise<CourseWithLectures> {
    return apiClient.get<CourseWithLectures>(endpoints.courses.getById(courseId));
  }

  async getLecturesByChapter(chapterId: string): Promise<Lecture[]> {
    return apiClient.get<Lecture[]>(endpoints.lectures.getByChapterId(chapterId));
  }

  async createLecture(formData: FormData): Promise<Lecture> {
    return apiClient.postFormData<Lecture>(endpoints.lectures.create, formData);
  }

  async createChapter(formData: FormData): Promise<Chapter> {
    return apiClient.postFormData<Chapter>(endpoints.lectures.createChapter, formData);
  }

  async removeLectureFromCourse(data: { courseId: string; lectureId: string }): Promise<boolean> {
    return apiClient.post<boolean>(endpoints.lectures.removeLectureFromCourse, data);
  }

  async delete(id: string): Promise<void> {
    return apiClient.delete<void>(endpoints.lectures.delete(id));
  }

  // Comments
  async getCommentsByLecture(lectureId: string): Promise<Comment[]> {
    return apiClient.get<Comment[]>(endpoints.lectures.comments.getByLectureId(lectureId));
  }

  async deleteComment(id: string): Promise<void> {
    return apiClient.delete<void>(endpoints.lectures.comments.delete(id));
  }

  // Topics
  async getTopicsByLecture(lectureId: string): Promise<Topic[]> {
    return apiClient.get<Topic[]>(endpoints.lectures.topics.getByLectureId(lectureId));
  }

  async deleteTopic(id: string): Promise<void> {
    return apiClient.delete<void>(endpoints.lectures.topics.delete(id));
  }

  // Questions
  async createQuestion(formData: FormData): Promise<Question> {
    return apiClient.postFormData<Question>(endpoints.lectures.questions.create, formData);
  }
}

export const lectureService = new LectureService();
