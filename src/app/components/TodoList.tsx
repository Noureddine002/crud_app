import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ITask } from "../../../types/task";
import React from "react";
import Task from "./Task";

interface TodoListProps {
  todos: ITask[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Task</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos.length
            ?
              todos.map(todo => (
                <Task key={todo.id} task={todo} />
              ))
            :
              null
          }
        </TableBody>
      </Table>
    </div>
  );
};

export default TodoList;
