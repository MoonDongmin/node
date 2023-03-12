import express from "express";
import {
  createUser,
  findAll,
  updateById,
  deleteById,
  findByName,
  findById,
  findByEmail,
  deleteByEmailAndNumber
} from './index.js';

const router = express.Router();

router.route("/api/users")

  /* 이메일 검색
  .get(async (req,res)=>{
  const user = await findByEmail(req.params.userName);
  console.log(user);
  req.status(200).send(`result: ${JSON.stringify(user)}`);
  })
  */


  .get(async (req,res)=>{
    const user = await findByName(req.params.userName);
    console.log(`result: ${JSON.stringify(user)}`);
    req.status(200).send(user);
  })


  /* 전체 검색
  .get(async (req, res) => {
      let users = await findAll();
      console.log(users);
      res.status(200)
          .send(`result: ${JSON.stringify(users)}`);
  })
  */
  .delete(async (req, res) => {
    const deleteUser = await deleteByEmailAndNumber(req.params.Email,req.params.Number);
    console.log(`result: ${JSON.stringify(deleteUser)}`);
    console.log("deleted success");
    res.status(200)
      .send(deleteUser);
  })
  .post(async (req, res) => {
    if (req.body["UserName"] && req.body["Address"] && req.body["Number"] && req.body["Email"]) {
      const newUser = await createUser(req.body);
      res.status(201)
        .send(newUser);
    } else {
      console.log(req.body);
      console.log("Create Failed");
    }
  });


router.route("/api/users/:userId")
  .get(async (req, res) => {
    console.log(`${req.params.userId}`);
    const user = await findById(req.params.userId);
    console.log(`result: ${JSON.stringify(user)}`);
    res.status(200)
      .send(user);
  })

  .delete(async (req, res) => {
    console.log(`${req.params.userId}`);
    const deleteUser = await deleteById(req.params.userId);
    console.log(`result: ${JSON.stringify(deleteUser)}`);
    console.log("deleted success");
    res.status(200)
      .send(deleteUser);
  })

  .patch(async (req, res) => {
    console.log(`${JSON.stringify(req.body)}`);
    console.log();
    const findUser = await findById(req.params.userId);
    if ((findUser.UserName === req.body.UserName) && (findUser.Number === req.body.Number)) {
      console.log(req.params.userId);
      const result = await updateById(req.params.userId, req.body.Email);
      res.status(200)
        .send(result);
    } else {
      console.log("sorry, I can't update");
    }

  });
export default router;