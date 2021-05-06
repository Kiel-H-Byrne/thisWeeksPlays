import { format, subWeeks } from "date-fns";
import { Order } from "../types";

export const matchName = (name, keyword) => {
  let keyLen = keyword.length;
  name = name.toLowerCase().substring(0, keyLen);
  return name == keyword && keyLen != 0;
};

export const getDateThreeWeeksAgo = format(subWeeks(new Date(), 3), "MM/dd/y");

enum FormFields {
  EntryPrice = "entryPrice",
  TargetAmount = "targetAmount",
  ExitStrategy = "exitStrategy",
  UpVotes = "upVotes",
  Reasoning = "reasoning",
  IsShort = "isShort",
  OrderAmount = "orderAmount",
  OptionsStrategy = "optionsStrategy",
  OptionsExpiration = "optionsExpiration",
  RiskAmount = "riskAmount",
  ScreenShot = "screenShot",
  IsWinning = "isWinning",
}
enum UserActions {
  ProfileComplete = "profileComplete",
  ProfileSectionComplete = "profileSectionComplete",
  ProfileSingleField = "profileSingleField",
  ReceivedUpVote = "receivedUpVote",
  Received10UpVotes = "received10UpVotes",
  Received50UpVotes = "received50UpVotes",
  Received100UpVotes = "received100UpVotes",
  GaveUpVote = "gaveUpVote",
  Gave10UpVotes = "gave10UpVotes",
  Gave50UpVotes = "gave50UpVotes",
  Gave100UpVotes = "gave100UpVotes",
}

export const PointMap = {
  //map of points per:
  //form field
  [FormFields.EntryPrice]: 5,
  [FormFields.TargetAmount]: 5,
  [FormFields.ExitStrategy]: 5,
  [FormFields.Reasoning]: 10,
  [FormFields.IsShort]: 3,
  [FormFields.OrderAmount]: 10,
  [FormFields.RiskAmount]: 10,
  [FormFields.ScreenShot]: 20,
  [FormFields.IsWinning]: 50,
  //user action
  [UserActions.ProfileComplete]: 20,
  [UserActions.ProfileSectionComplete]: 3,
  [UserActions.ProfileSingleField]: 1,
  [UserActions.ReceivedUpVote]: 1,
  [UserActions.Received10UpVotes]: 10,
  [UserActions.Received50UpVotes]: 50,
  [UserActions.Received100UpVotes]: 100,
  [UserActions.GaveUpVote]: 1,
  [UserActions.Gave10UpVotes]: 15,
  [UserActions.Gave50UpVotes]: 60,
  [UserActions.Gave100UpVotes]: 150,
};

export const calculatePoints = (data: Partial<Order> | FormFields) => {
  //data will be fields submitted from data
  // another map needs to exist for formfields to enum...
  let points = 0;
  Object.keys(data).forEach((label) => {
    if (label == FormFields.RiskAmount && data[FormFields.RiskAmount] === 0) {
      null;
    } else if (!PointMap[label]) {
      null;
    } else {
      points = points + PointMap[label];
    }
  });
  return points;
};
