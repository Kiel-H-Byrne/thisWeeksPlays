import {
  Instruments,
  Sentiment,
  OptionStrategies,
  Reasons,
  ValueOf,
} from "@/types/index";
import ObjectID from "bson-objectid";

export type Order = {
  _id: ObjectID;
  ticker: string;
  sentiment: keyof typeof Sentiment;
  instrument: ValueOf<Instruments>;
  entryPrice: number;
  targetAmount: number;
  exitStrategy?: string;
  submitDate: Date;
  upVotes: ObjectID[]; //array of uids
  downVotes: ObjectID[]; //array of uids
  reasoning: keyof typeof Reasons;
  isWatching: boolean;
  isShort: boolean;
  userName: string;
  orderAmount: number;
  optionsStrategy?: ValueOf<OptionStrategies>;
  optionsExpiration?: string | Date;
  riskAmount: number;
  screenShot?: string;
  uid: ObjectID;
  points: number
};
