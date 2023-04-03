import express from "express";
import router from "./routes/users.js";

const app = express();

app.use(express.json());
app.set("port", process.env.PORT || 8001);

app.use("/", router);

app.listen(app.get("port"), () => {
    console.log(app.get("port"), "번에서 대기중");
});
