import { nanoid } from 'nanoid';

//@ts-ignore
export async function getOrders(db, from, by, limit) {
  return (
    db
      .collection("orders")
      .find({
        // Pagination: Fetch orders from before the input date or fetch from newest
        ...(from && {
          createdAt: {
            $lte: from,
          },
        }),
        // ...(by && { creatorId: by }),
      })
      .sort({ createdAt: -1 })
      // .limit(limit || 10)
      .toArray()
  );
}

export async function insertOrder(db, data) {
  return db.collection('orders').insertOne({
    _id: nanoid(12),
    ...data,
    createdAt: new Date(),
  }).then(({ ops }) => ops[0]);
}
