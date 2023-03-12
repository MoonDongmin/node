import {MongoClient, ObjectId} from "mongodb";
export async function getConnection() {
  const databaseUrl = "mongodb://Dongmin:**%40%4012@localhost:27017/admin"
  const client = await MongoClient.connect(databaseUrl);
  const database = client.db("addressbook");
  return database.collection("users");
}

// 유저 정보 추가 (create)
export async function createUser(users) {
  let connection = await getConnection();
  return await connection.insertOne(users);
}

// 유저 정보 조회 전체 (read)
export async function findAll() {
  const connection = await getConnection();
  return await connection.find({}).toArray();
}

// 유저 정보 조회 이름 (read)
export async function findByName(UserName) {
  const connection = await getConnection();
  return await connection.findOne({"UserName": UserName});
}

// 유저 정보 조회 이메일 (read)
export async function findByEmail(Email){
  const connection = await getConnection();
  return await connection.findOne({"Email":Email});
}

export async function findById(userId){
  const connection = await getConnection();
  const objectId = new ObjectId(userId);
  return await connection.findOne({"_id":objectId});
}
/*
// 유저 정보 조회 주소 (read)
export async function findByAddress(Address){
    const connection = await getConnection();
    if(Address.match("Dajeon")=="Dajeon")
        return await connection.find({"Address":address});
    else if(Address.match(""))
}
*/
// 4. Update
export async function updateById(userId, Email) {
  const connection = await getConnection();
  const objectId = new ObjectId(userId);
  return await connection.updateOne({"_id": objectId}, {$set: {"Email": Email}});
}

// 5. Delete
export async function deleteById(userId) {
  let connection = await getConnection();
  const objectId = new ObjectId(userId);
  await connection.deleteOne({"_id": objectId});
}

export async function deleteByEmailAndNumber(Email, Number){
  const connection = await getConnection();
  return await connection.deleteOne({"Email":Email,"Number":Number});
}