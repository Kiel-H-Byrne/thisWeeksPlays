import React from "react";

import * as types from "@/types/index";
import {
  Box,
  Collapse,
  Divider,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { CommentCard as CommentCard } from "./CommentCard";
import VerifyField from "./form/VerifyField";
import useSWR from // , { mutate }
"swr";
import fetcher from "@/lib/fetch";
import CommentForm from "./CommentForm";
import { useSession } from "next-auth/client";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { format } from "date-fns";
import { InteractiveUserName } from "./InteractiveUserName";
// import axios from 'axios';
import { getDateThreeWeeksAgo } from "../util";

const PlayCard = ({
  userName,
  uid,
  ticker,
  entryPrice,
  exitStrategy,
  isWatching,
  targetAmount,
  reasoning,
  isShort,
  _id,
  upVotes,
  downVotes,
  sentiment,
  instrument,
  optionsExpiration,
  submitDate,
  //@ts-ignore
  createdAt,
}: types.Order) => {
  let method;
  let action;
  let dontCall;
  switch (instrument) {
    case types.Instruments.Options:
      dontCall = true;
      method = "stock";
      action = `options/${optionsExpiration}`;
      break;
    case types.Instruments.Crypto:
      method = "crypto";
      break;
    case types.Instruments.ForEx:
      dontCall = true;
      //   method = "fx";
      break;
    case types.Instruments.Futures:
      dontCall = true;
      //   method = "futures";
      break;
    default:
      method = "stock";
      action = "quote";
      break;
  }
  const [session, loading] = useSession();
  const { isOpen, onToggle } = useDisclosure();
  const { data: tickerData, error: tickerError } = useSWR(
    dontCall
      ? null
      : `https://cloud.iexapis.com/stable/${method}/${ticker}/${action}?token=${process.env.IEX_KEY}`,
    fetcher
  );
  if (tickerError) console.error(tickerError);

  const { data: commentsData, error: commentsError } = useSWR(
    dontCall ? null : `/api/orders/comments/${_id}`, //calls by order id
    fetcher
  );
  if (commentsError) console.error(commentsError);

  const isWinning = tickerData?.latestPrice <= entryPrice && !isShort;
  //if the current date is greater than or equal to 3 weeks after submit date, add isWinning stat to order
  if (submitDate === new Date(getDateThreeWeeksAgo)) {
    console.log("order has expired, set the metrics");
    console.log(submitDate + "==" + new Date(getDateThreeWeeksAgo));
    // mutate(
    //   `api/orders/${_id}`,
    //   axios.post(`api/orders/${_id}`, {
    //     data: { isWinning: isWinning },
    //   })
    // );
  }
  return (
    // <Link href="/plays/[id]" as={`/plays/${data.id}`}>
    <Box
      p={2}
      shadow="md"
      borderWidth={!tickerData ? "thin" : "medium"}
      borderColor={!tickerData ? "grey" : isWinning ? "green.600" : "red"}
      borderRadius={"3%"}
      width={"2xs"}
    >
      <Flex wrap="wrap" display="inline-flex" flexFlow="wrap">
        <Flex marginRight={1} fontWeight="500" fontStyle="italic">
          <InteractiveUserName userName={userName} uid={uid} />
        </Flex>
        <Flex marginInline={1}>{`is ${sentiment} on `}</Flex>
        <Flex fontWeight={"bold"} marginInline={1}>
          {ticker}
          {tickerData ? ` ($${tickerData.latestPrice})` : ``}
        </Flex>
        <Flex marginInline={1}>
          and {isWatching ? `is looking at a ` : `entered a `}
        </Flex>
        <Flex as="span" color={isShort ? `red.400` : `green.400`}>
          {isShort ? `short ` : `long `}
        </Flex>
        <Flex marginInline={1}>{`play because of `}</Flex>
        <Flex fontWeight={"bold"} marginInline={1}>
          {reasoning}
          {", "}
        </Flex>
        {/* {`placing ${orderAmount} ${optionsStrategy}(s) `} */}
        <Flex marginInline={1}>{`expecting it to hit `}</Flex>
        <Flex fontWeight={"bold"} marginInline={1}>
          ${targetAmount}.
        </Flex>
        <br />
        <Flex>
          {isWatching && `If bought, \n`}
          {exitStrategy
            ? `They will ${exitStrategy}...`
            : `They will buy & hold...`}
        </Flex>
      </Flex>
      <Flex id="up-down-vote">
        <Flex fontSize="xs" color="grey" marginBlock="2" whiteSpace="nowrap">
          Submitted: {format(new Date(submitDate), "MM/dd/y")}
        </Flex>
        {session && !loading ? (
          <VerifyField
            orderId={_id}
            userId={session["id"] as string}
            upVotes={upVotes}
            downVotes={downVotes}
          />
        ) : null}
      </Flex>
      {commentsData ? <Divider /> : null}
      <CommentForm oid={_id} session={session} />
      <Box>
        {commentsData?.comments?.length >= 3 ? (
          <Box
            onClick={onToggle}
            padding="3"
            display="flex"
            justifyContent="space-between"
          >
            <Flex as="h2"> View Comments:</Flex>
            {isOpen ? (
              <ChevronDownIcon margin="auto" />
            ) : (
              <ChevronUpIcon margin="auto" />
            )}
          </Box>
        ) : null}
        <Collapse
          in={isOpen || commentsData?.comments?.length < 3}
          animateOpacity
        >
          {commentsData?.comments?.length > 0
            ? commentsData.comments.map((data) => (
                <ul key={data._id}>
                  <CommentCard {...data} />
                </ul>
              ))
            : null}
        </Collapse>
      </Box>
    </Box>
  );
};

export default PlayCard;
