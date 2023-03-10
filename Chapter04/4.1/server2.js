const http = require('http');
const fs = require('fs').promises;

http.createServer(async(req, res)=>{
    try{
        const data = await fs.readFile('./server2.html');
        res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
        res.end(data);
    }catch(error){
        console.error(err);
        res.writeHead(500,{'Content-Type':'text/plain; charset=utf-8'});
        res.end(err.message);
    }
})
.listen(808,()=>{
    console.log('808번 포트에서 서버 대기중');
})