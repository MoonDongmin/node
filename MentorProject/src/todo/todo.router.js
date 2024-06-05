import { TodoHandler } from "./todo.handler.rdb.js"; // 또는 원하는 TodoHandler 모듈 경로

import express from "express";
const todoRouter = express.Router();

// 전체 조회
todoRouter.get('/', async (req, res) => {
    try {
        const data = await TodoHandler.findAll(); // await를 사용하여 Promise를 기다림
        res.send(data);
    } catch (err) {
        console.error("전체 조회 오류:", err);
        res.status(500).send("서버 오류 발생");
    }
});

// 추가
todoRouter.post('/', async (req, res) => {
    try {
        const body = req.body;
        const addedTodo = await TodoHandler.add(body); // await를 사용하여 Promise를 기다림
        res.json(addedTodo);
    } catch (err) {
        console.error("추가 오류:", err);
        res.status(500).send("서버 오류 발생");
    }
});

// 수정
todoRouter.patch('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const body = req.body;
        const updatedTodo = await TodoHandler.update(id, body); // await를 사용하여 Promise를 기다림
        res.send("수정 완료");
    } catch (err) {
        console.error("수정 오류:", err);
        res.status(500).send("서버 오류 발생");
    }
});

// 삭제
todoRouter.delete('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        await TodoHandler.remove(id); // await를 사용하여 Promise를 기다림
        res.send("삭제 완료");
    } catch (err) {
        console.error("삭제 오류:", err);
        res.status(500).send("서버 오류 발생");
    }
});

export { todoRouter };
