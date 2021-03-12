export type ValueOf<T> = T[keyof T];

export enum OptionStrategies {
  DEBIT_CALL = "Debit Call",
  DEBIT_PUT = "Debit Put",
  CREDIT_CALL = "Credit Call",
  CREDIT_PUT = "Credit Put",
  COVERED_CALL = "Covered Call",
  DEBIT_BULL_CALL_SPREAD = "Debit Call Spread",
  CREDIT_BEAR_CALL_SPREAD = "Credit Call Spread",
  CREDIT_BULL_PUT_SPREAD = "Credit Put Spread",
  DEBIT_BEAR_PUT_SPREAD = "Debit Put Spread",
  DEBIT_STRADDLE = "Debit Straddle",
  CREDIT_STRADDLE = "Credit Straddle",
  DEBIT_STRANGLE = "Debit Strangle",
  CREDIT_STRANGLE = "Credit Strangle",
  IRON_CONDOR = "Iron Condor",
  DEBIT_CALL_CALENDAR = "Debit Calendar Call",
  CREDIT_CALL_CALENDAR = "Credit Calendar Call",
  DEBIT_PUT_CALENDAR = "Debit Calendar Put",
  CREDIT_PUT_CALENDAR = "Credit Calendar Put",
  DEBIT_CALL_BUTTERFLY = "Debit Butterfly Call",
  DEBIT_PUT_BUTTERFLY = "Debit Butterfly Put",
  IRON_BUTTERFLY = "Iron Butterfly",
  PROTECTIVE_PUT = "Protective Put",
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
