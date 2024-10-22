"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import { ITask } from "../../../types/task";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo } from "../api/todosApi";

interface ModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  task: ITask;
}

const DeleteModal: React.FC<ModalProps> = ({ task, setIsOpen, isOpen }) => {
  
  const queryClient = useQueryClient();
  
  const deleteTaskMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setIsOpen(false);
    },
    onError: (error) => {
      console.error("Failed to add task:", error);
    },
  });

  const handleDeleteTask = async () => {
    deleteTaskMutation.mutate(task.id);
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this task ?</DialogTitle>
        </DialogHeader>
        <Button variant={"destructive"} onClick={handleDeleteTask}>
          Delete
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
