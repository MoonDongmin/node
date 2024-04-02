import http from "http";

http.createServer((req, res) => {
    console.log(req.url, req.headers.cookie);
    res.writeHead(200, {'Set-Cookie': 'mycookie=test'});
    res.end('Hello Cookie');
})
    .listen(808, () => {
        console.log('808번 포트에서 서버 대기중');
    });