import { UserModel, IUser } from "./user.model";

// Note: No changes needed in the service itself for this DI implementation.
export class UserService {
  public async findAll(): Promise<IUser[]> {
    return UserModel.find().exec();
  }

  public async create(userData: Partial<IUser>): Promise<IUser> {
    const newUser = new UserModel(userData);
    return newUser.save();
  }
}
