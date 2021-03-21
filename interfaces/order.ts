import {
  Instruments,
  Sentiment,
  OptionStrategies,
  Reasons,
  ValueOf,
} from "./util";

export type Order = {
  _id: any;
  ticker: string;
  sentiment: keyof typeof Sentiment;
  instrument: ValueOf<Instruments>;
  entryPrice: number;
  targetAmount: number;
  exitStrategy?: string;
  submitDate: Date;
  upVotes: number;
  downVotes: number;
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
