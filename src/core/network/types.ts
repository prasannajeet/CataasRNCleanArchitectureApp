/**
 * HTTP Method types supported by the JobberNetwork
 */
export enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

/**
 * Request configuration interface for network requests
 */
export interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  timeout?: number;
}

/**
 * Network client interface that any implementation must satisfy
 */
export interface NetworkClientInterface {
  request<T>(
    method: HTTPMethod,
    url: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<T>;

  get<T>(url: string, config?: RequestConfig): Promise<T>;

  post<T>(url: string, data?: any, config?: RequestConfig): Promise<T>;

  put<T>(url: string, data?: any, config?: RequestConfig): Promise<T>;

  delete<T>(url: string, config?: RequestConfig): Promise<T>;

  patch<T>(url: string, data?: any, config?: RequestConfig): Promise<T>;
}
