// import useSWR from "swr";
import React from "react";
import { Box, Heading, Skeleton, Stack } from "@chakra-ui/react";
import { Instruments } from "@/types/index";
import { samplePlays } from "@/util/index";
import PlayCard from "./PlayCard";
import useSWR from "swr";
import fetcher from "@/lib/fetch";
import { subWeeks, format } from 'date-fns';

interface Props {
  instrument: Instruments;
}

const TODAYS_DATE = new Date();

export const InstrumentPlays = ({ instrument }: Props) => {
  var threeWeeksAgo = format(subWeeks(TODAYS_DATE, 3), 'MM/dd/y')

  const { data, error } = useSWR(
    `/api/orders?instrument=${instrument}&from=${threeWeeksAgo}`,
    fetcher
    // {errorRetryCount: 2}
  );
  if (error) console.log(error)  ;

  let plays = samplePlays;
  if (data) {
    plays = [...plays, ...data.orders];
  }
  return (
    <Box>
      <Heading fontSize="1.7rem" paddingBottom={3} textAlign="center">Top {instrument} Plays:</Heading>
      <Skeleton isLoaded={data?.orders || plays}>
        <Stack spacing={3}>
          {plays.map((data) => {
            return data.instrument === instrument ? (
              <PlayCard key={data._id} {...data} />
            ) : null;
          })}
        </Stack>
      </Skeleton>
    </Box>
  );
};
