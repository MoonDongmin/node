import {MongoClient} from "mongodb";
//정보추가, 정보갱신, 정보삭제, 정보조회(이름, 주소(동이름), 이메일),

//연결
export async function getConnection() {
    const databaseUrl = "mongodb://Dongmin:min5314**@127.0.0.1/admin";
    const client = await MongoClient.connect(databaseUrl);
    const database = client.db("addressBook");
    return database.collection("users");
}


export async function registeruser(users) {
    let connection = await getConnection();
    return await connection.insertOne(users);
}
