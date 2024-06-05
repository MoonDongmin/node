// import RdbmsConfig from '../configure/rdbms.config.js';


import RdbmsConfig from "../configure/rdbms.config.js";

const findAll =  () => {
    const query = "SELECT * FROM todo";
    return RdbmsConfig.allQuery(query);
};

const findById = (id) => {
    const query = `SELECT * FROM todo WHERE id = ${id}`;
    return RdbmsConfig.getQuery(query);
};

const add = (todo) => {
    const query = `INSERT INTO todo (title, status) 
                 VALUES ('${todo.title}', '${todo.status}') RETURNING *`;
    return RdbmsConfig.getQuery(query);
};

const update = (id, todo) => {
    const query = `UPDATE todo SET title='${todo.title}', status='${todo.status}'
                 WHERE id = '${id}' RETURNING *`;
    return RdbmsConfig.getQuery(query);
};

const remove = (id) => {
    const query = `DELETE FROM todo WHERE id = '${id}' RETURNING *`;
    return RdbmsConfig.getQuery(query);
};

export const TodoHandler = {
    findAll,
    findById,
    add,
    update,
    remove,
};
