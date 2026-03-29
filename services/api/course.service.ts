import { apiClient } from './client';
import { endpoints } from './config';

export interface CoursesResponse {
  totalNumberOfHourse: number;
  numberofCustomers: number;
  numberofTrainees: number;
  regiesterdHourse: number;
  allCoursesDetails: Course[];
  ourInstructors: any[];
}

export interface Course {
  courseId: string;
  courseName: string;
  courseDescripTion: string;
  courseStartDate: string;
  numberOfWeeks?: number;
  numberOfMonths?: number;
  place: string;
  placeSub?: string;
  coursetype?: string; // حضورى/مباشرة/عبر الإنترنت
  courseSpecies?: string; // Offline/Online (from API)
  courseType?: string; // Department type GUID
  language?: string;
  video?: string;
  image?: string;
  coursepdf?: string;
  institutionID?: string;
  institutionName?: string;
  institutionimage?: string;
  institutionDescription?: string;
  courseCost: number;
  courseNumberOfHours: number;
  instructorIDs?: string[];
  ourinstructors?: any[]; // Populated instructor objects from API
  courseContent?: string;
  mainDebId?: string;
  subDebId?: string;
  now?: boolean;
  mostSellenig?: boolean;
  recommended?: boolean;
  soon?: boolean;
  wwwlText?: string[];
  wwwl?: any[]; // What Will Learn objects from API
  relatedCourses?: any[];
  courseLectures?: any[];
  allcomments?: any[];
}

export interface CourseFilterByCategory {
  categoryIds: string[];
}

export interface CourseFilterByBool {
  now?: boolean;
  mostSelling?: boolean;
  recommended?: boolean;
  soon?: boolean;
}

export interface WWWL {
  wwwlid?: string;
  wwwlcontent: string;
  courseid: string;
}

class CourseService {
  async getAll(): Promise<CoursesResponse> {
    return apiClient.get<CoursesResponse>(endpoints.courses.getAll);
  }

  async getById(id: string): Promise<Course> {
    return apiClient.get<Course>(endpoints.courses.getById(id));
  }

  async findByName(name: string): Promise<Course[]> {
    return apiClient.get<Course[]>(endpoints.courses.findByName(name));
  }

  async filterByName(name: string): Promise<Course[]> {
    return apiClient.get<Course[]>(endpoints.courses.filterByName, {
      params: { name },
    });
  }

  async filterByCategory(filter: CourseFilterByCategory): Promise<Course[]> {
    return apiClient.post<Course[]>(endpoints.courses.filterByCategory, filter);
  }

  async filterByBool(filter: CourseFilterByBool): Promise<Course[]> {
    return apiClient.post<Course[]>(endpoints.courses.filterByBool, filter);
  }

  async create(formData: FormData): Promise<Course> {
    return apiClient.postFormData<Course>(endpoints.courses.create, formData);
  }

  async update(courseId: string, formData: FormData): Promise<Course> {
    return apiClient.postFormData<Course>(
      `${endpoints.courses.update}?CourseId=${courseId}`,
      formData
    );
  }

  async addWWWL(data: WWWL): Promise<void> {
    const formData = new FormData();
    if (data.wwwlid) formData.append('Wwwlid', data.wwwlid);
    formData.append('Wwwlcontent', data.wwwlcontent);
    formData.append('Courseid', data.courseid);
    return apiClient.postFormData<void>(endpoints.courses.addWWWL, formData);
  }

  async delete(id: string): Promise<void> {
    return apiClient.delete<void>(endpoints.courses.delete(id));
  }
}

export const courseService = new CourseService();
