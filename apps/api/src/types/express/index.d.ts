import type { Response } from "express";

// Define the standard shape of your API responses for consistency
interface ApiResponse {
  data: any | null;
  status: number;
  success: boolean;
  message: string;
  error: any | null;
};

// 1. Export AppResponse to use explicitly in function signatures (recommended for safety)
export interface AppResponse extends Response {
  success: (data: any, status?: number, msg?: string) => void;
  error: (error: unknown, status?: number, msg?: string) => void;
}

declare global {
  namespace Express {
    interface Response {
      success: (data: any, status?: number, msg?: string) => void;
      error: (error: unknown, status?: number, msg?: string) => void;
    }
  }
}
