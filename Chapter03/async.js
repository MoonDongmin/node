const fs = require('fs');

console.log('시작');
fs.readFile('./readme2.txt',(err,data)=>{
    if(err){
        throw err;
    }
    console.log('1번',data.toString());
});
fs.readFile('./readme2.txt',(err,data)=>{
    if(err){
        throw err;
    }
    console.log('2번',data.toString());
});
fs.readFile('./readme2.txt',(err,data)=>{
    if(err){
        throw err;
    }
    console.log('3번',data.toString());
});
console.log('끝');

console.log('require가 가장 위에 오지 않아도 됩니다.');

module.exports = '저를 찾아보세요';
const a = require('./var');

console.log('require.cache 입니다.');
console.log(require.cache);


console.log('require.main 입니다')
console.log(require.main === module);
console.log(require.main.filename);