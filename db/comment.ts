import { nanoid } from 'nanoid';
import { Comment } from '../types';

//@ts-ignore
export async function getComments(db, from = new Date(), by, limit) {
  // return db
  //   .collection('comments')
  //   .find({
  //     // Pagination: Fetch comments from before the input date or fetch from newest
  //     // ...(from && {
  //     //   createdAt: {
  //     //     $lte: from,
  //     //   },
  //     // }),
  //     // ...(by && { creatorId: by }),
  //   })
  //   .sort({ createdAt: -1 })
  //   // .limit(limit || 10)
  //   .toArray();
  return []
}

export async function insertComment(db, data: Partial<Comment>) {
  return db.collection('comments').insertOne({
    ...data,
    _id: nanoid(11),
    createdAt: new Date(),
  }).then(({ ops }) => ops[0]);
}
