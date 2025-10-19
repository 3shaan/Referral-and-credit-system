import { Request, Response } from "express";
import { UserService } from "./user.service";
import { log } from "../../logger";

export class UserController {
  constructor(private readonly userService: UserService) {}

  public getAllUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userService.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Error fetching users" });
    }
  };
}
