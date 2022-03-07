import { UserThemeModel } from '@server/models';
import { Theme } from '@types';

class UserThemeService {
  public async findOrCreate(id: number, theme?: Theme) {
    return UserThemeModel.findOrCreate({
      where: { ownerId: id },
      defaults: {
        theme: theme || Theme.Light,
        ownerId: id,
      },
    });
  }

  public async updateOrCreate(id: number, theme: Theme) {
    const [data, created] = await this.findOrCreate(id, theme);

    if (!created) {
      return data.update({
        theme,
      });
    }

    return null;
  }
}

export const userThemeService = new UserThemeService();
