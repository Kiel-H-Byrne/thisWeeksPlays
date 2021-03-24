import { User, Order, Sentiment, Instruments, Reasons, OptionStrategies } from "../types";

/** Dummy user data. */
export const sampleUserData: User[] = [
  { _id: 101, name: "Alice" },
  { _id: 102, name: "Bob" },
  { _id: 103, name: "Caroline" },
  { _id: 104, name: "Dave" },
];

export const samplePlays: Order[] = [
  {
    _id: 201,
    sentiment: Sentiment.Bullish,
    ticker: "IBUY",
    instrument: Instruments.Stocks,
    isWatching: false,
    entryPrice: 215,
    targetAmount: 230,
    reasoning: Reasons.News,
    exitStrategy: "",
    isShort: false,
    orderAmount: 100,
    screenShot: "https://picsum.photos/150/300",
    userName: "234234jalkdjf",
    uid: "234234jalkdjf",
    submitDate: new Date(),
    upVotes: ["sigFried", "R0Y","TheBlackBengal"],
    downVotes: ["TheWhiteBengal", "ThatGUyFriday"],
    get riskAmount() : number {
     return this.orderAmount * this.entryPrice
   }
  },
  {
    _id: 202,
    sentiment: Sentiment.Bullish,
    ticker: "IDEX",
    instrument: Instruments.Stocks,
    isWatching: true,
    entryPrice: 4.50,
    targetAmount: 1.5,
    reasoning: Reasons.Technicals,
    exitStrategy: "buy back at 17% drop or anywhere below 2.50",
    isShort: true,
    orderAmount: 100,
    userName: "BoyJorje",
    uid: "234234jalkdjf",
    upVotes: [], //array of usernames who upvoted
    downVotes: [], //array of usernaes who downvoted,
    submitDate: new Date(),
    get riskAmount() : number {
      return this.orderAmount * this.entryPrice
    }
  },
  {
    _id: 203,
    sentiment: Sentiment.Bullish,
    ticker: "TSLA",
    instrument: Instruments.Options,
    isWatching: false,
    targetAmount: 700,
    reasoning: Reasons.News,
    exitStrategy: "exit at 60% or 3/10 risk ratio",
    optionsStrategy: OptionStrategies.CREDIT_CALL,
    userName: "234234jalkdjf",
    uid: "234234jalkdjf",
    submitDate: new Date(),
    upVotes: [],
    downVotes: [],
    entryPrice: 450,
    isShort: false,
    orderAmount: 6,
    get riskAmount() : number {
      return this.orderAmount * this.entryPrice
    }
    
  },
  {
    _id: 204,
    sentiment: Sentiment.Bullish,
    ticker: "ZB",
    instrument: Instruments.Futures,
    isWatching: false,
    userName: "234234jalkdjf",
    uid: "234234jalkdjf",
    submitDate: new Date(),
    upVotes: [],
    downVotes: [],
    entryPrice: 0,
    isShort: false,
    orderAmount: 0,
    targetAmount: -1,
    reasoning: Reasons.News,
    get riskAmount() : number {
     return this.orderAmount * this.entryPrice
   }
  },
  {
    _id: 205,
    sentiment: Sentiment.Bullish,
    ticker: "BTC/USD",
    instrument: Instruments.ForEx,
    isWatching: false,
    userName: "234234jalkdjf",
    uid: "234234jalkdjf",
    submitDate: new Date(),
    upVotes: [],
    downVotes: [],
    entryPrice: 0,
    isShort: false,
    orderAmount: 0,
    reasoning: Reasons.Technicals,
    targetAmount: 3000,
    get riskAmount() : number {
     return this.orderAmount * this.entryPrice
   }
  },
  {
    _id: 206,
    sentiment: Sentiment.Bullish,
    ticker: "DOGE",
    instrument: Instruments.Crypto,
    isWatching: true,
    userName: "234234jalkdjf",
    uid: "234234jalkdjf",
    submitDate: new Date(),
    upVotes: [],
    downVotes: [],
    entryPrice: 0,
    isShort: false,
    orderAmount: 0,
    targetAmount: 10,
    reasoning: Reasons.Community,
    get riskAmount() : number {
     return this.orderAmount * this.entryPrice
   }
  },
];

export const MoreInformation: { [name: string]: string } = {
  ticker: "",
  sentiment: "",
  instrument: "",
  entryPrice: "",
  targetAmount: "",
  "exit-strategy": "",
  reasoning: "",
  "is-watching": "",
  isShort: "",
  orderAmount: "",
  riskAmount: "",
  screenShot: "",
};