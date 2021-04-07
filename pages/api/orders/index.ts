import nc from 'next-connect';
import { all } from '@/middlewares/index';
import { getOrders, insertOrder } from '@/db/index';
import ObjectID from 'bson-objectid';
import { getSession } from 'next-auth/client';

const handler = nc();

handler.use(all);

const maxAge = 1 * 24 * 60 * 60;

handler.get(async (req: any, res: any) => {
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
  const session = await getSession()

  console.log("rez user")
  if (session) {
    console.log(session)
    //allow rest, or throw error
  }

  if (!req.body.data) return res.status(400).send('You must write something');
  const submission = {...req.body.data, uid: new ObjectID().toHexString()}
  const order = await insertOrder(req.db, submission);
  console.log(order)
  res.end()
  return res.json({ order });
});

export default handler;
