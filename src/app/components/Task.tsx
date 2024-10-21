"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import React, { useState } from "react";
import { ITask } from "../../../types/task";
import { GoDotFill } from "react-icons/go";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  return (
    <TableRow key={task.id}>
      <TableCell className="font-medium">{task.id}</TableCell>
      <TableCell>{task.text}</TableCell>
      <TableCell>
        {task.completed ? (
          <div className="flex items-center">
            <GoDotFill className="text-green-600" />
            <span className="ml-2 text-green-600">Completed</span>
          </div>
        ) : (
          <div className="flex items-center">
            <GoDotFill className="text-red-600" />
            <span className="ml-2 text-red-600">Uncompleted</span>
          </div>
        )}
      </TableCell>
      <TableCell className="flex gap-1">
        <>
          <button onClick={() => setModalOpen(true)}>
            <FaRegEdit className="text-blue-600" size={20} />
          </button>
          <EditModal task={task} setIsOpen={setModalOpen} isOpen={modalOpen} />
        </>
        <>
          <button onClick={() => setDeleteModalOpen(true)}>
            <MdOutlineDeleteOutline className="text-red-500" size={20} />
          </button>
          <DeleteModal task={task} setIsOpen={setDeleteModalOpen} isOpen={deleteModalOpen} />
        </>
      </TableCell>
    </TableRow>
  );
};

export default Task;
