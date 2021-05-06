import React from "react";
import Layout from "@/components/layout";
import {
  Box,
  Container,
  Heading,
  HStack,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import FormModalButton from "@/components/FormModalButton";
import { InstrumentPlays } from "@/components/InstrumentPlays";
import { Instruments, Order } from "@/types/index";
import { samplePlays, getDateThreeWeeksAgo } from "@/util/index";
import LeaderBoard from "@/components/LeaderBoard";
import fetcher from "@/lib/fetch";
import useSWR from "swr";

const IndexPage = () => {
  const ordersByInstrument: { [key: string]: Order[] } = {};
  let { data } = useSWR(`api/orders?from=${getDateThreeWeeksAgo}`, fetcher);
  data = data?.orders ? [...samplePlays, ...data.orders] : samplePlays;
  if (data) {
    for (const order in data) {
      if (Object.prototype.hasOwnProperty.call(data, order)) {
        const item = data[order];
        if (!ordersByInstrument[item["instrument"]]?.length) {
          ordersByInstrument[item["instrument"]] = [];
        }
        ordersByInstrument[item["instrument"]].push(item);
      }
    }
  }
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
      <LeaderBoard orders={data?.orders} />
      <Box display="flex" overflowX="auto" boxShadow="inner">
        <HStack spacing={7} align={"flex-start"} padding="7">
          {Object.entries(ordersByInstrument).map((instrument) => (
            <Skeleton isLoaded={!!data}>
              <InstrumentPlays
                instrument={instrument[0] as Instruments}
                orders={instrument[1]}
              />
            </Skeleton>
          ))}
        </HStack>
      </Box>
    </Layout>
  );
};

export default IndexPage;
