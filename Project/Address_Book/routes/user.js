import express from "express";
import {
  createUser,
  findAll,
  findByName,
  findByAddress,
  findByEmail,
  updateUser,
  deleteByName,
} from "./index.js";

const router = express.Router();

router.route("/api/users")
  .get(async (req, res) => {
    let users = await findAll();
    console.log(users);
    res.status(200)
      .send(`result: ${JSON.stringify(users)}`);
  })

  .post(async (req, res) => {
    if (req.body["name"] && req.body["email"] && req.body["address"]) {
      const newUser = await createUser(req.body);
      res.status(201)
        .send(newUser);
      console.log("생성 성공");
    } else {
      console.log("생성 실패");
    }
  });

router.route("/api/users/:userId")

  .get(async (req, res) => {
    const user = await findAll(req.params.username, req.params.email, req.params.address);
    console.log(`result: ${JSON.stringify(user)}`);
    res.status(200)
      .send(user);
  })

  .get(async (req, res) => {
    const user = await findByName(req.params.username);
    console.log(`result: ${JSON.stringify(user)}`);
    req.status(200)
      .send(user);
  })

  .get(async (req, res) => {
    const user = await findByEmail(req.params.email);
    console.log(`result: ${JSON.stringify(user)}`);
    req.status(200)
      .send(user);
  })

  .get(async (req, res) => {
    const user = await findByAddress(req.params.address);
    console.log(`result: ${JSON.stringify(user)}`);
    req.status(200)
      .send(user);
  })

  .delete(async (req, res) => {
    const deleteUser = await deleteByName(req.params.userId);
    console.log(`result: ${JSON.stringify(deleteUser)}`);
    console.log("삭제 성공");
    res.status(200)
      .send(deleteUser);
  })

  .patch(async (req, res) => {
    const findUserName = await findByName(req.params.userId);
    if ((findUserName.name === req.body.name)) {
      //console.log(req.params.userId);
      const result = await updateUser(req.params.userId, req.body.email);
      res.status(200)
        .send(result);
    } else {
      console.log("업데이트 실패");
    }
  });

export default router;