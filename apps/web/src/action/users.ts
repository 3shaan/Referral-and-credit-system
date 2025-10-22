import { api, ApiResponse } from "@/lib/api";
import { IUser } from "@repo/validation";

export async function isUserLoggedIn(): Promise<ApiResponse<IUser>> {
  return api.get("/proxy/api/me", { cache: "no-store" })
}
