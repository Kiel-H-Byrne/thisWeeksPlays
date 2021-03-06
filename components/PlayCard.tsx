import React from "react";
import Link from "next/link";

import { Play } from "@/interfaces";
import { Box, Heading, ListItem, UnorderedList } from "@chakra-ui/react";

type Props = {
  data: Play;
};

const PlayCard = ({ data }: Props) => (
  // <Link href="/plays/[id]" as={`/plays/${data.id}`}>
    <Box p={5} shadow="md" borderWidth="1px">
      <Heading>{data.ticker}</Heading>
      <UnorderedList>
        <ListItem>Entry Price: 5</ListItem>
        <ListItem>Reasoning: 5 </ListItem>
        <ListItem>Defense: 5 </ListItem>
        <ListItem>Price Target: 5 </ListItem>
        <ListItem>Exit Strategy: 5 </ListItem>
      </UnorderedList>
      <Link href="/users/[name]" as={`/users/${data.userName}`}>
        <a>@{data.userName}</a>
      </Link>
    </Box>
  // </Link>
);

export default PlayCard;
