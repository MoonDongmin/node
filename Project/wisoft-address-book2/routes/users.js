import express from "express";
import {checkUser, registeruser} from "./index.js";
import {validation} from "../validation/signup.js";
import {createUser} from "./address.js";
//연결
const router = express.Router();

router.route("/api/users")
    .post(async (req, res) => {
        const validateUser = await validation(req.body);
        const registerUser = await registeruser(validateUser);
        console.log(registerUser);
        res.send("성공");
    });
router.route("/api/users/:username")
    .get(async (req, res) => {
        const result = await findByName(req.params.username);
        console.log(result);
        res.send("성공");
    });

router.route("/api/users/:id")
    .delete(async (req, res) => {
        const deletedUser = await deleteById(req.params.id);
        console.log(deletedUser, '성공');
        res.send("삭제됨");
    })

router.route("/api/users/signup")
    .post(async (req, res) => {
        const master = await checkUser(req.body);
        console.log(master);
        res.send("성공");
    })
router.route("/api/users/address")
    .post(async(req,res)=>{
        const master = await checkUser(req.body);
        if(master!==undefined){
            const user = await createUser(req.body);
            res.send(user);
        }else{
            console.log("로그인실패");
        }
    })



export default router;