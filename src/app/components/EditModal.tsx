"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState, useEffect } from "react";
import { ITask } from "../../../types/task";
import { updateTodo } from "../api/todosApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  task: ITask;
}

const EditModal: React.FC<ModalProps> = ({ task, setIsOpen, isOpen }) => {
  
  const [value, setValue] = useState(task.completed);
  const [taskText, setTaskText] = useState(task.text);
  const [errorMessage, setErrorMessage] = useState("");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isOpen) {
      setTaskText(task.text); 
      setValue(task.completed);
      setErrorMessage("");
    }
  }, [isOpen, task]);

  const UpdateTaskMutation = useMutation({
    mutationFn: ({
      id,
      text,
      completed,
    }: {
      id: string;
      text: string;
      completed: boolean;
    }) => updateTodo(id, text, completed),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setErrorMessage("");
      setIsOpen(false);
    },
    onError: (error) => {
      console.error("Failed to add task:", error);
    },
  });

  const handleUpdateTask = () => {
    if (taskText.trim().length < 3) {
      setErrorMessage("Task must be at least 3 characters long");
      return;
    } else if (taskText.length > 50) {
      setErrorMessage("Task cannot exceed 50 characters");
      return;
    }
    setErrorMessage("");
    UpdateTaskMutation.mutate({
      id: task.id,
      text: taskText,
      completed: value,
    });
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit your task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Task
            </Label>
            <Input
              id="text"
              defaultValue=""
              className="col-span-3"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Status
          </Label>
          <div className="col-span-3 flex items-center space-x-2">
            <input
              type="checkbox"
              id="completed"
              checked={value}
              onChange={(e) => setValue(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <label
              htmlFor="completed"
              className="text-sm font-medium text-gray-700"
            >
              {value ? "Completed" : "Uncompleted"}
            </label>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm col-span-4">{errorMessage}</p>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleUpdateTask}>Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
