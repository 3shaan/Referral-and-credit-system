import { Request, Response } from "express";
import { UserService } from "./user.service";

export class UserController {
  constructor(private readonly userService: UserService) {}

  public getAllUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userService.findAll();
      res.success(users, 200, "Users fetched successfully");
    } catch (error) {
      console.error("Error fetching users:", error);
      res.error(error, 500);
    }
  };
}
