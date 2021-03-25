import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { InputForm } from "@/components/InputForm";
import { useSession } from "next-auth/client";


const FormModalButton = () => {
  const [open, setOpen] = useState(false);
  const [session, loading] = useSession();
  const toggleModalOpen = () => {
    setOpen(!open);
    return !open;
  };
  if (session) {
    console.log(session);
  }
  return (
    <>
      <Button onClick={() => toggleModalOpen()}>Submit Your Play</Button>

      <Modal
        closeOnOverlayClick={true}
        isOpen={open}
        onClose={() => toggleModalOpen()}
        size={"xl"}
      >
        <ModalOverlay />
        {session ? (
          <ModalContent>
            <ModalHeader>Submit your Play</ModalHeader>
            <ModalBody pb={6}>
              <InputForm />
            </ModalBody>
          </ModalContent>
        ) : (
          <ModalContent>Register / Log In</ModalContent>
        )}
      </Modal>
    </>
  );
};

export default FormModalButton;
