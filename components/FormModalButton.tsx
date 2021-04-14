import {
  Box,
  Button,
  Center,
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
    <Box margin="3">
      <Center>
        <Button padding="7" onClick={() => toggleModalOpen()} colorScheme="green">
          Submit Your Play!
        </Button>
      </Center>

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
              <InputForm
                toggleModal={toggleModalOpen}
                userName={session.user.name}
              />
            </ModalBody>
          </ModalContent>
        ) : (
          <ModalContent>
            <Box>
              <Button>Register / Log In</Button>
            </Box>
          </ModalContent>
        )}
      </Modal>
    </Box>
  );
};

export default FormModalButton;
