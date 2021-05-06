import { Comment } from '../types';

//@ts-ignore
export async function getComments(db, from = new Date(), orderId, limit) {
  return db
    .collection("comments")
    .find({
      // Pagination: Fetch comments from before the input date or fetch from newest
      // ...(from && {
      //   submitDate: {
      //     $lte: from,
      //   },
      // }),
      ...(orderId && { oid: orderId }),
    })
    .sort({ submitDate: -1 })
    .limit(limit || 100).toArray();
    // cursor.close();
    // return cursor.toArray();
}

export async function insertComment(db, data: Partial<Comment>) {
  return db.collection('comments').insertOne({
    ...data,
    submitDate: new Date(),
  }).then(({ ops }) => ops[0]);
}
