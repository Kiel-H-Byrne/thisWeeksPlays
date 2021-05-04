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
  Thead,
  Tbody,
  Tr,
} from "@chakra-ui/react";
import { useUser } from '../hooks';

export const InteractiveUserName = ({
  userName,
  uid,
}: {
  userName: string;
  uid: string;
}) => {
  const user = useUser(uid)
  // user && console.log(user)
  return (
    <Popover placement="auto-end" trigger="hover">
      <PopoverTrigger>
        <Flex>
          <Avatar
            src={`https://avatars.dicebear.com/api/bottts/${uid}.svg`}
            size="xs"
          ></Avatar>
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
            <Thead>
              <Tr>
                <Th>Stat</Th>
              </Tr>
            </Thead>
            <Tbody>{/* <Tr></Tr> */}</Tbody>
          </Table>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
