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
}

export const userService = new UserService();
