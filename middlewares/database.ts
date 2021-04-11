import { MongoClient } from 'mongodb';

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentiatlly
 * during API Route usage.
 * https://github.com/vercel/next.js/pull/17666
 */

//@ts-ignore
global.cachedDbClient = null;

let indexesCreated = false;
export async function createIndexes(db) {
  await Promise.all([
    db
      .collection('tokens')
      .createIndex({ expireAt: -1 }, { expireAfterSeconds: 0 }),
    db.collection('comments').createIndex({ createdAt: -1 }),
    db.collection('orders').createIndex({ createdAt: -1 }),
    db.collection('users').createIndex({ email: 1 }, { unique: true }),
  ]);
  indexesCreated = true;
}
//@ts-ignore
export default async function database(req, res, next) {
  //@ts-ignore
  if (!global.cachedDbClient) {
    //@ts-ignore
    global.cachedDbClient = new MongoClient(process.env.MONGODB_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    //@ts-ignore
    await global.cachedDbClient.connect();
  }
  //@ts-ignore
  req.dbClient = global.cachedDbClient;
  //@ts-ignore
  req.db = global.cachedDbClient.db(process.env.DB_NAME);
  if (!indexesCreated) await createIndexes(req.db);
  return next();
}
