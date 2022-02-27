import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
} from 'sequelize-typescript';

type User = {
  uuid: string;
};

@Table({
  tableName: 'users',
})
export class UserModel extends Model<User> {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
    field: 'id',
  })
  uuid: string;
}
