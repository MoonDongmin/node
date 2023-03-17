import express from "express";
import {
  createUser, findAll, findByAddress, findByEmail, findByName, deleteById,
  updateUserByEmail, updateUserByName, updateUserByAddress, updateUserByPhoneNumber,
} from "./index.js";

import {ObjectId} from "mongodb";

const router = express.Router();

router.route("/api/users")
  .post(async (req, res) => {
    if (req.body["userName"] && req.body["address"] && req.body["phoneNumber"] && req.body["email"]) {
      const check = req.body["address"];
      console.log(check);
      if (check.includes("-si") || check.includes("-gu") || check.includes("-dong")) {
        const newUser = await createUser(req.body);
        res.status(201).send(newUser);
        console.log("생성 성공");
      } else {
        res.status(406).send(req.body);
        console.log("생성 실패");
      }
    } else {
      res.status(406).send(req.body);
      console.log("fail");
    }
  })

  .get(async (req, res) => {
    const findUser = await findAll();
    console.log(findUser);
  });
router.route("/api/users/:userName")
  .get(async (req, res) => {
    if (req.params.userName) {
      const findUser = await findByName(req.params.userName);
      console.log(findUser);
      if (findUser !== undefined) {
        res.status(200).send(`${JSON.stringify(findUser)}`);
        console.log(" 찾음");
      } else
        console.log("못찾음");
    }
  });

router.route("/api/users/:email")
  .get(async (req, res) => {
  });

router.route("/api/users/:address")
  .get(async (req, res) => {
    if (req.params.address) {
      const findUser = await findByAddress(req.params.address);
      console.log(findUser);
      if (findUser !== undefined) {
        res.status(200).send(`${JSON.stringify(findUser)}`);
        console.log(`찾음`);
      } else
        console.log("못찾음");
    }
  });

router.route("/api/users/:id")
  .delete(async (req, res) => {
    const deleteUser = await deleteById(req.params.id);
    console.log(`${req.params.id}님이 삭제`);
    res.status(201).send(deleteUser);
  });

export default router;