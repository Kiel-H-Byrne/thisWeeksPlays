import { Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Comment } from "../types";
import { InteractiveUserName } from './InteractiveUserName';

export const CommentCard = ({ uid, userName, comment}: Comment) => {
  //form input comment, and onsubmit send to api.
  return (
    <Flex key={uid} marginInline="3" direction="row">
      <VStack alignItems="flex-start" flexShrink={0}>
        <InteractiveUserName {...{userName, uid}} showAvatar={true} />
        <Text>{comment}</Text>
      </VStack>
    </Flex>
  );
};
