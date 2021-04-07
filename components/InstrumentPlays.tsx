// import useSWR from "swr";
import React from "react";
import { Box, Heading, Skeleton, Stack } from "@chakra-ui/react";
import { Instruments } from "@/types/index";
import { samplePlays } from "@/util/index";
import PlayCard from "./PlayCard";
import useSWR from "swr";
import fetcher from "@/lib/fetch";

interface Props {
  instrument: keyof typeof Instruments;
}

export const InstrumentPlays = ({ instrument }: Props) => {
  const { data, error } = useSWR(
    `/api/orders?instrument=${instrument}`,
    fetcher
  );
  if (error) console.error(error);

  let plays = samplePlays;
  if (data) {
    plays = [...plays, ...data.orders];
  }
  console.log("is data loaded in InstrumentPlays?")
  console.log(data?.orders)
  return (
    <Box>
      <Heading>Top 5 {instrument} Plays:</Heading>
      <Skeleton isLoaded={data?.orders || plays}>
        <Stack spacing={8}>
          {plays.map((data) => {
            return data.instrument === instrument ? (
              <PlayCard playData={data} key={typeof data._id === "string" ? data._id : data._id.toHexString()} />
            ) : null;
          })}
        </Stack>
      </Skeleton>
    </Box>
  );
};
