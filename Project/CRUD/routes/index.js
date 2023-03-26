import {MongoClient, ObjectId} from "mongodb";

export async function getConnection() {
  const databaseUrl = "mongodb://아이디:비번**@127.0.0.1/admin";
  const client = await MongoClient.connect(databaseUrl);
  const database = client.db("nodejs2");
  return database.collection("users");
}

export async function createUser(user) {
  let connection = await getConnection();
  return await connection.insertOne(user);
}

// 3. Read
export async function findAll() {
  const connection = await getConnection();
  return await connection.find({}).toArray();
}

export async function findById(userId) {
  const connection = await getConnection();
  console.log(userId);
  const objectId = new ObjectId(userId);
  return await connection.findOne({"_id": objectId});

}

// 4. Update
export async function updateById(userId, nickName) {
  const connection = await getConnection();
  const objectId = new ObjectId(userId);
  return await connection.updateOne({"_id": objectId}, {$set: {"nickName": nickName}});
}

// 5. Delete
export async function deleteById(userId) {
  let connection = await getConnection();
  const objectId = new ObjectId(userId);
  await connection.deleteOne({"_id": objectId});
}


