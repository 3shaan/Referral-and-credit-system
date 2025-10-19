import { IUser, IUserCreate } from "@repo/validation";
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

  public async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email }).exec();
  }
}
