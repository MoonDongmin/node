import dotenv from "dotenv";
import express, {response} from "express";
import http from "http";
import path from "path";
import serveStatic from "serve-static";
import expressSession from "express-session";
import {MongoClient} from "mongodb";

dotenv.config();

async function connection() {
  const databaseUrl = "mongodb://localhost:27017/nodejs";
  const client = await MongoClient.connect(databaseUrl);
  const database = client.db("nodejs");
 return database.collection("users");
}

async function Create (user) {
  let connect = await connection();
  await connect.insertOne(user);
};

async function Read(userName){
  let connect = await connection();
  return connect.find(userName).toArray();
}

function print() {
  const user = read();
  console.log(`current users => ${JSON.stringify(user.toArray())}`);
}

async function del(userName){
  let connect=await connection();
  await connect.deleteMany(userName);
}

function find(object) {
  const connect = connection();
   console.log(`users => ${JSON.stringify(user.toArray())}`);
}


const app = express();
const __dirname = path.resolve();

app.set("port", process.env.PORT || 13000);
app.use(express.urlencoded({extended: false}));
app.use("/public", serveStatic(path.join(__dirname, "public")));
app.use(expressSession({
  secret: "my key",
  resave: true,
  saveUninitialized: true,
}));

http.createServer(app)
  .listen(app.get("port"), function () {
    console.log("connected");

  });

function main() {
  const newUser = {
    name: "nero",
    email: "daum@daum.net",
  };
  insert();
  print();
}