import { api, ApiResponse } from "@/lib/api";
import { UserRegisterPayload } from "@repo/validation";

export async function login(email: string, password: string): Promise<ApiResponse<any>> {
  return api.post("/proxy/api/auth/login", { email, password })
}

export async function signup(data: UserRegisterPayload): Promise<ApiResponse<any>> {
  return api.post("/proxy/api/auth/register", data)
}
