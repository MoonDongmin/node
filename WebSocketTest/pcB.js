import  { WebSocketServer } from "ws";
import fs from "fs";
import * as path from "node:path";

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {
    console.log('WebSocket 서버에 클라이언트 연결됨');

    ws.on('message', function incoming(data) {
        const message = JSON.parse(data);

        if (message.event === 'fileAdded') {
            const filePath = message.path;

            const newFilePath = path.join('./test2', path.basename(filePath));
            fs.copyFile(filePath, newFilePath, (err) => {
                if (err) throw err;
                console.log('파일 처리 완료:', newFilePath);
            });
        }
    });
});
