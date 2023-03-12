import {MongoClient, ObjectId} from "mongodb";
//정보추가, 정보갱신, 정보삭제, 정보조회(이름, 주소(동이름), 이메일),

//연결
export async function getConnection() {
  const databaseUrl = "mongodb://Dongmin:min5314**@127.0.0.1/admin";
  const client = await MongoClient.connect(databaseUrl);
  const database = client.db("address");
  return database.collection("users");
}

//정보추가(Create)
export async function createUser(user) {
  let connection = await getConnection();
  return await connection.insertOne(user);
}

//정보조회(Read)
export async function findAll(userName) {
  const connection = await getConnection();
  return await connection.find({}).toArray();
}

export async function findByName(userId) {
  const connection = await getConnection();
  console.log(userId);
  const objectName = new ObjectId(userId);
  return await connection.findOne({"_id": objectName});
}

export async function findByAddress(userAddress) {
  const connection = await getConnection();
  console.log(userAddress);
  const objectAddress = new ObjectId(userAddress);
  return await connection.findOne({"address": objectAddress});
}

export async function findByEmail(userEmail) {
  const connection = await getConnection();
  console.log(userEmail);
  const objectEmail = new ObjectId(userEmail);
  return await connection.findOne({"email": objectEmail});
}

//정보갱신(Update)
export async function updateUser(userId, userAddress) {
  const connection = await getConnection();
  const objectName = new ObjectId(userId);
  return await connection.updateOne({"_id": objectName}, {$set: {"address": userAddress}});
}

//정보삭제(Delete)
export async function deleteByName(userName) {
  const connection = await getConnection();
  const objectUserName = new ObjectId(userName);
  await connection.deleteOne({"_id": objectUserName});
}