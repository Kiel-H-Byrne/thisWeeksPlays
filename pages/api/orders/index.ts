import nc from 'next-connect';
import { getOrders, insertOrder } from '@/db/index';
import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

const handler = nc();

const maxAge = 1 * 24 * 60 * 60;

handler.get(async (req: NextApiRequest & {db: any, query: any}, res: NextApiResponse) => {
  const orders = await getOrders(
    req.db,
    req.query.from ? new Date(req.query.from) : undefined,
    req.query.by,
    req.query.limit ? parseInt(req.query.limit, 10) : undefined,
  );

  if (req.query.from && orders.length > 0) {
    // This is safe to cache because from defines
    //  a concrete range of orders
    res.setHeader('cache-control', `public, max-age=${maxAge}`);
  }

  res.send({ orders });
});

handler.post(async (req: Request | any, res: Response | any) => {
  // if (!req.user) {
  //   return res.status(401).send('unauthenticated');
  // }
  console.log("rez user")
  console.log(req.user)

  if (!req.body.data) return res.status(400).send('You must write something');
  const submission = {...req.body.data, creatorId: req.user?._id || new ObjectId()}
  const order = await insertOrder(req.db, submission);

  return res.json({ order });
});

export default handler;
