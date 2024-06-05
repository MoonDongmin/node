import sqlite3 from "sqlite3";
import { promisify } from "util";

const rdbms = new sqlite3.Database(":memory:");

const open = () => {
    return new Promise((resolve, reject) => {
        rdbms.on('open', () => {
            console.log('SQLite 데이터베이스가 열렸습니다.');
            resolve();
        });
    });
};
const close = () => promisify(rdbms.close.bind(rdbms))();
const getQuery = (query) => promisify(rdbms.get.bind(rdbms))(query);
const allQuery = (query) => promisify(rdbms.all.bind(rdbms))(query);
const runCommand = (query) => promisify(rdbms.run.bind(rdbms))(query);

const createTable = () => {
    return `CREATE TABLE IF NOT EXISTS todo(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    status TEXT
    )`;
};

const insertDummy = () => {
    return `INSERT INTO todo (title, status) 
            values ('First  Todo','pending'),
            ('Second  Todo','done'),
            ('Third  Todo','pending'),
            ('Fourth  Todo','progress'),
            ('Fifth  Todo','pending')`;
};

const initialize = async () => {

         runCommand(createTable())};

 const RdbmsConfig = {
     open,
    initialize,
    getQuery,
    allQuery,
    close,
};

export default RdbmsConfig;
