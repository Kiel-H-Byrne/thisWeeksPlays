import {
  Box,
  Heading,
  HStack,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { nanoid } from 'nanoid';
import React from "react";
import { Order } from '../types';
import { InteractiveUserName } from "./InteractiveUserName";

interface Props {
  orders: Order[]
}

const LeaderBoard = ({orders}: Props) => {
  console.log("[LeaderBoard Props:");
  console.log(orders);
  //three tables HStacked, with shared header?
  // <Th>Most Consistent</Th>
  //           <Th>Most Gains (%)</Th>
  //           <Th>Most Revenue ($)</Th>

  /* <Td><Th>Name</Th><Th>Rate</Th></Td>
            <Td><Th>Name</Th><Th>Profit %age</Th></Td>
            <Td><Th>Name</Th><Th>Total Revenue</Th></Td> */
  return (
    <Box
      paddingInline="8"
      marginBlock="8"
      boxShadow="base"
      borderBlock="1px solid green"
      borderRadius="sm"
    >
      <Heading textAlign="center">Quarterly Leaderboard</Heading>
      <Heading textAlign="center" fontSize="xl" fontWeight="normal">
        Top 5 Pickers this season
      </Heading>
      <HStack id="leaderboard" spacing="32">
        <LeaderTable title="Most Consistent" leaders={leaders_consistent} />
        <LeaderTable title="Most Gains (%)" leaders={leaders_gains} />
        <LeaderTable title="Most Revenue ($)" leaders={leaders_revenue} />
      </HStack>
    </Box>
  );
};

export default LeaderBoard;

const leaders_consistent = [
  { name: "Hullaballoo", stat: 2.23, uid: (Math.random()*100000).toPrecision(5) },
  { name: "BigIbuy", stat: 1.03, uid: nanoid(11) },
  { name: "BillyTeePhillians", stat: 0.83, uid: nanoid(11) },
];
const leaders_gains = [
  { name: "DankMasterJay", stat: 3, uid: nanoid(11) },
  { name: "SkunkTuesday", stat: 1.5, uid: nanoid(11) },
  { name: "RealDrizzy", stat: 0.28, uid: nanoid(11) },
];
const leaders_revenue = [
  { name: "BlakkRob", stat: 53000, uid: nanoid(11) },
  { name: "Dee_Emm_Exx", stat: 18000, uid: nanoid(11) },
  { name: "DogeStar", stat: 1700, uid: nanoid(11) },
];

const LeaderTable = ({ title, leaders }) => {
  // search all orders within last 3 weeks,
  // then create three arrays of objects for each category
  return (
    <Table variant="simple" colorScheme="orange">
      <TableCaption placement="top" fontSize="larger">
        {title}
      </TableCaption>
      <Thead>
        <Tr>
          <Th>Member Name</Th>
          <Th isNumeric>Rate </Th>
        </Tr>
      </Thead>
      <Tbody>
        {leaders.map(({ name, stat, uid }) => {
          return (
            <Tr key={name}>
              <Td>
                <InteractiveUserName userName={name} uid={uid} />
              </Td>
              <Td isNumeric>{stat}</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
