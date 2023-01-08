const fs = require('fs').promises;

async function main(){
    console.log('시작');
    let data;
    for(let i=1; i<=3; i++){
        data = await fs.readFile('./readme2.txt');
        console.log(`${i}번`,data.toString());    
    }
    // let data = await fs.readFile('./readme2.txt')
    // console.log('1번',data.toString());
    // data = await fs.readFile('./readme2.txt')
    // console.log('2번',data.toString());
    // data = await fs.readFile('./readme2.txt')
    // console.log('3번',data.toString());
    console.log('끝');
}

main();