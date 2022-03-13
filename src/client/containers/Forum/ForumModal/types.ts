export type TInitialFields = {
  message: string;
};

export type TMessage = {
  createdAt?: string;
  message: string;
  id?: number;
  ownerId?: number;
  parentId: number;
  topicId?: number;
  updatedAt?: string;
};
