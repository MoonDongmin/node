// // import RdbmsConfig from '../configure/rdbms.config.js';
// import RdbmsConfig from "../configure/rdbms.config.js";
//
// const findAll =  () => {
//     const query = "SELECT * FROM todo";
//     return RdbmsConfig.allQuery(query);
// };
//
// const findById = (id) => {
//     const query = `SELECT * FROM todo WHERE id = ${id}`;
//     return RdbmsConfig.getQuery(query);
// };
//
// const add = (todo) => {
//     const query = `INSERT INTO todo (title, status)
//                  VALUES ('${todo.title}', '${todo.status}') RETURNING *`;
//     return RdbmsConfig.getQuery(query);
// };
//
// const update = (id, todo) => {
//     const query = `UPDATE todo SET title='${todo.title}', status='${todo.status}'
//                  WHERE id = '${id}' RETURNING *`;
//     return RdbmsConfig.getQuery(query);
// };
//
// const remove = (id) => {
//     const query = `DELETE FROM todo WHERE id = '${id}' RETURNING *`;
//     return RdbmsConfig.getQuery(query);
// };
//
// export const TodoHandler = {
//     findAll,
//     findById,
//     add,
//     update,
//     remove,
// };
import RdbmsConfig from "../configure/rdbms.config.js";

const findAll = async () => {
    const query = "SELECT * FROM todo";
    return await RdbmsConfig.allQuery(query);
};

const findById = async (id) => {
    const query = `SELECT * FROM todo WHERE id = ${id}`;
    return await RdbmsConfig.getQuery(query);
};

const add = async (todo) => {
    const connection = await RdbmsConfig.open();
    try {
        const query = `INSERT INTO todo (title, status) VALUES (?, ?)`;
        const [result] = await connection.execute(query, [todo.title, todo.status]);

        const insertedId = result.insertId;
        const insertedTodoQuery = `SELECT * FROM todo WHERE id = ?`;
        const [rows] = await connection.execute(insertedTodoQuery, [insertedId]);

        return rows[0];
    } catch (error) {
        console.error('쿼리 실행 실패:', error);
        throw error;
    } finally {
        await RdbmsConfig.close(connection);
    }
};

const update = async (id, todo) => {
    const connection = await RdbmsConfig.open();
    try {
        const query = `UPDATE todo SET title = ?, status = ? WHERE id = ?`;
        await connection.execute(query, [todo.title, todo.status, id]);

        const updatedTodoQuery = `SELECT * FROM todo WHERE id = ?`;
        const [rows] = await connection.execute(updatedTodoQuery, [id]);

        return rows[0];
    } catch (error) {
        console.error('쿼리 실행 실패:', error);
        throw error;
    } finally {
        await RdbmsConfig.close(connection);
    }
};

const remove = async (id) => {
    const connection = await RdbmsConfig.open();
    try {
        const query = `DELETE FROM todo WHERE id = ?`;
        const [result] = await connection.execute(query, [id]);

        if (result.affectedRows === 0) {
            return null;
        }

        return { id }; // 삭제된 ID를 반환
    } catch (error) {
        console.error('쿼리 실행 실패:', error);
        throw error;
    } finally {
        await RdbmsConfig.close(connection);
    }
};

export const TodoHandler = {
    findAll,
    findById,
    add,
    update,
    remove,
};
