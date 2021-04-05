import { Box, VStack } from "@chakra-ui/react";
import React from "react";
import { Comment } from "../types";

export const CommentCard = ({ uid, userName, message }: Comment) => {
  return (
    <Box key={uid as any} className={""} style={{ display: "inline-flex" }}>
        <img
          alt="image"
          src={`https://avatars.dicebear.com/api/bottts/${uid}${Math.random()*234}.svg`}
          className={""}
          height="43px"
          width="43px"
        />
      <VStack>
        <Box>{message}</Box>
        <Box>@{userName}</Box>
      </VStack>
    </Box>
  );
};
