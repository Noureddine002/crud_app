"use client";
import AddModal from "./AddModal";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";



const AddTask = () => {

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <div>
      <Button onClick={() => setModalOpen(true)} className="w-full">
        Add new task <FaPlus />
      </Button>
      <AddModal setIsOpen={setModalOpen} isOpen={modalOpen} />
    </div>
  );
};

export default AddTask;
