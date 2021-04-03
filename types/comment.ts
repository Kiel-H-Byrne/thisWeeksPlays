import { ObjectId } from "mongodb";

export type Comment = {
  _id: ObjectId;
  message: string;
  submitDate: Date;
  oid: ObjectId;
  uid: ObjectId;
  userName: string;
};
