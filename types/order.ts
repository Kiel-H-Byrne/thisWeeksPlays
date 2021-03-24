import {
  Instruments,
  Sentiment,
  OptionStrategies,
  Reasons,
  ValueOf,
} from "../types";

export type Order = {
  _id: any;
  ticker: string;
  sentiment: keyof typeof Sentiment;
  instrument: ValueOf<Instruments>;
  entryPrice: number;
  targetAmount: number;
  exitStrategy?: string;
  submitDate: Date;
  upVotes: string[]; //array of usernames
  downVotes: string[]; //array of usernames
  reasoning: keyof typeof Reasons;
  isWatching: boolean;
  isShort: boolean;
  userName: string;
  orderAmount: number;
  optionsStrategy?: ValueOf<OptionStrategies>;
  riskAmount: number;
  screenShot?: string;
  uid: string;
};
