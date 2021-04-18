import { getComments, insertComment } from "@/db/comment";
import { connectToDatabase } from "@/db/mongodb";
import { MAX_AGE } from "@/types/index";

export default async function commentHandler(req, res) {
  const {
    query: { orderId },
    method,
  } = req;
  const db = await connectToDatabase();
  switch (method) {
    case "GET":
      // Get data from your database
      const comments = await getComments(db, void 0, orderId, 10); //get comments, from date, by orderId, limit 10
      if (req.query.from && comments.length > 0) {
        // This is safe to cache because from defines
        //  a concrete range of comments
        res.setHeader("cache-control", `public, max-age=${MAX_AGE}`);
      }
      res.send({ comments });
      break;
    case "POST":
      // Update or create data in your database
      const comment = await insertComment(db, req.body.data);
      return res.json({ comment });

      // res.status(200).json({ id, name: name || `User ${id}` })
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
