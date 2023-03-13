import express from "express";
import{
  createUser, findAll, findByAddress, findByEmail, findByName, deleteById,
  updateUserByEmail,updateUserByName,updateUserByAddress, updateUserByPhoneNumber
} from "./index.js";

import {ObjectId} from "mongodb";

const router = express.Router();

router.route("/api/users")
.post(async (req,res)=>{
  if(req.body["userName"] && req.body["address"] && req.body["phoneNumber"] && req.body["email"]){
    const check = req.body["address"];
    if(check.include("-si") || check.include("-gu") || check.include("-dong")){
      const newUser = await createUser(req.body);
      res.status(201).send(newUser);
      console.log("생성 성공");
    }else{
      res.status(406).send(req.body);
      console.log("생성 실패");
    }
  }else;{
    res.status(406).send(req.body);
    console.log("생성 실패");
  }
})
export default router;