import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { InputForm } from "../components/InputForm";
import { Order } from "@/interfaces/order";
import { Instruments, Reasons, Sentiment } from "@/interfaces/util";
import { insertOrder } from "../db";


const FormModalButton = () => {
  const [open, setOpen] = useState(false);
  // const [formData, setFormData] = useState(initialData);

  const toggleModalOpen = () => {
    setOpen(!open);
    return !open;
  };
  return (
    <>
      <Button onClick={() => toggleModalOpen()}>Open Modal</Button>

      <Modal
        closeOnOverlayClick={false}
        isOpen={open}
        onClose={() => toggleModalOpen()}
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Submit your Play</ModalHeader>
          <ModalBody pb={6}>
            <InputForm  />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FormModalButton;
