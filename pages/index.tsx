import React from "react";
import Layout from "@/components/layout";
import { Heading, HStack, Text } from "@chakra-ui/react";
import FormModalButton from "@/components/FormModalButton";
import { InstrumentPlays } from "@/components/InstrumentPlays";
import { Instruments } from "@/types/index";

const IndexPage = () => {
  return (
    <Layout title="Top5Plays.com">
      <Heading>Top 5 Plays 👋</Heading>
      <Text fontWeight={400} fontSize={36}>Welcome to This Weeks Plays!</Text>
      <Text fontWeight={300} fontSize={16}>The online "Investor Group Chat". Post your watchlist, watch the plays others are watching or making this week! See the trends play out right before your eyes.</Text>
      <FormModalButton />

      <HStack spacing={4} align={"flex-start"}>
        <InstrumentPlays instrument={Instruments.Stocks} />
        <InstrumentPlays instrument={Instruments.Options} />
        <InstrumentPlays instrument={Instruments.ForEx} />
        <InstrumentPlays instrument={Instruments.Futures} />
        <InstrumentPlays instrument={Instruments.Crypto} />
      </HStack>
    </Layout>
  );
};

export default IndexPage;
