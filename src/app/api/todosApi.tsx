import axios from "axios";
import { ITask } from "../../../types/task";

const todosApi = axios.create({
  baseURL: "http://localhost:5000",
});

export const getAllTodos = async (): Promise<ITask[]> => {
  try {
    const response = await todosApi.get("/todos");
    return response.data;
  } catch {
    return [];
  }
};
