import {
  User,
  Order,
  Sentiment,
  Instruments,
  Reasons,
  OptionStrategies,
  Comment,
} from "@/types/index";

/** Dummy user data. */
export const sampleUserData: User[] = [
  { _id: "101", name: "Alice", orders: [] },
  { _id: "102", name: "Bob", orders: [] },
  { _id: "103", name: "Caroline", orders: [] },
  { _id: "104", name: "Dave", orders: [] },
];

export const samplePlays: Order[] = [
  {
    _id: "201",
    sentiment: Sentiment.Bullish,
    ticker: "IBUY",
    instrument: Instruments.Stocks,
    isWatching: false,
    entryPrice: 215,
    targetAmount: 230,
    reasoning: Reasons.News,
    isShort: false,
    orderAmount: 100,
    screenShot: "https://picsum.photos/150/300",
    userName: "sirBuysAlot",
    uid: "101",
    submitDate: new Date(),
    upVotes: ["101", "101", "101"],
    downVotes: ["101", "101"],
    get riskAmount(): number {
      return this.orderAmount * this.entryPrice;
    },
    points: 13,
  },
  {
    _id: "202",
    sentiment: Sentiment.Bearish,
    ticker: "IDEX",
    instrument: Instruments.Stocks,
    isWatching: true,
    entryPrice: 4.5,
    targetAmount: 2.5,
    reasoning: Reasons.Technicals,
    exitStrategy: "buy back at 17% drop or anywhere below 2.50",
    isShort: true,
    orderAmount: 100,
    userName: "BoyJorje",
    uid: "101",
    upVotes: [], //array of usernames who upvoted
    downVotes: [], //array of usernaes who downvoted,
    submitDate: new Date(),
    get riskAmount(): number {
      return this.orderAmount * this.entryPrice;
    },
    points: 10,
  },
  {
    _id: "203",
    sentiment: Sentiment.Bullish,
    ticker: "TSLA",
    instrument: Instruments.Options,
    isWatching: false,
    targetAmount: 700,
    reasoning: Reasons.News,
    exitStrategy: "exit at 60% or 3/10 risk ratio",
    optionsStrategy: OptionStrategies.CREDIT_BULL_PUT_SPREAD,
    optionsExpiration: "20230317",
    userName: "musgKang",
    uid: "101",
    submitDate: new Date(),
    upVotes: [],
    downVotes: [],
    entryPrice: 450,
    isShort: false,
    orderAmount: 6,
    get riskAmount(): number {
      return this.orderAmount * this.entryPrice;
    },
    points: 10,
  },
  {
    _id: "204",
    sentiment: Sentiment.Bullish,
    ticker: "ZB",
    instrument: Instruments.Futures,
    isWatching: false,
    userName: "futureIsNow",
    uid: "101",
    submitDate: new Date(),
    upVotes: [],
    downVotes: [],
    entryPrice: 0,
    isShort: false,
    orderAmount: 0,
    targetAmount: -1,
    reasoning: Reasons.News,
    get riskAmount(): number {
      return this.orderAmount * this.entryPrice;
    },
    points: 10,
  },
  {
    _id: "205",
    sentiment: Sentiment.Bullish,
    ticker: "BTC/USD",
    instrument: Instruments.ForEx,
    isWatching: false,
    userName: "cryptoKingZ",
    uid: "101",
    submitDate: new Date(),
    upVotes: [],
    downVotes: [],
    entryPrice: 0,
    isShort: false,
    orderAmount: 0,
    reasoning: Reasons.Technicals,
    targetAmount: 3000,
    get riskAmount(): number {
      return this.orderAmount * this.entryPrice;
    },
    points: 10,
  },
  {
    _id: "206",
    sentiment: Sentiment.Bullish,
    ticker: "BTCUSDT",
    instrument: Instruments.Crypto,
    isWatching: true,
    userName: "digiMon",
    uid: "101",
    submitDate: new Date(),
    upVotes: [],
    downVotes: [],
    entryPrice: 0,
    isShort: false,
    orderAmount: 0,
    targetAmount: 10,
    reasoning: Reasons.Community,
    get riskAmount(): number {
      return this.orderAmount * this.entryPrice;
    },
    points: 10,
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

export const sampleComments: Comment[] = [
  {
    _id: "301",
    submitDate: new Date(),
    userName: "commentKing",
    uid: "101",
    oid: "201",
    comment: "some type of comment",
  },
]