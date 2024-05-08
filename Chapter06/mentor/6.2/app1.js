import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(session({
    secret:'hi',
    resave: false,
    saveUninitialized: false
}));

app.get('/', (req, res) => {
    let visitCount = req.session.visitCount || 0;
    visitCount++;
    req.session.visitCount = visitCount;

    let lastVisit = req.cookies.lastVisit || '첫 방문';

    res.cookie('lastVisit', new Date().toString(), { maxAge: 900000, httpOnly: true });

    res.send(`
        <h1>방문 횟수: ${visitCount}</h1>
        <h2>마지막 방문 일시: ${lastVisit}</h2>
    `);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
