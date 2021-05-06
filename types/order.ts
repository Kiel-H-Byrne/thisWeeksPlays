import {
  Instruments,
  Sentiment,
  OptionStrategies,
  Reasons,
  ValueOf,
} from "@/types/index";

export type Order = {
  _id: string;
  ticker: string;
  sentiment: Sentiment;
  instrument: ValueOf<Instruments>;
  entryPrice: number;
  targetAmount: number;
  exitStrategy?: string;
  submitDate: Date;
  upVotes: string[]; //array of uids
  downVotes: string[]; //array of uids
  reasoning: Reasons;
  isWatching: boolean;
  isShort: boolean;
  userName: string;
  orderAmount: number;
  optionsStrategy?: ValueOf<OptionStrategies>;
  optionsExpiration?: string | Date;
  riskAmount: number;
  screenShot?: string;
  uid: string;
  points: number;
  // isWinning: boolean;
};
