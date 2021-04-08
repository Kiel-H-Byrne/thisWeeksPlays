import React from "react";
import Link from "next/link";

import { Instruments, Order } from "@/types/index";
import { Box, Divider, Text, Textarea } from "@chakra-ui/react";
import { CommentCard } from "./CommentCard";
import VerifyField from "./form/VerifyField";
import useSWR from "swr";
import fetcher from "@/lib/fetch";
import { sampleComments } from "../util";
// enum AVLABELS {
//   OPEN = "1. open",
//   HIGH = "2. high",
//   LOW = "3. low",
//   CLOSE = "4. close",
//   VOLUME = "5. volume",
// }

type Props = {
  playData: Order;
};

const PlayCard = ({ playData }: Props) => {
  // const [timeData, setTimeData] = useState({ label: "", value: [] });
  //@ts-ignore
  // const [winning, setWinning] = useState(true);
  const {
    userName,
    ticker,
    entryPrice,
    exitStrategy,
    isWatching,
    targetAmount,
    reasoning,
    isShort,
    _id,
    uid,
    upVotes,
    downVotes,
    sentiment,
    instrument,
    // orderAmount,
    // optionsStrategy,
    optionsExpiration
  } = playData;
  let method;
  let action;
  switch (instrument) {
    case Instruments.Options:
      method = "stock";  
      action = `options/${optionsExpiration}`
      break;
    case Instruments.Crypto:
      method = "crypto";
      break;
    // case Instruments.ForEx:
    //   method = "fx";
    //   break;
    default:
      method = "stock";
      action = "quote";
      break;
  }

  const { data, error } = useSWR(
    `https://cloud.iexapis.com/stable/${method}/${ticker}/${action}?token=${process.env.IEX_KEY}`,
    fetcher,
    {shouldRetryOnError:false,errorRetryCount: 0}
  );
  if (error) console.error(error);
  // if (data) {
  //   if (data.latestPrice <= entryPrice && !isShort) {
  //     setWinning(false);
  //   }
  // }
  const submitComment = (e) => {
    let msg = e.target.value;
    console.log(msg);
  };
  const isWinning = data?.latestPrice <= entryPrice && !isShort;

  return (
    // <Link href="/plays/[id]" as={`/plays/${data.id}`}>
    <Box
      p={5}
      shadow="md"
      borderWidth="3px"
      borderColor={ !data ? "grey" : isWinning ? "green.600" : "red"}
      borderRadius={"3%"}
      width={250}
    >
      <Link href="/users/[name]" as={`/users/${userName}`}>
        <Text as={"span"} fontStyle={"italic"}>
          <a>@{userName} </a>
        </Text>
      </Link>
      {`is ${sentiment} on `}
      <Text as={"span"} fontWeight={"bold"}>
        {ticker}
        {data ? ` ($${data.latestPrice})` : ``}{" "}
      </Text>
      and {isWatching ? `is looking at a ` : `entered a `}
      {isShort ? `short ` : `long `}
      {`play because of `}
      <Text as={"span"} fontWeight={"bold"}>
        {reasoning}
        {", "}
      </Text>
      {/* {`placing ${orderAmount} ${optionsStrategy}(s) `} */}
      {`expecting it to hit `}
      <Text as={"span"} fontWeight={"bold"}>
        ${targetAmount}
      </Text>
      .
      <br />
      {isWatching && `if bought, \n`}
      {exitStrategy
        ? `they will ${exitStrategy}...`
        : `They will buy & hold...`}
      <div id="up-down-vote">
        <VerifyField
          orderId={_id}
          userId={uid}
          upVotes={upVotes}
          downVotes={downVotes}
        />
      </div>
      <Divider width="100%" />
      <span>Comments</span>
      <Textarea rows={2} onSubmit={submitComment} />
      {sampleComments //need to fetch and spread samples with real comments
        ? Object.values(sampleComments).map((props) => (
            <ul key={Math.random()*203}>
              <CommentCard {...props} />
            </ul>
          ))
        : null}
    </Box>
    // </Link>
  );
};

export default PlayCard;
