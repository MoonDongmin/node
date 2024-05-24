import {TodoHandler} from "./todo.handler.js";
import express from "express";
import {TodoData} from "./todo.data.js";



export const todoRouter = new express.Router();

// 전체 조회
 todoRouter
     .get('/', (req, res) => {
  const data = TodoHandler.findAll();
  res.send(data);
 })

     .post('/', (req, res) => {
      const body = req.body;
      TodoHandler.add(body);
      res.json(body);
     })



