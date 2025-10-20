import type { IUser, IUserCreate, UserRegisterPayload } from "@repo/validation";

import { UserModel } from "./user.model";

// Note: No changes needed in the service itself for this DI implementation.
export class UserService {
  public async findAll(): Promise<IUser[]> {
    return UserModel.find().exec();
  }

  public async create(userData: IUserCreate): Promise<IUser> {
    const newUser = new UserModel(userData);
    return newUser.save();
  }

  public async register(userData: UserRegisterPayload): Promise<IUser> {
    const newUser = new UserModel(userData);
    return newUser.save();
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email }).exec();
  }

  public updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<IUser | null> {
    return UserModel.findByIdAndUpdate(
      userId,
      { refreshToken },
      { new: true },
    ).exec();
  }
}
