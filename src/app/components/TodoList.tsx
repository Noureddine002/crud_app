"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import Task from "./Task";
import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "../api/todosApi";
import AddTask from "./AddTask";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ITask } from "../../../types/task";

const TodoList =  () => {

  const {
    data: todos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if(isLoading) {
    return <LoadingSpinner />;
  }

  if(error){
    return <div>Error from our side, come back later... </div>;
  }

  return (
    <>
      <AddTask />
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {todos
              ? todos.map((todo: ITask) => <Task key={todo.id} task={todo} />)
              : null}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default TodoList;
