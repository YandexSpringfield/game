import {
  Model,
  Table,
  Column,
  DataType,
  AllowNull,
  ForeignKey,
} from 'sequelize-typescript';
import { UserModel } from '@server/models/user.model';
import { Theme } from '@types';
import { ENUM } from 'sequelize';

type Data = {
  theme: Theme;
  ownerId: number;
};

@Table({
  tableName: 'user_theme',
})
export class UserThemeModel extends Model<Data> {
  @AllowNull(false)
  @Column(ENUM(Theme.Light, Theme.Dark))
  theme: Theme;

  @ForeignKey(() => UserModel)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'owner_id',
  })
  ownerId: number;
}
