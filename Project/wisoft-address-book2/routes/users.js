import express from "express";
import {registeruser} from "./index.js";
import { validation } from "../validation/signup.js";
//연결

const router = express.Router();
/*
if(req.body.id.length <= 12)&&(req.body.id.length > 4)
{
}
*/
router.route("/api/users")
    .post(async (req, res) => {
        const result  = await validation(req.body);
        console.log(result);
    });

export default router;


/*
if((req.body["id"].length<4) || (req.body["id"].length>12)){
  res.status(400);
}
*/
