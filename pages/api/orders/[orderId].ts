import { findOrderById, updateOrderById } from '@/db/index';
import { connectToDatabase } from '@/db/mongodb'

export default async function orderHandler(req, res) {
  const db = await connectToDatabase();
  const {
    query: { orderId },
    method,
  } = req
  switch (method) {
    case 'GET':
      // Get data from your database
      const order = await findOrderById(db, orderId);
      res.status(200).json(order)
      break
    // case 'PUT':
    //   // Update or create data in your database
    //   res.status(200).json({ orderId, name: name || `User ${orderId}` })
    //   break
    case "POST":
      //if id exists in db, update with data; otherwise insert new
      // Update or create data in your database
      const update = await updateOrderById(db, orderId, req.body.data);
      // return res.json({ update });
      res.status(200).json({ update })
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}