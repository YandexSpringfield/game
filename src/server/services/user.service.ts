import { UserModel } from '@server/models';

class UserService {
  public async findOrCreate(uuid: string) {
    return UserModel.findOrCreate({
      where: { uuid },
      defaults: {
        uuid,
      },
      raw: true,
    });
  }

  public async find(uuid: string) {
    return UserModel.findOne({
      where: { uuid },
      raw: true,
    });
  }
}

export const userService = new UserService();
