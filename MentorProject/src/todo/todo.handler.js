import {TodoData} from "./todo.data.js";

// Todo 사용자 조회
const findAll = () => {
  return TodoData.todoData;
}

// Todo 생성
const add = (todo)=>{
  const newTodo = {
    id: TodoData.todoData.length +1,
    ...todo
  };

  TodoData.todoData.push(newTodo);
  return newTodo
}

export const TodoHandler = {
  findAll,
  add
};
