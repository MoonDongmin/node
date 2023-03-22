import express from "express";
import {
  createUser, findAll, findByAddress, findByEmail, findByName, deleteById,
  updateUserByEmail, updateUserByName, updateUserByAddress, updateUserByPhoneNumber,
} from "./index.js";

import {ObjectId} from "mongodb";
import jwt from "jsonwebtoken";

const router = express.Router();

router.route("/api/users")
  .post(async (req, res) => {
    if (req.body["userName"] && req.body["address"] && req.body["phoneNumber"] && req.body["email"]) {
      const check = req.body["address"];
      console.log(check);
      if (check.includes("-si") || check.includes("-gu") || check.includes("-dong")) {
        await createUser(req.body);
        const payload = {
          user: {
            id: req.body["id"],
            userName: req.body["userName"],
            address: req.body["address"],
            email: req.body["email"],
            phoneNumber: req.body["phoneNumber"],
          },
        };
        jwt.sign(
          payload,
          "jwtSecret",
          {expiresIn: "1h"},
          (err, token) => {
            if (err) throw err;
            res.status(200).send({token});
          },
        );
        console.log("생성 성공");
      } else {
        res.status(406).send(req.body);
        console.log("생성 실패");
      }
    } else {
      res.status(406).send(req.body);
      console.log("생성 실패");
    }
  })


  .get(async (req, res) => {
    const findUser = await findAll();
    console.log(findUser);
  });


router.route("/api/users/userName/:userName")
  .get(async (req, res) => {
    if (req.params.userName) {
      const findUser = await findByName(req.params.userName);
      console.log(findUser);
      if (findUser !== undefined) {
        res.status(200).send(`${JSON.stringify(findUser)}`);
        console.log("찾음");
      } else
        console.log("못찾음");
    }
  });

router.route("/api/users/email/:email")
  .get(async (req, res) => {
    const findUserEmail = await findByEmail(req.params.email);
    console.log(findUserEmail);
    if (findUserEmail !== undefined) {
      res.status(200).send(`${JSON.stringify(findUserEmail)}`);
      console.log("찾음!");
    } else
      console.log("못찾음");
  });

router.route("/api/users/address/:address")
  .get(async (req, res) => {
    const findUser = await findByAddress(req.params.address);
    console.log(findUser);
    if (findUser !== undefined) {
      res.status(200).send(`${JSON.stringify(findUser)}`);
      console.log("찾음");
    } else
      console.log("못찾음");
  });

router.route("/api/users/:id")
  .patch(async (req, res) => {
    if (req.body["userName"]) {
      const id = new ObjectId(req.params.id);
      const updateName = await updateUserByName(id, req.body["userName"]);
      res.status(200).send(`${JSON.stringify(updateName)}`);
      console.log("이름 수정 완료");
    } else if (req.body["address"]) {
      const id = new ObjectId(req.params.id);
      const updateAddress = await updateUserByAddress(id, req.body["address"]);
      res.status(200).send(`${JSON.stringify(updateAddress)}`);
      console.log("주소 수정 완료");
    } else if (req.body["phoneNumber"]) {
      const id = new ObjectId(req.params.id);
      const updateNumber = await updateUserByPhoneNumber(id, req.body["phoneNumber"]);
      res.status(200).send(`${JSON.stringify(updateNumber)}`);
      console.log("전화번호 수정 완료");
    } else if (req.body["email"]) {
      const id = new ObjectId(req.params.id);
      const updateEmail = await updateUserByEmail(id, req.body["email"]);
      res.status(200).send(`${JSON.stringify(updateEmail)}`);
      console.log("이메일 수정 완료");
    } else {
      console.log("생성실패");
    }
  })

  .delete(async (req, res) => {
    const deleteUser = await deleteById(req.params.id);
    console.log(`${req.params.id}님이 삭제`);
    res.status(201).send(deleteUser);
  });


export default router;