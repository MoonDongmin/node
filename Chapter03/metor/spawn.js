// const spawn = require('child_process').spawn;

import {spawn} from 'child_process';


const process = spawn('python',['test.py']);
// const process = spawn('python');

process.stdout.on('data',function (data){
    console.log(data.toString());
})

process.stderr.on('data',function (data){
    console.error(data.toString());
})

// 잡히긴 하는데 실행이 안돼



