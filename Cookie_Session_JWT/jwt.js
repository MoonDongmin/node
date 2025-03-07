import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app = express();
const port = 3000;
const secretKey = 'your-secret-key';

// body-parser 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: true }));

// 그냥 배열에다가 넣는 식으로 사용
const users = [];

// 회원가입 폼 라우트
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

// 회원가입 처리 라우트
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 8);

    // 유저 정보 저장 (여기서는 메모리에 저장)
    users.push({ username, password: hashedPassword });

    res.send('회원가입이 완료되었습니다!');
});

// 로그인 폼 라우트
app.get('/login', (req, res) => {
    res.send(`
    <form action="/login" method="post">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required>
      <br>
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required>
      <br>
      <button type="submit">Login</button>
    </form>
  `);
});

// 로그인 처리 라우트
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // 유저 검색
    const user = users.find(user => user.username === username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send('비밀번호가 달라요');
    }

    // JWT 생성
    const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '5m' });

    res.send(`로그인 성공! \n access: ${token}`);
    console.log(token);
});

// 인증 미들웨어
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

app.get('/check', authenticateJWT, (req, res) => {
    res.send(`Welcome, ${req.user.username}!`);
});

app.listen(port, () => {
    console.log(`서버 열림 http://localhost:${port}`);
});
