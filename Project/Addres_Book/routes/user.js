import express from "express";
import{
  createUser,
  findUser,
  updateUser,
  deleteByName
} from "./index.js";

const router = express.Router();

router.route("/api/users")