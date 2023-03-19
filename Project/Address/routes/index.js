import {MongoClient, ObjectId} from "mongodb";

async function getConnection() {
  const databaseUrl = "mongodb://Dongmin:min5314**@127.0.0.1/admin";
  const client = await MongoClient.connect(databaseUrl);
  const database = client.db("addressBook");
  return database.collection("addressBook");
}

export async function createUser(user) {
  const connection = await getConnection();
  return await connection.insertOne(user);
}

export async function findAll() {
  const connection = await getConnection();
  return await connection.find({}).toArray();
}

export async function findByName(userName) {
  const connection = await getConnection();
  return await connection.find({"userName": userName}).toArray();
}

export async function findByEmail(email) {
  const connection = await getConnection();
  return await connection.find({"email": {$regex: email}}).toArray();
}

export async function findByAddress(address) {
  const connection = await getConnection();
  return await connection.find({"address": address}).toArray();

}

export async function updateUserByName(_id, userName) {
  const connection = await getConnection();
  return await connection.updateOne({"_id": _id}, {$set: {"userName": userName}});
}

export async function updateUserByAddress(_id, address) {
  const connection = await getConnection();
  return await connection.updateOne({"_id": _id}, {$set: {"address": address}});
}

export async function updateUserByPhoneNumber(_id, phoneNumber) {
  const connection = await getConnection();
  return await connection.updateOne({"_id": _id}, {$set: {"phoneNumber": phoneNumber}});
}

export async function updateUserByEmail(_id, email) {
  const connection = await getConnection();
  return await connection.updateOne({"_id": _id}, {$set: {"email": email}});
}

export async function deleteById(userId) {
  const connection = await getConnection();
  const objectId = new ObjectId(userId);
  await connection.deleteOne({"_id": objectId});
}

