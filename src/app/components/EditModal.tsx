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

interface ModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  task: ITask
}

const EditModal: React.FC<ModalProps> = ({ task, setIsOpen, isOpen }) => {

  const [value, setValue] = useState(task.completed);

  useEffect(() => {
    setValue(task.completed);
  }, [task.completed, isOpen]);

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
            <Input id="name" defaultValue={task.text} className="col-span-3" />
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
        </div>
        <DialogFooter>
          <Button type="submit">Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
