import React from "react";

import * as types from "@/types/index";
import {
  Box,
  Flex,
  Collapse,
  Divider,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { CommentCard as CommentCard } from "./CommentCard";
import VerifyField from "./form/VerifyField";
import useSWR from "swr";
import fetcher from "@/lib/fetch";
import CommentForm from "./CommentForm";
import { useSession } from "next-auth/client";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { format } from "date-fns";
import { InteractiveUserName } from "./InteractiveUserName";

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
  return (
    // <Link href="/plays/[id]" as={`/plays/${data.id}`}>

    <Box
      p={5}
      shadow="md"
      borderWidth="3px"
      borderColor={!tickerData ? "grey" : isWinning ? "green.600" : "red"}
      borderRadius={"3%"}
      width={"xs"}
    >
      <Flex wrap="wrap" display="flow">
        <Text as="span" marginRight="1" fontWeight="500" fontStyle="italic">
          <InteractiveUserName userName={userName} uid={uid} />
        </Text>
        <Text marginInline="1" as="span">{`is ${sentiment} on `}</Text>
        <Text as={"span"} fontWeight={"bold"} marginInline="1">
          {ticker}
          {tickerData ? ` ($${tickerData.latestPrice})` : ``}{" "}
        </Text>
        <Text as="span" marginInline="1">
          and {isWatching ? `is looking at a ` : `entered a `}
          {isShort ? `short ` : `long `}
          {`play because of `}
        </Text>
        <Text as={"span"} fontWeight={"bold"} marginInline="1">
          {reasoning}
          {", "}
        </Text>
        {/* {`placing ${orderAmount} ${optionsStrategy}(s) `} */}
        <Text marginInline="1" as="span">{`expecting it to hit `}</Text>
        <Text as={"span"} fontWeight={"bold"} marginInline="1">
          ${targetAmount}.
        </Text>
        <br />
        <Text>
          {isWatching && `If bought, \n`}
          {exitStrategy
            ? `They will ${exitStrategy}...`
            : `They will buy & hold...`}
        </Text>
      </Flex>
      <Text fontSize="xs" color="grey" marginBlock="2">
        Submitted: {format(new Date(submitDate), "MM/dd/y")}
      </Text>
      <Box id="up-down-vote">
        {session && !loading ? (
          <VerifyField
            orderId={_id}
            userId={session["id"] as string}
            upVotes={upVotes}
            downVotes={downVotes}
          />
        ) : null}
      </Box>
      {commentsData ? <Divider /> : null}
      <CommentForm oid={_id} session={session} />
      <Box>
        {commentsData?.comments.length >= 3 ? (
          <Box
            onClick={onToggle}
            padding="3"
            display="flex"
            justifyContent="space-between"
          >
            <Text as="h2"> View Comments:</Text>
            {isOpen ? (
              <ChevronDownIcon margin="auto" />
            ) : (
              <ChevronUpIcon margin="auto" />
            )}
          </Box>
        ) : null}
        <Collapse
          in={isOpen || commentsData?.comments.length < 3}
          animateOpacity
        >
          {commentsData?.comments?.length > 0
            ? commentsData.comments.map((data) => (
                <ul key={Math.random() * 203}>
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
