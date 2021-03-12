import nc from 'next-connect';
import { all } from '@/middlewares/index';
import { getOrders, insertOrder } from '@/db/index';

const handler = nc();

handler.use(all);

const maxAge = 1 * 24 * 60 * 60;

handler.get(async (req, res) => {
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

handler.post(async (req, res) => {
  // if (!req.user) {
  //   return res.status(401).send('unauthenticated');
  // }

  if (!req.body.data) return res.status(400).send('You must write something');

  const submission = {...req.body.data, creatorId: req.user._id}
  const order = await insertOrder(req.db, submission);

  return res.json({ order });
});

export default handler;
