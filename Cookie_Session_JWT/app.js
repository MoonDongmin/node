import express from "express";
import * as http from "node:http";
import cookieParser from "cookie-parser";
import * as bodyParser from "express";

const app = express();

app.set("port", 3000);

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.send('Welcome to the Signup App!');
});

app.get('/signup', (req, res) => {
    res.send(`
    <form action="/signup" method="post">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required>
      <br>
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required>
      <br>
      <button type="submit">Sign Up</button>
    </form>
  `);
});

app.post('/signup', (req, res) => {
    const {username, password} = req.body;

    // 유저 정보 저장 (여기서는 예제이므로 생략)
    // ...

    // 쿠키 설정
    res.cookie('username', username, {maxAge: 900000, httpOnly: true});

    res.send('회원가입이 완료되었습니다!');
});

app.get('/check', (req, res) => {
    const username = req.cookies.username;

    if (username) {
        res.send(`환영합니다., ${username}!`);
    } else {
        res.send('사용자가 회원가입하지 않았습니다.');
    }
});


const appServer = http.createServer(app);

appServer.listen(app.get("port"), () => {
    console.log(`${app.get("port")}에서 서버실행중.`);
});
