
export type User = {
  _id: string;
  name: string;
  orders: string[]; //array of submitted orders?
  stats: {
    winningOrders: number;
    netProfit: number;
    netGain: number;
  };
};

export type Session = {
  accessToken: string;
  expires: string;
  id: string;
  user: {
    name: string;
    email: string;
    image: string;
  };
};
