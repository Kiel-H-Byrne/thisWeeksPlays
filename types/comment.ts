import ObjectID from "bson-objectid";

export type Comment = {
  _id: ObjectID;
  message: string;
  submitDate: Date;
  oid: number;
  uid: number;
  userName: string;
};
