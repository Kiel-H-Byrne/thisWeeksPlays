import { findOrderById } from '@/db/index';
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
      console.log(order)
      res.status(200).json(order)
      break
    // case 'PUT':
    //   // Update or create data in your database
    //   res.status(200).json({ orderId, name: name || `User ${orderId}` })
    //   break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}