import { Box, Heading, Stack,  } from '@chakra-ui/react';
import React from 'react'
import { Instruments } from "../types";
import { samplePlays } from "../util"
import PlayCard from './PlayCard';

interface Props {
  instrument: keyof typeof Instruments
}

export const InstrumentPlays = ({ instrument }: Props) => {
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
