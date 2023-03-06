import {MongoClient} from "mongodb";

// 1. get connection
async function getConnection() {
  const databaseUrl = "mongodb://localhost:27017/nodejs2";
  const client = await MongoClient.connect(databaseUrl);
  const database = client.db("nodejs2");
  return database.collection("users");
}

// 2. Create
async function createUser(user) {
  let connection = await getConnection()
  await connection.insertOne(user)
}

// 3. Read
async function findUserByUserName(userName) {
  let connection = await getConnection()
  return await connection.find(userName).toArray()
}

// 4. Update
async function updateUser(userName, newEmail) {
  let connection = await getConnection()
  return await connection.updateOne(userName, { $set : newEmail})
}

// 5. Delete
async function deleteUserByUserName(userName) {
  let connection = await getConnection()
  await connection.deleteMany(userName)
}

async function main() {
  let connection = await getConnection()
  await connection.deleteMany({name : "nero"})
  await connection.deleteMany({name : "zero"})

  // 1. create nero user
  await createUser({
    name : "nero",
    email: "daum@daum.net"
  })
  // 2. create zero user
  await createUser({
    name : "zero",
    email: "zero@naver.com"
  })

  // 3. read nero user
  let user1 = await findUserByUserName({name : "nero"})
  console.log("=== print nero user ===");
  console.log(user1);

  // 4. read zero user
  let user2 = await findUserByUserName({name : "zero"})
  console.log("=== print zero user ===");
  console.log(user2);

  // 5. update
  await updateUser({name: "nero"}, {email: "nero@update.com"})

  // 6. read
  let user3 = await findUserByUserName({name : "nero"})
  console.log("=== print updated nero user ===");
  console.log(user3)

  // 7. delete
  await deleteUserByUserName({name: "nero"})

  // 8. get all user
  let users = await findUserByUserName({})
  console.log("=== print all users ===");
  console.log(users);
}

main()

//1.몽고디비  연결
//2.몽고디비  "database생성
//3. database - collection 생성
//4. collection->users<정보> create생성
//5. users 출력 => find이용
//6. users update => <정보> 수정
//7. users delete => 삭제
//8. users 삭제 됐는지 출력
//9. end