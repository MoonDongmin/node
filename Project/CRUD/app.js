import express from "express";
import userRouter from "./routes/user.js";

const app = express();

app.use(express.json()); // body에 들어오는 json형식의 데이터 해석을 위해 추가 -> 필수임.
app.set("port", process.env.PORT || 8000);


app.use("/", userRouter);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});

// async function main(){
//   let connection = await getConnection()
//   await connection.deleteOne({name: "nero"})
//   await connection.deleteOne({name:"zero"})
//
//   await createUser({
//     name:"nero" ,
//     email: "1234@naver.com"
//   })
//   await createUser({
//     name:"zero" ,
//     email: "1234567@naver.com"
//   })
//
//   let user1 = await findUserByUserName({name:"nero"})
//   console.log(user1);
// }
//
// main()