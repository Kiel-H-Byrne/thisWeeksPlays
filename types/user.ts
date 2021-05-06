import { ObjectId } from "mongodb";

export type User = {
  _id: ObjectId | string;
  name: string;
  email: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  orders: ObjectId[] | string[]; //array of submitted order ids
  stats: {
    winningOrders: number;
    netProfit: number;
    netGain: number;
  };
  profile: {};
};

export type Session = {
  accessToken: string;
  expires: string;
  id: string;
  user: {
    name: string;
    email: string;
    image: string;
  };
};
