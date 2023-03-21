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

//여기서 생각해볼게 jwt 안에 내용에 id, email, address를 출력하고 싶지만,
//route의 주소에 따라 출력할 수 있는게 한정됨. -> 라우터를 여러개 만들어서 찍어야함....
router.route("/api/users/jwt/:id")
  .get(async (req, res) => {
    if (true) {
      jwt.sign({"id": req.params.id,"email":req.params.email}, "jwtSECRET",
        {expiresIn: "1h"},
        (err, token) => {
          if (err) throw err;
          res.send({token});
        });
      console.log("jwt 토큰생성 완료");
    } else {
      console.log("jwt 토큰생성 실패");
    }
  });


export default router;