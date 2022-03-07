import { UserModel, User } from '@server/models/user.model';

class UserService {
  public async findOrCreate(data: User) {
    return UserModel.findOrCreate({
      where: {
        id: data.id,
      },
      defaults: {
        id: data.id,
        login: data.login,
      },
    });
  }

  public async findById(id: number) {
    return UserModel.findOne({
      where: { id },
    });
  }
}

export const userService = new UserService();
