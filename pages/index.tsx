import React from "react";
import Layout from "@/components/layout";
import { Box, Container, Heading, HStack, Text } from "@chakra-ui/react";
import FormModalButton from "@/components/FormModalButton";
import { InstrumentPlays } from "@/components/InstrumentPlays";
import { Instruments } from "@/types/index";
import LeaderBoard from '@/components/LeaderBoard';

const IndexPage = () => {
  return (
    <Layout title="Top5Plays.com">
      <Container maxW="container.xl">
        <Heading textAlign="center" margin="auto">
          Top 5 Plays 👋
        </Heading>
        <Box padding="3" marginBlock="5">
          <Text fontWeight={400} fontSize={36}>
            Welcome to This Weeks Plays!
          </Text>
          <Text fontWeight={300} fontSize={16}>
            The online "Investor Group Chat". Post your watchlist, watch the
            plays others are watching or making this week! See the trends play
            out right before your eyes.
          </Text>
        </Box>
        <FormModalButton />
      </Container>
      <LeaderBoard />
      <Box display="flex" overflowX="auto" boxShadow="inner">
        <HStack spacing={7} align={"flex-start"} padding="7">
          {Object.values(Instruments).map((instrument) => {
            return <InstrumentPlays instrument={instrument} />;
          })}
        </HStack>
      </Box>
    </Layout>
  );
};

export default IndexPage;
