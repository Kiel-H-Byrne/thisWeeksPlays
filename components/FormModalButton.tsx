import {
  Box,
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
  // if (session) {
  //session.user.name / user.email / user.image
  // }
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
        {!loading && session ? (
          <ModalContent>
            <ModalHeader>Submit your Play</ModalHeader>
            <ModalBody pb={6}>
              <InputForm toggleModal={toggleModalOpen} userName={session.user.name}/>
            </ModalBody>
          </ModalContent>
        ) : (
          <ModalContent><Box><Button>Register / Log In</Button></Box></ModalContent>
        )}
      </Modal>
    </>
  );
};

export default FormModalButton;
