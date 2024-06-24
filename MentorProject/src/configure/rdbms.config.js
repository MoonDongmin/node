// import sqlite3 from "sqlite3";
// import { promisify } from "util";
//
// const rdbms = new sqlite3.Database(":memory:");
//
// const open = () => {
//     return new Promise((resolve, reject) => {
//         rdbms.on('open', () => {
//             console.log('SQLite 데이터베이스가 열렸습니다.');
//             resolve();
//         });
//     });
// };
// const close = () => promisify(rdbms.close.bind(rdbms))();
// const getQuery = (query) => promisify(rdbms.get.bind(rdbms))(query);
// const allQuery = (query) => promisify(rdbms.all.bind(rdbms))(query);
// const runCommand = (query) => promisify(rdbms.run.bind(rdbms))(query);
//
// const createTable = () => {
//     return `CREATE TABLE IF NOT EXISTS todo(
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     title TEXT,
//     status TEXT
//     )`;
// };
//
// const insertDummy = () => {
//     return `INSERT INTO todo (title, status)
//             values ('First  Todo','pending'),
//             ('Second  Todo','done'),
//             ('Third  Todo','pending'),
//             ('Fourth  Todo','progress'),
//             ('Fifth  Todo','pending')`;
// };
//
// const initialize = async () => {
//     runCommand(createTable())
// };
//
//  const RdbmsConfig = {
//      open,
//     initialize,
//     getQuery,
//     allQuery,
//     close,
// };
//
// export default RdbmsConfig;
import mysql from 'mysql2/promise';

const config = {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'public',
    port: '3306'
};

let pool;

const open = async () => {
    try {
        pool = await mysql.createPool(config);
        console.log('MySQL 데이터베이스가 열렸습니다.');
        return pool;
    } catch (error) {
        console.error('MySQL 데이터베이스 열기 실패:', error);
        throw error;
    }
};

const close = async () => {
    if (pool) {
        try {
            await pool.end();
            console.log('MySQL 데이터베이스가 닫혔습니다.');
        } catch (error) {
            console.error('MySQL 데이터베이스 닫기 실패:', error);
            throw error;
        }
    }
};

const getQuery = async (query) => {
    try {
        const [rows] = await pool.query(query);
        return rows;
    } catch (error) {
        console.error('쿼리 실행 실패:', error);
        throw error;
    }
};

const allQuery = getQuery;

const runCommand = async (query) => {
    try {
        const [result] = await pool.execute(query);
        return result;
    } catch (error) {
        console.error('명령 실행 실패:', error);
        throw error;
    }
};

const createTable = () => {
    return `CREATE TABLE IF NOT EXISTS todo(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    status VARCHAR(50)
  )`;
};

const insertDummy = () => {
    return `INSERT INTO todo (title, status) 
          VALUES ('First Todo', 'pending'),
                 ('Second Todo', 'done'),
                 ('Third Todo', 'pending'),
                 ('Fourth Todo', 'progress'),
                 ('Fifth Todo', 'pending')`;
};

const initialize = async () => {
    await runCommand(createTable());
    await runCommand(insertDummy());
};

const RdbmsConfig = {
    open,
    initialize,
    getQuery,
    allQuery,
    close
};

export default RdbmsConfig;
