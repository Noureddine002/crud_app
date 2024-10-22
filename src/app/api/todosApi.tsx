import { getAllTodos, addTask, deleteTask, updateTask } from "../actions/todoActions";

export const fetchTodos = async () => {
  const res = await getAllTodos();
  return res;
};

export const addTodo = async (text: string) => {
  const res = await addTask(text);
  return res;
};

export const deleteTodo = async (id: string) => {
  const res = await deleteTask(id);
  return res;
};

export const updateTodo = async (id: string, text: string, completed: boolean) => {
  const res = await updateTask(id, text, completed);
  return res;
};
