import {
  Box,
  Button,
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { InputForm } from "@/components/InputForm";
import { signIn, useSession } from "next-auth/client";


const FormModalButton = () => {
  const { isOpen, onToggle, onClose} = useDisclosure()
  const [session, loading] = useSession();
  // if (session) {
  //session.user.name / user.email / user.image
  // }
  return (
    <Box margin="3">
      <Center>
        <Button padding="7" onClick={onToggle} colorScheme="green">
          Submit Your Play!
        </Button>
      </Center>

      <Modal
        closeOnOverlayClick={true}
        isOpen={isOpen}
        onClose={onClose}
        size={"xl"}
      >
        <ModalOverlay />
        {!loading && session ? (
          <ModalContent>
            <ModalHeader textAlign="center" padding="-2" backgroundColor="#9BA17B" color="white">Submit your Play</ModalHeader>
            <ModalBody pb={6}>
              <InputForm
                onClose={onClose}
                userName={session.user.name}
              />
            </ModalBody>
          </ModalContent>
        ) : (
          <ModalContent>
            <Center padding="22">
              <Button onClick={() => signIn()}>Register / Log In</Button>
            </Center>
          </ModalContent>
        )}
      </Modal>
    </Box>
  );
};

export default FormModalButton;
