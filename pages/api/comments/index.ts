import { /*getComments,*/ insertComment } from "@/db/index";
import { getSession } from "next-auth/client";
import ObjectID from "bson-objectid";
import { connectToDatabase } from "@/db/mongodb";

const maxAge = 1 * 24 * 60 * 60;

export default async (req: any, res: any) => {
  const db = await connectToDatabase();
  const session = await getSession();
  console.log(db)
  const {
    //@ts-ignore
    //can send query params to sort & limit results
    query: { id, name, by, limit, from },
    method,
  } = req;
  switch (method) {
    case "GET":
      // const comments = await getComments(
      //   db,
      //   req.query.from ? new Date(req.query.from) : undefined,
      //   req.query.by,
      //   req.query.limit ? parseInt(req.query.limit, 10) : undefined
      // );
      const comments = []

      if (req.query.from && comments.length > 0) {
        // This is safe to cache because from defines
        //  a concrete range of comments
        res.setHeader("cache-control", `public, max-age=${maxAge}`);
      }

      res.send({ comments });
      break;
    case "POST":
      // if (!req.user) {
        //   return res.status(401).send('unauthenticated');
        // }

        if (session) {
          console.log("=SESSION=");
          console.log(session);
          //allow rest, or throw error
        }
        console.log(req.body.data)
        if (!req.body)
          return res.status(400).send("You must write something");
        const submission = {
          ...req.body.data,
          uid: new ObjectID().toHexString(),
        };
        const comment = await insertComment(db, submission);
        console.log("submitting to db ==>");
        console.log(comment);
        return res.json({ comment });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};