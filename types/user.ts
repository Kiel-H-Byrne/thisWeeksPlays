
export type User = {
  _id: string;
  name: string;
  orders: string[];
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
