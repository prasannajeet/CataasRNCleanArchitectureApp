/**
 * API configuration constants
 */

// Base URL for Cat as a Service (CATAAS) API
export const CATAAS_BASE_URL = 'https://cataas.com';

// API endpoints
export const API_ENDPOINTS = {
  CAT_LIST: '/api/cats', // Endpoint to get list of cats
  CAT_BY_ID: (id: string) => `/cat?id=${id}`, // Endpoint to get a specific cat by ID
};

/**
 * Network request timeout in milliseconds
 */
export const DEFAULT_TIMEOUT = 30000; // 30 seconds

/**
 * Default headers to be sent with every request
 */
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};
