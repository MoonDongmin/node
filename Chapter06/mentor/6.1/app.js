import express from 'express';
import "dotenv/config";

import * as path from "path";

const __dirname = path.resolve();
const app = express();

app.set('port', process.env.PORT || 3000);

app.use((req, res, next) => {
    console.log('모든 요청에 다 실행됨');
    next();
})

// app.get('/', (req, res, next) => {
//     console.log('GET / 요청에서만 실행됨');
//     next();
// }, (req, res) => {
//     throw new Error('에러는 에러 처리 미들웨어로 감');
// });

app.get('/', (req, res) => {
    // res.send('Hello, Express');
    // res.sendFile(path.join(__dirname, '/index.html'));
    res.sendFile(path.join(process.cwd(), '/index.html'));
});

app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).send(err.message);
})


app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
})

// app.listen(app.get('port'));