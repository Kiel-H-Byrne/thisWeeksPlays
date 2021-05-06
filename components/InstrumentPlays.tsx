// import useSWR from "swr";
import React from "react";
import { Box, Heading, Stack } from "@chakra-ui/react";
import { Instruments, Order } from "@/types/index";
import PlayCard from "./PlayCard";

interface Props {
  instrument: Instruments;
  orders: Order[];
}

export const InstrumentPlays = ({ instrument, orders }: Props) => {
  return (
    <Box>
      <Heading fontSize="1.7rem" paddingBottom={3} textAlign="center">
        Top {instrument} Plays:
      </Heading>
      <Stack spacing={3}>
        {orders.map((data) => {
          return data.instrument === instrument ? (
            <PlayCard key={data._id} {...data} />
          ) : null;
        })}
      </Stack>
    </Box>
  );
};
