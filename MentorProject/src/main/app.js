import express from "express";
import dotenv from "dotenv";
import * as fs from "node:fs";
import * as path from "node:path";
import * as https from "node:https";

dotenv.config();

const app = new express();
const options = {
  key: fs.readFileSync(path.join(process.cwd()+'/resource/cert/privkey.pem')),
  cert:fs.readFileSync(path.join(process.cwd()+'/resource/cert/fullchain.pem')),
};

const port = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Hello Node.js"));

https
    .createServer(options,app)
    .listen(port, () => {
  console.log(`${port}번에서 대기중`);
});



