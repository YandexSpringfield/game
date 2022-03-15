export type TInitialFields = {
  comment: string;
};

export type TComment = {
  id?: number;
  comment: string;
  ownerId?: number;
  owner?: {};
  parentId?: number | null;
  parent?: {};
  topicId: number;
  createdAt?: string;
  updatedAt?: string;
};
