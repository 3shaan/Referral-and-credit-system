import type { Request, Response } from "express";

import { createUser } from "@repo/validation";
import bcrypt from "bcrypt";

import { BaseController } from "@/lib/core/base-controller";

import type { UserService } from "./user.service";

export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  async getAllUsers() {
    const users = await this.userService.findAll();
    return users;
  }

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
    }
    catch (error) {
      res.error(error, 500);
    }
  };
}
