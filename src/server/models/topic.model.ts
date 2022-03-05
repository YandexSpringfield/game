import {
  AllowNull,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserModel } from '@server/models/user.model';

export type Topic = {
  ownerId: string;
  title: string;
  description?: string;
};

@Table({
  tableName: 'topics',
})
export class TopicModel extends Model<Topic> {
  @AllowNull(false)
  @Column(DataType.STRING)
  title: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  description: string;

  @ForeignKey(() => UserModel)
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    field: 'owner_id',
  })
  ownerId: string;
}
