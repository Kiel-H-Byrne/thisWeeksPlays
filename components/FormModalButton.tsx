import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { InputForm } from "../components/InputForm";


const FormModalButton = () => {
  const [open, setOpen] = useState(false);

  const toggleModalOpen = () => {
    setOpen(!open);
    return !open;
  };
  return (
    <>
      <Button onClick={() => toggleModalOpen()}>Open Modal</Button>

      <Modal
        closeOnOverlayClick={true}
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
