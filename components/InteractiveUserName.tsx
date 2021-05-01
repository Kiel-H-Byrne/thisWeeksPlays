import React from "react";
import {
  Avatar,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Table,
  Text,
  Th,
  Tr,
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
          <Table>
            <Tr><Th>Stat</Th></Tr>
            {/* <Tr></Tr> */}
          </Table>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
