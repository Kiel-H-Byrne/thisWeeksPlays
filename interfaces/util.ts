export type ValueOf<T> = T[keyof T];

export enum OptionStrategies {
  DEBIT_CALL = "Debit Call",
  DEBIT_PUT = "Debit Put",
  CREDIT_CALL = "Credit Call",
  CREDIT_PUT = "Credit Put",
  COVERED_CALL = "Covered Call",
  DEBIT_BULL_CALL_SPREAD = "Debit Call Spread",
  CREDIT_BEAR_CALL_SPREAD = "Credit Call Spread",
  CREDIT_BULL_PUT_SPREAD = "Debit Put Spread",
  DEBIT_BEAR_PUT_SPREAD = "Debit Put Spread",
  DEBIT_STRADDLE = "",
  CREDIT_STRADDLE = "",
  DEBIT_STRANGLE = "",
  CREDIT_STRANGLE = "",
  IRON_CONDOR = "",
  DEBIT_CALL_CALENDAR = "",
  CREDIT_CALL_CALENDAR = "",
  DEBIT_PUT_CALENDAR = "",
  DEBIT_CALL_BUTTERFLY = "",
  DEBIT_PUT_BUTTERFLY = "",
  IRON_BUTTERFLY = "",
  CREDIT_PUT_CALENDAR = "",
  PROTECTIVE_PUT = "Covered Call",
}

export enum Instruments {
  Stocks = "Stocks",
  Options = "Options",
  Futures = "Futures",
  ForEx = "Foreign Exchange",
  Crypto = "Crypto Currencies",
}

export enum Reasons {
  News = "News",
  Earnings = "Earnings",
  InsiderTrading = "InsiderTrading",
  Community = "Community",
  Technicals = "Technicals",
  Other = "Other",
}

export enum Sentiment {
  Bullish = "Bullish",
  Bearish = "Bearish",
  Neutral = "Neutral",
}