// 608da9f19a70cb0805c59923

import { findUserById } from '@/db/index';
import { connectToDatabase } from '@/db/mongodb'

export default async function userHandler(req, res) {
  const db = await connectToDatabase();
  const {
    query: { userId },
    method,
  } = req
  switch (method) {
    case 'GET':
      console.log("getting user " + userId)
      // Get data from your database
      const user = await findUserById(db, userId);
      res.status(200).json(user)
      break
    // case 'PUT':
    //   // Update or create data in your database
    //   res.status(200).json({ userId, name: name || `User ${userId}` })
    //   break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}