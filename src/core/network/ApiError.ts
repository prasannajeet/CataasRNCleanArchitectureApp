/**
 * ApiError represents errors that occur during API calls.
 * It normalizes various error types into a consistent format.
 */
export class ApiError {
  constructor(
    public readonly message: string,
    public readonly status?: number,
    public readonly originalError?: any,
    public readonly code?: string,
  ) {}

  /**
   * Returns a string representation of the error
   */
  toString(): string {
    return `API Error ${this.status ? `(${this.status})` : ''}: ${
      this.message
    }`;
  }

  /**
   * Check if the error is a network error (no connection)
   */
  isNetworkError(): boolean {
    return this.code === 'NETWORK_ERROR';
  }

  /**
   * Check if the error is an authorization error
   */
  isAuthError(): boolean {
    return this.status === 401 || this.status === 403;
  }

  /**
   * Check if the error is a server error
   */
  isServerError(): boolean {
    return this.status !== undefined && this.status >= 500;
  }
}
