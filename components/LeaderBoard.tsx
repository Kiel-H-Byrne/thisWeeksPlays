// import fetcher from '@/lib/fetch';
import {
  Box,
  Flex,
  Heading,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { nanoid } from 'nanoid';
import React from "react";
// import useSWR from 'swr';
import { Order } from '../types';
import { InteractiveUserName } from "./InteractiveUserName";

interface Props {
  orders: Order[]
}
interface Leaders {
  name: string,
  uid: string | any //ObjectID,
  stat: number,

}
const LeaderBoard = ({orders}: Props) => {
  // const { data: pastOrders, error } = useSWR(`/api/orders?from=${from}&limit=${PAGE_SIZE}${
  //   creatorId ? `&by=${creatorId}` : ''
  // }`, fetcher);
  //need to get points from orders prop; 
  const getConsistentLeaders = (orders: Order[]): Leaders[] => {
    //consistent = iswinning the most times, orders by same user,
    console.log(orders)
    let z = orders.filter(o => o.isWinning === true)

    console.log(z)
    return   [
      { name: "Hullaballoo", stat: 2.23, uid: (Math.random()*100000).toPrecision(5) },
      { name: "BigIbuy", stat: 1.03, uid: nanoid(11) },
      { name: "BillyTeePhillians", stat: 0.83, uid: nanoid(11) },
    ];
  };
  return (
    <Box
      marginBlock="5"
      boxShadow="base"
      borderBlock="1px solid green"
      borderRadius="sm"
      // minW="100%"
    >
      <Heading textAlign="center" backgroundColor="green.300" paddingBlock="3" fontSize={["2xl", "3xl"]}>
        Quarterly Leaderboard
        <Text fontSize={["lg","xl"]} fontWeight="normal">
          Top 5 Pickers this season
        </Text>
      </Heading>
      <Flex id="leaderboard" overflowX="auto">
        <LeaderTable
          title="Most Consistent"
          leaders={getConsistentLeaders(orders)}
        />
        <LeaderTable title="Most Gains (%)" leaders={leaders_gains} />
        <LeaderTable title="Most Revenue ($)" leaders={leaders_revenue} />
      </Flex>
    </Box>
  );
};

export default LeaderBoard;

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
    <Table variant="simple" colorScheme="whiteAlpha" overflowX="auto" backgroundColor="whiteAlpha.100" borderRightColor="green.200" borderRightWidth="thin" borderRightStyle="dashed" /* borderBottomColor="green.200" borderBottomWidth="medium" */>
      <TableCaption placement="top" fontSize="large" margin="0" color="green.400">
        {title}
      </TableCaption>
      <Thead>
        <Tr>
          <Th textAlign="center">Member Name</Th>
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
