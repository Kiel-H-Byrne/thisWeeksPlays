import React from "react";
import {
  Avatar,
  Box,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";

export const InteractiveUserName = ({
  userName,
  uid,
}: {
  userName: string;
  uid: string;
}) => {
  return (
    <Popover placement="auto-end" trigger="hover">
      <PopoverTrigger>
        <Flex>
          <Avatar
            src={`https://avatars.dicebear.com/api/bottts/${uid}.svg`}
            size="xs"
          ></Avatar>{" "}
          <Text>@{userName}</Text>
        </Flex>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader
          fontWeight="semibold"
          fontSize="sm"
          textTransform="capitalize"
        >
          {userName}:
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody fontWeight="normal" fontSize="sm">
          fetch stats on suchandsuch
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
