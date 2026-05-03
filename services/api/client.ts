import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_BASE_URL } from './config';
import { I18LANG, AUTH_TOKEN } from '@/shared/constants/constant';

class ApiClient {
  private client: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (error?: unknown) => void;
  }> = [];

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Set initial headers from localStorage
    const token = this.getToken();
    if (token) {
      this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    this.client.interceptors.request.use(
      (config) => {
        const lang = this.getLang();
        if(lang){
          config.headers['Accept-Language'] = lang;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config;

        if (
          error.response?.status === 401 ||
          error.response?.status === 403
        ) {
          // Don't try to refresh if this is already a login request
          if (originalRequest?.url?.includes('login')) {
            return Promise.reject(
              (error.response && error.response.data) || 'Something went wrong'
            );
          }

          if (this.isRefreshing) {
            // If we're already refreshing, queue this request
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                if (originalRequest) {
                  originalRequest.headers.Authorization = `Bearer ${token}`;
                  return this.client(originalRequest);
                }
                return Promise.reject('No original request');
              })
              .catch((err) => {
                return Promise.reject(err);
              });
          }

          if (originalRequest) {
            (originalRequest as any)._retry = true;
          }
          this.isRefreshing = true;

          try {
            const newToken = await this.refreshToken();
            this.processQueue(null, newToken);

            // Retry the original request with new token
            if (originalRequest) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return this.client(originalRequest);
            }
            return Promise.reject('No original request');
          } catch (refreshError) {
            this.processQueue(refreshError, null);
            this.handleUnauthorized();
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(
          (error.response && error.response.data) || 'Something went wrong'
        );
      }
    );
  }

  private processQueue = (error: unknown, token: string | null = null) => {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });

    this.failedQueue = [];
  };

  private async refreshToken(): Promise<string> {
    // For now, return the existing token
    // In a real implementation, you would call a refresh token endpoint
    const token = this.getToken();
    if (!token) {
      throw new Error('No token available for refresh');
    }
    return token;
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(AUTH_TOKEN);
    }
    return null;
  }

  private getLang(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(I18LANG);
    }
    return null;
  }

  private handleUnauthorized(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_TOKEN);
      localStorage.removeItem('auth_user');
      this.client.defaults.headers.common.Authorization = undefined;
      window.location.href = '/login';
    }
  }

  public updateAuthHeaders(token: string | null): void {
    if (token) {
      this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete this.client.defaults.headers.common.Authorization;
    }
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);

    return response.data;
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  async postFormData<T>(url: string, formData: FormData, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
}

export const apiClient = new ApiClient();
