import type { IUser, IUserCreate, UserRegisterPayload } from "@repo/validation";

import { BaseService } from "@/lib/core";
import { ForbiddenException } from "@/lib/exception";

import type { ReferralService } from "../referrals/referral.service";

import { UserModel } from "./user.model";

// Note: No changes needed in the service itself for this DI implementation.
export class UserService extends BaseService {
  constructor(private readonly referralService: ReferralService) {
    super();
    if (!this.referralService) {
      throw new Error("ReferralService is required");
    }
  }

  public async findAll(): Promise<IUser[]> {
    return UserModel.find().exec();
  }

  public async create(userData: IUserCreate): Promise<IUser> {
    const newUser = new UserModel(userData);
    return newUser.save();
  }

  public register = async (userData: UserRegisterPayload) => {
    const isUserExists = await this.findByEmail(userData.email);
    await this.referralService.findAll();

    if (isUserExists)
      throw new ForbiddenException("User already exists");

    const isUsernameExists = await this.findByUserName(userData.userName);

    if (isUsernameExists)
      throw new ForbiddenException("Username already exists. Please choose a different username.");

    const newUser = new UserModel(userData);
    const savedUser = await newUser.save();

    // if referredBy is exist, then increment totalReferred for that referrer
    if (userData.referredBy) {
      const referrerUser = await UserModel.findOneAndUpdate(
        { userName: userData.referredBy },
        { $inc: { "stats.totalReferred": 1 } },
      );
      if (referrerUser) {
        await this.referralService.createReferral({ referredId: savedUser._id, referrerId: referrerUser._id, status: "pending" });
      }
    }

    return savedUser;
  };

  public async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email }).exec();
  }

  public async findByUserName(userName: string): Promise<IUser | null> {
    return UserModel.findOne({ userName }).exec();
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

  public async updateById(
    userId: string,
    userData: Partial<IUserCreate>,
  ): Promise<IUser | null> {
    return UserModel.findByIdAndUpdate(
      userId,
      userData,
      { new: true },
    ).exec();
  }
}
