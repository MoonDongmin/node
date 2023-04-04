import {MongoClient} from "mongodb";
//정보추가, 정보갱신, 정보삭제, 정보조회(이름, 주소(동이름), 이메일),

//연결
export async function getConnection2() {
    const databaseUrl = "mongodb://Dongmin:min5314**@127.0.0.1/admin";
    const client = await MongoClient.connect(databaseUrl);
    const database = client.db("addressBook");
    return database.collection("address");
}

export async function createUser(user) {
    const connection = await getConnection2();
    return await connection.insertOne(user);
}

export async function findAll() {
    const connection = await getConnection2();
    return await connection.find({}).toArray();
}

export async function findByName(username) {
    const connection = await getConnection2();
    return await connection.find({"username": username}).toArray();
}

export async function updateUserByName(_id, username) {
    const connection = await getConnection2();
    return await connection.updateOne({"_id": _id}, {$set: {"username": username}});
}

export async function deleteById(userId) {
    const connection = await getConnection2();
    const objectId = new ObjectId(userId);
    await connection.deleteOne({"_id": objectId});
}