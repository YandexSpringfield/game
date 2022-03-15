import {
  Model,
  Table,
  Column,
  DataType,
  AllowNull,
  BelongsTo,
} from 'sequelize-typescript';
import { UserModel } from '@server/models/user.model';
import { TopicModel } from '@server/models/topic.model';

type Comment = {
  topicId: number;
  parentId: number | null;
  ownerId: number;
  comment: string;
};

@Table({
  tableName: 'topic_comments',
})
export class TopicCommentModel extends Model<Comment> {
  @BelongsTo(() => TopicModel, {
    foreignKey: 'topicId',
    as: 'topic',
  })
  topicId: number;

  @BelongsTo(() => TopicCommentModel, {
    foreignKey: 'parentId',
    as: 'parent',
  })
  parentId: number | null;

  @BelongsTo(() => UserModel, {
    foreignKey: 'ownerId',
    as: 'owner',
  })
  ownerId: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  comment: string;
}
