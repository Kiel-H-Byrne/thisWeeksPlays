import { ObjectId } from 'mongodb';

export type Comment = {
  _id: ObjectId | string;
  comment: string;
  submitDate: Date;
  oid: string;
  uid: string;
  userName: string;
};
