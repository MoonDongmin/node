import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import FileStoreFactory from 'session-file-store';

const FileStore = FileStoreFactory(session);

const app = express();
const port = 3000;

// body-parser 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: true }));

// express-session 및 session-file-store 미들웨어 설정
app.use(session({
    store: new FileStore({ path: './sessions', logFn: function() {} }), // 세션 데이터를 저장할 폴더 경로
    secret: 'your-secret-key',  // 세션 암호화를 위한 비밀 키
    resave: false,  // 세션이 수정되지 않더라도 저장
    saveUninitialized: true,  // 초기화되지 않은 세션을 저장
    cookie: { maxAge: 60000 }  // 쿠키의 유효 기간 (1분)
}));

app.get('/', (req, res) => {
    res.send('Welcome to the Signup App!');
});

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
app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    // 세션에 사용자 정보 저장
    req.session.username = username;

    res.send('회원가입이 완료되었습니다!');
});

app.get('/check', (req, res) => {
    if (req.session.username) {
        res.send(`Welcome, ${req.session.username}!`);
    } else {
        res.send('No user signed in.');
    }
});

app.listen(port, () => {
    console.log(`서버가 열렸습니다. http://localhost:${port}`);
});
