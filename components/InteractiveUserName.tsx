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
  Skeleton,
} from "@chakra-ui/react";
import { fetchUser } from '../hooks';

export const InteractiveUserName = ({
  userName,
  uid,
}: {
  userName: string;
  uid: string;
}) => {
  const user = uid ? fetchUser(uid) : null
  return (
    <Popover placement="auto-end" trigger="hover">
      <PopoverTrigger>
        <Skeleton isLoaded={!!uid}>
        <Flex>
          <Avatar
            src={`https://avatars.dicebear.com/api/bottts/${uid}.svg`}
            size="xs"
          ></Avatar>
          <Text>@{user?.profile?.userName || user?.name || userName}</Text>
        </Flex>
        </Skeleton>
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
