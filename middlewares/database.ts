import { MongoClient } from 'mongodb';

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentiatlly
 * during API Route usage.
 * https://github.com/vercel/next.js/pull/17666
 */
let GLOBAL: any = global
GLOBAL.mongo = GLOBAL.mongo || {};

let indexesCreated = false;
export async function createIndexes(db) {
  await Promise.all([
    db
      .collection('tokens')
      .createIndex({ expireAt: -1 }, { expireAfterSeconds: 0 }),
    db.collection('posts').createIndex({ createdAt: -1 }),
    db.collection('users').createIndex({ email: 1 }, { unique: true }),
  ]);
  indexesCreated = true;
}
//@ts-ignore
export default async function database(req, res, next) {
  if (!GLOBAL.mongo.client) {
    GLOBAL.mongo.client = process.env.MONGODB_URI && new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await GLOBAL.mongo.client.connect();
  }
  req.dbClient = GLOBAL.mongo.client;
  req.db = GLOBAL.mongo.client.db(process.env.DB_NAME);
  if (!indexesCreated) await createIndexes(req.db);
  return next();
}
