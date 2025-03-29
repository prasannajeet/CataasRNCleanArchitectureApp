import {NetworkClientInterface, RequestConfig} from './types';
import {AxiosNetworkClient} from './AxiosNetworkClient';
import {ApiError} from './ApiError';
import {Either} from '../utils/Either';

/**
 * CataasNetwork - Main network abstraction layer for the application
 * This class serves as the main entry point for all network communications,
 * hiding the implementation details of the actual network library used.
 */
export class CataasNetwork {
  private static instance: CataasNetwork;
  private apiClient: NetworkClientInterface;

  private constructor(baseURL: string) {
    // NOTE: This can be injected, skipped for brevity
    this.apiClient = new AxiosNetworkClient(baseURL);
  }

  public static getInstance(baseURL: string): CataasNetwork {
    if (!CataasNetwork.instance) {
      CataasNetwork.instance = new CataasNetwork(baseURL);
    }
    return CataasNetwork.instance;
  }

  public async get<T>(
    endpoint: string,
    config?: RequestConfig,
  ): Promise<Either<ApiError, T>> {
    try {
      const response = await this.apiClient.get<T>(endpoint, config);
      return Either.success<ApiError, T>(response);
    } catch (error) {
      return Either.failure<ApiError, T>(error as ApiError);
    }
  }

  public async post<T>(
    endpoint: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<Either<ApiError, T>> {
    try {
      const response = await this.apiClient.post<T>(endpoint, data, config);
      return Either.success<ApiError, T>(response);
    } catch (error) {
      return Either.failure<ApiError, T>(error as ApiError);
    }
  }

  public async put<T>(
    endpoint: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<Either<ApiError, T>> {
    try {
      const response = await this.apiClient.put<T>(endpoint, data, config);
      return Either.success<ApiError, T>(response);
    } catch (error) {
      return Either.failure<ApiError, T>(error as ApiError);
    }
  }

  public async delete<T>(
    endpoint: string,
    config?: RequestConfig,
  ): Promise<Either<ApiError, T>> {
    try {
      const response = await this.apiClient.delete<T>(endpoint, config);
      return Either.success<ApiError, T>(response);
    } catch (error) {
      return Either.failure<ApiError, T>(error as ApiError);
    }
  }

  public async patch<T>(
    endpoint: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<Either<ApiError, T>> {
    try {
      const response = await this.apiClient.patch<T>(endpoint, data, config);
      return Either.success<ApiError, T>(response);
    } catch (error) {
      return Either.failure<ApiError, T>(error as ApiError);
    }
  }
}
