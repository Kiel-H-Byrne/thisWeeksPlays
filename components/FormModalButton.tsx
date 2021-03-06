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

const initialData: Order = {
  id: "", //any
  ticker: "", //string
  sentiment: Sentiment.Neutral, //keyof typeof Sentiment
  instrument: Instruments.Crypto, //ValueOf<Instruments>
  entryPrice: 0, //number
  targetAmount: 0, //number
  exitStrategy: "", //string
  submitDate: new Date(), //Date
  upVotes: 0, //number
  downVotes: 0, //number
  reasoning: Reasons.News, //keyof typeof Reasons
  isWatching: false, //boolean
  isShort: false, //boolean
  userName: "", //string
  orderAmount: 0, //number
  // optionsStrategy: OptionStrategies.DEBIT_CALL, //ValueOf<OptionStrategies>
  riskAmount: 0, //number
  screenShot: "", //string
  uid: "", //string
};

const FormModalButton = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialData);

  const toggleModalOpen = () => {
    setOpen(!open);
    return !open;
  };
  console.log(formData)
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

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={() =>insertOrder(db, formData)}>
              Submit
            </Button>
            <Button onClick={() => toggleModalOpen()}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FormModalButton;
