import {
  Box,
  Heading,
  HStack,
  Table,
  TableCaption,
  Tbody,
  Td,
  // Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { InteractiveUserName } from './InteractiveUserName';

interface Props {}

const LeaderBoard = (props: Props) => {
  console.log(props);
  //three tables HStacked, with shared header?
  // <Th>Most Consistent</Th>
  //           <Th>Most Gains (%)</Th>
  //           <Th>Most Revenue ($)</Th>

  /* <Td><Th>Name</Th><Th>Rate</Th></Td>
            <Td><Th>Name</Th><Th>Profit %age</Th></Td>
            <Td><Th>Name</Th><Th>Total Revenue</Th></Td> */
  return (
    <Box paddingInline="8" marginBlock="8" boxShadow="base" borderBlock="1px solid green" borderRadius="sm">
      <Heading textAlign="center">Quarterly Leaderboard</Heading>
      <Heading textAlign="center" fontSize="xl" fontWeight="normal">Top 5 Pickers this season</Heading>
    <HStack id="leaderboard" spacing="32" >
      <LeaderTable title="Most Consistent" leaders={leaders_consistent}/>
      <LeaderTable title="Most Gains (%)" leaders={leaders_gains}/>
      <LeaderTable title="Most Revenue ($)" leaders={leaders_revenue}/>
    </HStack>
    </Box>
  );
};

export default LeaderBoard;

const leaders_consistent = [{name: "Hullaballoo", stat: 2.23}, {name: "BigIbuy", stat: 1.03}, {name: "BillyTeePhillians", stat: .83}]
const leaders_gains = [{name: "DankMasterJay", stat: 3}, {name: "SkunkTuesday", stat: 1.5}, {name: "RealDrizzy", stat: .28}]
const leaders_revenue = [{name: "BlakkRob", stat: 53000}, {name: "Dee_Emm_Exx", stat: 18000}, {name: "DogeStar", stat: 1700}]


const LeaderTable = ({title, leaders}) => {
  return (
    <Table variant="simple" colorScheme="orange">
      <TableCaption placement="top" fontSize="larger">{title}</TableCaption>
      <Thead>
        <Tr >
          <Th >Member Name</Th>
          <Th isNumeric>Rate </Th>
        </Tr>
      </Thead>
      <Tbody>
        {leaders.map(({name, stat}) => {
          return (

            <Tr>
            <Td ><InteractiveUserName userName={name} uid={"uid"} /></Td>
            <Td isNumeric>{stat}</Td>
          </Tr>
          )
        })}
      </Tbody>
    </Table>
  );
};

