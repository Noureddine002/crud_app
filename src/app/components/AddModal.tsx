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
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo } from "../api/todosApi";

interface ModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

const AddModal: React.FC<ModalProps> = ({ setIsOpen, isOpen }) => {
  
  const [taskText, setTaskText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const queryClient = useQueryClient();



  const addTaskMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setTaskText("");
      setErrorMessage("");
      setIsOpen(false);
    },
    onError: (error) => {
      console.error("Failed to add task:", error);
    },
  });

  useEffect(() => {
    if (!isOpen) {
      setTaskText("");
      setErrorMessage("");
    }
  }, [isOpen]);

    const handleAddTask = () => {
      if (taskText.trim().length < 3) {
        setErrorMessage("Task must be at least 3 characters long");
        return;
      } else if (taskText.length > 50) {
        setErrorMessage("Task cannot exceed 50 characters");
        return;
      }
      setErrorMessage("");
      addTaskMutation.mutate(taskText);
    };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new task to your Todo list</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="text" className="text-right">
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
          {errorMessage && (
            <p className="text-red-500 text-sm col-span-4">{errorMessage}</p>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleAddTask}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddModal;
