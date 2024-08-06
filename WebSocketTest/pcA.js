import chokidar from 'chokidar';
import WebSocket from 'ws';

const saveDir = './test';
const server = 'ws://localhost:3000';

const ws = new WebSocket(server);

ws.on('open', function open() {
    console.log('WebSocket 클라이언트 연결됨');
});

const watcher = chokidar.watch(saveDir, {persistent: true});

watcher.on('add', (path) => {
    console.log(`파일이 추가됨: ${path}`);
    ws.send(JSON.stringify({event: 'fileAdded', path: path}));
});
