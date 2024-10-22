"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export const getAllTodos = async () => {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: [
        {
          completed: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
    return todos;
  } catch (error) {
    console.error("Error getting the tasks : ", error);
    throw error;
  }
};

export const addTask = async (taskText: string) => {
  try {
    const newTodo = await prisma.todo.create({
      data: {
        text: taskText,
        completed: false,
      },
    });
    revalidatePath("/");
    return newTodo;
  } catch (error) {
    console.error("Error creating new task : ", error);
    throw error;
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    const deletedTodo = await prisma.todo.delete({
      where: {
        id: taskId,
      },
    });
    revalidatePath("/");
    return deletedTodo;
  } catch (error) {
    console.error("Error deleting the task : ", error);
    throw error;
  }
};

export const updateTask = async (
  id: string,
  text: string,
  completed: boolean
) => {
  try {
    const updateTodo = await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        text: text,
        completed: completed,
      },
    });
    revalidatePath("/");
    return updateTodo;
  } catch (error) {
    console.error("Error updating the task: ", error);
    throw error;
  }
};
