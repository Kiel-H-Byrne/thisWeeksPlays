import { ObjectId } from "mongodb";
import { Order } from "../types";

//@ts-ignore
export async function getOrders(db, from: string, by: string, limit: number) {
  return db
    .collection("orders")
    .find({
      // Pagination: Fetch orders from before the input date or fetch from newest
      ...(from && {
        submitDate: {
          $lte: new Date(), //less than today
          $gte: new Date(from), //greater than or equal to three weeks ago
        },
      }),
      // ...(by && { creatorId: by }),
    })
    .sort({ points: -1 })
    .limit(limit)
    .toArray();
}

export async function findOrderById(db, orderId: string) {
  return db
    .collection("orders")
    .findOne({
      _id: typeof orderId === "string" ? orderId : new ObjectId(orderId)
    })
    .then((order) => order || "No Order Found for id: " + orderId);
}

export async function insertOrder(db, data: Order) {
  const { uid, orderAmount, entryPrice } = data;
  const riskAmount =
    orderAmount && entryPrice ? orderAmount * entryPrice : null;
  return db
    .collection("orders")
    .insertOne({
      ...data,
      uid: new ObjectId(uid),
      submitDate: new Date(),
      riskAmount,
    })
    .then(({ ops }) => ops[0]);
}


export async function updateOrderById(db, id, update) {
  // const _id = new ObjectId(`${id}`);
  console.log(id)
  return db
    .collection("orders")
    .findOneAndUpdate({ _id: id }, { $set: update }, { returnOriginal: false })
    .then(({ value }) => value);
}