import { MongoClient } from "mongodb";

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentiatlly
 * during API Route usage.
 * https://github.com/vercel/next.js/pull/17666
 */

//@ts-ignore
let cached = global.mongo;

if (!cached) {
  //@ts-ignore
  cached = global.mongo = { conn: null, promise: null };
}
let indexesCreated = false;
export async function createIndexes(db) {
  await Promise.all([
    db
      .collection("tokens")
      .createIndex({ expireAt: -1 }, { expireAfterSeconds: 0 }),
    db.collection("comments").createIndex({ createdAt: -1 }),
    db.collection("orders").createIndex({ createdAt: -1 }),
    db.collection("users").createIndex({ email: 1 }, { unique: true }),
  ]);
  indexesCreated = true;
}
//@ts-ignore
export default async function database(req, res, next) {
  if (cached.conn) {
    return cached.conn;
  }
  //@ts-ignore
  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = MongoClient.connect(process.env.MONGODB_URI!, opts).then(
      (client) => {
        return {
          client,
          db: client.db(process.env.DB_NAME),
        };
      }
    );
  }
  cached.conn = await cached.promise;
  req.dbClient = cached.conn.client;
  req.db = cached.conn.db;
  if (!indexesCreated) await createIndexes(req.db);
  return next();
}
