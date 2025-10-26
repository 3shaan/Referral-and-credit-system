import type { Request, Response } from "express";

import { createUser } from "@repo/validation";
import bcrypt from "bcrypt";

import type { UserJwtTokenPayload } from "@/types/payload";

import { BaseController } from "@/lib/core/base-controller";
import { UnauthorizedException } from "@/lib/exception";

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

  public me = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req?.user) {
        throw new UnauthorizedException("Unauthorized user");
      }
      const userData = req.user as UserJwtTokenPayload;
      const user = await this.userService.findById(userData._id);

      res.success(user, 200, "User retrieved successfully");
    }
    catch (error) {
      res.error(error, 500);
    }
  };

  getUserByIdWithReferrerData = async (req: Request) => {
    const { id } = req.params;

    return this.userService.findOneByIdWithReferrer(id);
  };
}
