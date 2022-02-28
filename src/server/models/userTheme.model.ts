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

type Data = {
  theme: Theme;
  ownerId: string;
};

@Table({
  tableName: 'user_theme',
})
export class UserThemeModel extends Model<Data> {
  @AllowNull(false)
  @Column(DataType.STRING)
  theme: string;

  @ForeignKey(() => UserModel)
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    field: 'owner_id',
  })
  ownerId: Data['theme'];
}
