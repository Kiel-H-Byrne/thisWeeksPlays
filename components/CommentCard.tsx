import { Box, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Comment } from "../types";
import { InteractiveUserName } from './InteractiveUserName';

export const CommentCard = ({ uid, userName, comment}: Comment) => {
  //form input comment, and onsubmit send to api.
  console.log(uid)
  return (
    <Box key={uid} marginInline="3" style={{ display: "inline-flex" }}>
      <VStack alignItems="flex-start">
        <Text>{comment}</Text>
        <InteractiveUserName {...{userName, uid}} />
      </VStack>
    </Box>
  );
};
