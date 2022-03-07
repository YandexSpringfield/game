import {
  AllowNull,
  Column,
  DataType,
  Model,
  Table,
  BelongsTo,
} from 'sequelize-typescript';
import { UserModel } from '@server/models/user.model';

type Topic = {
  ownerId: number;
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

  @BelongsTo(() => UserModel, {
    foreignKey: 'ownerId',
    as: 'owner',
  })
  ownerId: number;
}
