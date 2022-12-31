const url = require('url');

const {URL} = url;
const myURL = new URL('http://www.gilbut.co.kr/book/bookList.apx?sercat1=001001000#anchor');
console.log('new URL():',myURL);
console.log('url.format():',url.format(myURL));
console.log('-------------------------');
const parsudUrl = url.parse('http://www.gilbut.co.kr/book/bookList.apx?sercat1=001001000#anchor');
console.log('url.parse():',parsudUrl);
console.log('url.format():',url.format(parsudUrl))