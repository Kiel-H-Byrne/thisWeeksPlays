import { MongoClient } from 'mongodb'

const { MONGODB_URI, DB_NAME } = process.env

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

if (!DB_NAME) {
  throw new Error(
    'Please define the DB_NAME environment variable inside .env.local'
  )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
//@ts-ignore
let cached = global.mongo

if (!cached) {
  //@ts-ignore
  cached = global.mongo = { conn: null, promise: null }
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }

    cached.promise = MongoClient.connect(process.env.MONGODB_URI!, opts).then((client) => {
      return {
        client,
        db: client.db(process.env.DB_NAME),
      }
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}