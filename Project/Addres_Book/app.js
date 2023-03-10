import express from "express";

const app = express();
app.use(express.json());
app.set("port", process.env.PORT || 8000);

app.use("/");

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});