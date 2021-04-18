import { Box, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Comment } from "../types";

export const CommentCard = ({ uid, userName, comment}: Comment) => {
  //form input comment, and onsubmit send to api.
  return (
    <Box key={uid} marginInline="3" style={{ display: "inline-flex" }}>
      <img
        alt={userName}
        src={`https://avatars.dicebear.com/api/bottts/${uid}.svg`}
        height="43px"
        width="43px"
      />
      <VStack alignItems="flex-start">
        <Text>{comment}</Text>
        <Text>@{userName}</Text>
      </VStack>
    </Box>
  );
};
