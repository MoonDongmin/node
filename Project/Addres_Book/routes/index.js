import {MongoClient, ObjectId} from "mongodb";
//정보추가, 정보갱신, 정보삭제, 정보조회(이름, 주소(동이름), 이메일),
//연결
export async function getConnection(){
  const databaseUrl = "mongodb://Dongmin:min5314**@127.0.0.1/admin";
  const client = await MongoClient.connect(databaseUrl);
  const database = client.db("address");
  return database.collection("users");
}

//정보추가(Create)
export async function createUser(user){
  let connection = await getConnection();
  return await connection.insertOne(user);
}
//정보조회(Read)
export async function findUser(userName, userAddress, userEmail){
  const connection = await getConnection();
  console.log(userName,userAddress,userEmail);
  const objectUserName = new ObjectId(userName);
  const objectUserAddress = new ObjectId(userAddress);
  const objectUserEmail = new ObjectId(userEmail);
  return await connection.findOne({"name":userName, "email":userEmail,"address":userAddress});
}

//정보갱신(Update)
export async function updateUser(userName, userAddress){
  const connection = await getConnection();
  const objectName = new ObjectId(userName);
  return await connection.updateOne({"name":objectName},{$set:{"address":userAddress}});
}

//정보삭제(Delete)
export async function deleteByName(userName){
  const connection = await getConnection();
  const objectUserName = new ObjectId(userName);
  await connection.deleteOne({"name":objectUserName});
}