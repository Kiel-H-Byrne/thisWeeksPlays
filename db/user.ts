import { ObjectId } from "mongodb";
import { nanoid } from "nanoid";

export async function findUsersBy(db, criteria, value) {
  return db
    .collection("users")
    .findOne({
      [criteria]: value,
    })
    .then((user) => user || null);
}
export async function findUserById(db, userId) {
  const _id = new ObjectId(userId);
  return db
    .collection("users")
    .findOne({
      _id,
    })
    .then((user) => user || "No User Found for id: " + userId);
}

export async function findUserByEmail(db, email) {
  return db
    .collection("users")
    .findOne({
      email,
    })
    .then((user) => user || null);
}

export async function updateUserById(db, id, update) {
  return db
    .collection("users")
    .findOneAndUpdate({ _id: id }, { $set: update }, { returnOriginal: false })
    .then(({ value }) => value);
}

export async function insertUser(
  db,
  { email, password, bio = "", name, profilePicture }
) {
  return db
    .collection("users")
    .insertOne({
      _id: nanoid(12),
      emailVerified: false,
      profilePicture,
      email,
      password,
      name,
      bio,
    })
    .then(({ ops }) => ops[0]);
}

export async function getUsers(db) {
  const users = db
    .collection("orders")
    .find({
      // Pagination: Fetch orders from before the input date or fetch from newest
      // ...(from && {
      //   createdAt: {
      //     $lt: new Date(), //less than today
      //     $gte: new Date(from), //greater than or equal to three weeks ago
      //   },
      // }),
      // ...(by && { creatorId: by }),
    })
    .sort({ createdAt: -1 })
    // .limit(limit)
    .toArray();
  return users;
}
