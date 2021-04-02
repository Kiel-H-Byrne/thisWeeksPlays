import React from "react";
import Layout from "@/components/layout";
import { Heading, HStack } from "@chakra-ui/react";
import FormModalButton from "@/components/FormModalButton";
import { InstrumentPlays } from "@/components/InstrumentPlays";
import { Instruments } from "@/interfaces/index";
import { useCurrentUser } from '@/hooks/index'
const IndexPage = () => {
  const [user] = useCurrentUser();

  return (
    <Layout title="Top5Plays.com">
      <Heading>Top 5 Plays 👋</Heading>
      <FormModalButton />

      <HStack spacing={16}>
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
