export interface ApiResponse<T = any> {
  success: boolean;
  status: number;
  message: string;
  data: T | null;
  errors: any;
}

interface RequestOptions extends RequestInit {
  timeout?: number;
  baseURL?: string;
}

class ApiError extends Error {
  status: number;
  statusText: string;

  constructor(status: number, statusText: string, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.statusText = statusText;
  }
}

/**
 * Enhanced fetch wrapper for Next.js applications
 * Returns consistent response format matching backend structure
 */
export async function apiCall<T = any>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const {
    timeout = 10000,
    baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "",
    headers = {},
    ...fetchOptions
  } = options;

  // Construct full URL
  const url = endpoint.startsWith("http") ? endpoint : `${baseURL}${endpoint}`;
  const path = endpoint.startsWith("http")
    ? new URL(endpoint).pathname
    : endpoint;

  // Default headers
  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...headers,
  };

  // Create AbortController for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    // Make the fetch request
    const response = await fetch(url, {
      ...fetchOptions,
      headers: defaultHeaders,
      signal: controller.signal,
    });

    // Clear timeout
    clearTimeout(timeoutId);

    // Parse response based on content type
    const contentType = response.headers.get("content-type");
    let responseData: any;

    if (contentType?.includes("application/json")) {
      responseData = await response.json();
    } else if (contentType?.includes("text/")) {
      responseData = await response.text();
    } else {
      responseData = await response.blob();
    }

    // If response is already in our expected format, return as is
    if (
      responseData &&
      typeof responseData === "object" &&
      "success" in responseData &&
      "status" in responseData
    ) {
      return responseData;
    }

    // Handle HTTP errors
    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        message:
          responseData?.message ||
          `HTTP ${response.status}: ${response.statusText}`,
        data: responseData?.data || null,
        errors: responseData?.errors || response.statusText,
      };
    }

    // Success response - format to match backend structure
    return {
      success: true,
      status: response.status,
      message: responseData?.message || "Request successful",
      data: responseData?.data !== undefined ? responseData.data : responseData,
      errors: null,
    };
  } catch (error: any) {
    // Clear timeout
    clearTimeout(timeoutId);

    let status = 500;
    let message = "An unexpected error occurred";
    let errors = error.message;

    // Handle different error types
    if (error.name === "AbortError") {
      status = 408;
      message = `Request timeout after ${timeout}ms`;
      errors = "Request timeout";
    } else if (error instanceof ApiError) {
      status = error.status;
      message = error.message;
      errors = error.statusText;
    } else if (!navigator.onLine) {
      status = 0;
      message = "No internet connection";
      errors = "Network unavailable";
    }

    return {
      success: false,
      status,
      message,
      data: null,
      errors,
    };
  }
}

// Convenience methods for different HTTP methods
export const api = {
  get: <T = any>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> =>
    apiCall<T>(endpoint, { ...options, method: "GET" }),

  post: <T = any>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> =>
    apiCall<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: <T = any>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> =>
    apiCall<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    }),

  patch: <T = any>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> =>
    apiCall<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T = any>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> =>
    apiCall<T>(endpoint, { ...options, method: "DELETE" }),
};

// Usage Examples:

// 1. Basic GET request
/*
const fetchUsers = async () => {
  const response = await api.get('/api/v1/users');

  if (response.success) {
    console.log('Users:', response.data);
    console.log('Status:', response.status); // 200
    console.log('Timestamp:', response.timestamp);
  } else {
    console.error('Error:', response.message);
    console.error('Status:', response.status); // 404, 500, etc.
    console.error('Errors:', response.errors);
  }
};
*/

// 2. POST request with data
/*
const createUser = async (userData: any) => {
  const response = await api.post('/api/v1/users', userData);

  if (response.success) {
    console.log('User created:', response.data);
    console.log('Full response:', {
      success: response.success,
      status: response.status,
      message: response.message,
      data: response.data,
      timestamp: response.timestamp,
      path: response.path,
      errors: response.errors
    });
    return response.data;
  } else {
    throw new Error(response.message);
  }
};
*/

// 3. Error handling example
/*
const handleApiCall = async () => {
  const response = await api.get('/api/v1/protected');

  // Response will always have this structure:
  // {
  //   success: boolean,
  //   status: number,
  //   message: string,
  //   data: any | null,
  //   timestamp: string,
  //   path: string,
  //   errors: any
  // }

  if (!response.success) {
    switch (response.status) {
      case 401:
        // Handle unauthorized
        console.log('Please login');
        break;
      case 404:
        // Handle not found
        console.log('Resource not found');
        break;
      case 500:
        // Handle server error
        console.log('Server error:', response.errors);
        break;
      default:
        console.log('Error:', response.message);
    }
  }

  return response;
};
*/

// 4. Using in React component
/*
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface User {
  id: string;
  name: string;
  email: string;
}

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      const response = await api.get<User[]>('/api/v1/users');

      if (response.success) {
        setUsers(response.data || []);
      } else {
        setError(`${response.message} (${response.status})`);
      }

      setLoading(false);
    };

    loadUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name} - {user.email}</li>
      ))}
    </ul>
  );
}
*/
