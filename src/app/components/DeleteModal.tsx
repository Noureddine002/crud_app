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
  task: ITask;
}

const DeleteModal: React.FC<ModalProps> = ({ task, setIsOpen, isOpen }) => {

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this task ?</DialogTitle>
        </DialogHeader>
          <Button variant={"destructive"} type="submit">Delete</Button>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
