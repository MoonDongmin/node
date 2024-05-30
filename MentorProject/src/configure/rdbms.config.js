// ../configure/rdbms.config.js

import sqlite3 from 'sqlite3';

let db;

const open = () => {
    db = new sqlite3.Database(':memory:');
};

const close = () => {
    db.close();
};

const createTable = () => {
    return `CREATE TABLE IF NOT EXISTS todo(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    status TEXT
  )`;
};

const insertDummy = () => {
    return `INSERT INTO todo (title, status) 
          VALUES ('첫 번째 할일','진행중'),
                 ('두 번째 할일','완료'),
                 ('세 번째 할일','대기중'),
                 ('네 번째 할일','진행중'),
                 ('다섯 번째 할일','완료')`;
};

const initialize = () => {
    runCommand(createTable());
    runCommand(insertDummy());
};

const runCommand = (query) => {
    return new Promise((resolve, reject) => {
        db.run(query, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ lastID: this.lastID, changes: this.changes });
            }
        });
    });
};

const getQuery = (query) => {
    return new Promise((resolve, reject) => {
        db.get(query, (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

const allQuery = (query) => {
    return new Promise((resolve, reject) => {
        db.all(query, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const RdbmsConfig = {
    open,
    close,
    initialize,
    runCommand,
    getQuery,
    allQuery,
};

export default RdbmsConfig;
