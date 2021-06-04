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
export const sampleUserData: Partial<User>[] = [
  { _id: "101", name: "Alice", orders: [], stats: {winningOrders: 0, netProfit: 0, netGain: 0} },
  { _id: "102", name: "Bob", orders: [], stats: {winningOrders: 0, netProfit: 0, netGain: 0} },
  { _id: "103", name: "Caroline", orders: [], stats: {winningOrders: 0, netProfit: 0, netGain: 0} },
  { _id: "104", name: "Dave", orders: [], stats: {winningOrders: 0, netProfit: 0, netGain: 0} },
];

export const samplePlays: Partial<Order>[] = [
  {
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
    upVotes: [],
    downVotes: [],
    get riskAmount(): number {
      return this.orderAmount * this.entryPrice;
    },
    points: 13,
  },
  {
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

export const MoreInformation = {
  ticker: "",
  sentiment: "",
  instrument: "",
  entryPrice: "",
  targetAmount: "",
  "exit-strategy": `Either the Date you plan to exit, or a target price to take a profit or loss. Must choose one.\n Holding long term? set a loss price target. \n Short-term Trade? Set a Date.\nSwing Trading? Set a profit price target.`,
  reasoning: `What made you place or watch this order?`,
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