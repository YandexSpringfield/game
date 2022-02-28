import { UserThemeModel } from '@server/models';
import { Theme } from '@types';

class UserThemeService {
  public async findOrCreate(uuid: string, theme?: Theme) {
    return UserThemeModel.findOrCreate({
      where: { ownerId: uuid },
      defaults: {
        theme: theme || Theme.Light,
        ownerId: uuid,
      },
    });
  }

  public async updateOrCreate(uuid: string, theme: Theme) {
    const [data, created] = await this.findOrCreate(uuid, theme);

    if (!created) {
      return data.update({
        theme,
      });
    }

    return null;
  }
}

export const userThemeService = new UserThemeService();
