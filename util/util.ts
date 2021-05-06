import { format, subWeeks } from 'date-fns';

export const matchName = (name, keyword) => {
  let keyLen = keyword.length;
  name = name.toLowerCase().substring(0, keyLen);
  return name == keyword && keyLen != 0;
};

export const getDateThreeWeeksAgo = format(subWeeks(new Date(), 3), "MM/dd/y");
