import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {HTTPMethod, NetworkClientInterface, RequestConfig} from './types';
import {cataasLogger} from '../logger/setupLogger';

/**
 * Axios implementation of the NetworkClientInterface
 */
export class AxiosNetworkClient implements NetworkClientInterface {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string, defaultConfig?: AxiosRequestConfig) {
    this.axiosInstance = axios.create({
      baseURL,
      ...defaultConfig,
    });

    // Set up interceptors for logging, authentication, etc.
    this.setupInterceptors();
  }

  /**
   * Set up request and response interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      config => {
        // Log the request details
        cataasLogger.info('Request:', {
          method: config.method,
          url: config.url,
          headers: config.headers,
          data: config.data,
        });
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      response => {
        cataasLogger.info('Response:', {
          status: response.status,
          data: response.data,
          headers: response.headers,
        });
        return response;
      },
      error => {
        cataasLogger.error('Response error:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
        return Promise.reject(error);
      },
    );
  }

  /**
   * Transform Axios config to our internal RequestConfig
   */
  private transformConfig(config?: RequestConfig): AxiosRequestConfig {
    if (!config) return {};

    return {
      headers: config.headers,
      params: config.params,
      timeout: config.timeout,
    };
  }

  /**
   * Generic request method
   */
  async request<T>(
    method: HTTPMethod,
    url: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<T> {
    try {
      const axiosConfig = this.transformConfig(config);
      const response = await this.axiosInstance.request<T>({
        method,
        url,
        data,
        ...axiosConfig,
      });

      return response.data;
    } catch (error: any) {
      // Transform axios error to our NetworkError and throw
      if (axios.isAxiosError(error)) {
        const errorData = {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        };
        throw errorData;
      }

      throw {message: 'Unknown network error'};
    }
  }

  /**
   * GET request
   */
  async get<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(HTTPMethod.GET, url, undefined, config);
  }

  /**
   * POST request
   */
  async post<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(HTTPMethod.POST, url, data, config);
  }

  /**
   * PUT request
   */
  async put<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(HTTPMethod.PUT, url, data, config);
  }

  /**
   * DELETE request
   */
  async delete<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(HTTPMethod.DELETE, url, undefined, config);
  }

  /**
   * PATCH request
   */
  async patch<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(HTTPMethod.PATCH, url, data, config);
  }
}
