import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = new express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Hello Node.js"));

app.listen(port, () => {
  console.log(`${port}번에서 대기중`);
});
