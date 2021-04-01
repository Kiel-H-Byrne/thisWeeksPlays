// import useSWR from "swr";
import React from "react";
import { Box, Heading, Stack } from "@chakra-ui/react";
import { Instruments } from "@/types/index";
import { samplePlays } from "@/util/index";
import PlayCard from "./PlayCard";

interface Props {
  instrument: keyof typeof Instruments;
}

export const InstrumentPlays = ({ instrument }: Props) => {
  // const { data, error } = useSWR(
  //   `/api/orders?instrument=${instrument}`,
  //   fetcher
  //   );
  //   if (data) {
  //     console.log("data")
  //     console.log(data)
  //   } else {
  //     console.log("no data")
  //   }
  // const plays = data || samplePlays;
  const plays = samplePlays;
  return (
    <Box>
      <Heading>Top 5 {instrument} Plays:</Heading>
      <Stack spacing={8}>
        {plays.map((data) => {
          return data.instrument === instrument ? (
            <PlayCard playData={data} key={data._id} />
          ) : null;
        })}
      </Stack>
    </Box>
  );
};
