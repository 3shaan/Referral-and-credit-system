import { createUser } from "@repo/validation";
import { Request, Response } from "express";
import { UserService } from "./user.service";
import bcrypt from "bcrypt";

export class UserController {
  constructor(private readonly userService: UserService) {}

  public getAllUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userService.findAll();
      console.log("user", users);
      res.success(users, 200, "Users fetched successfully");
    } catch (error) {
      console.error("Error fetching users:", error);
      res.error(error, 500);
    }
  };

  public createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userData = req.body || {};
      const validate = await createUser.parseAsync(userData);
      const isExist = await this.userService.findByEmail(validate.email);
      if (isExist) {
        res.error("User already exists", 400, "User already exists");
        return;
      }

      // hash the password

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(validate.password, salt);

      const user = await this.userService.create({
        ...validate,
        password: hashedPassword,
      });
      res.success(user, 201, "User created successfully");
    } catch (error) {
      res.error(error, 500);
    }
  };
}
