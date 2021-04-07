import ObjectID from "bson-objectid";

export type User = {
  _id: ObjectID;
  name: string;
  orders: object[]
};