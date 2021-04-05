import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

import { Order, Comment } from "@/types/index";
import {
  Box,
  Divider,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { CommentCard } from "./CommentCard";
import VerifyField from "./form/VerifyField";
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
  const [comments, setComments] = useState([] as Comment[]);
  // const [timeData, setTimeData] = useState({ label: "", value: [] });
  //@ts-ignore
  const [metaData, setMetaData] = useState({ meta: [] });
  const [winning, setWinning] = useState(true);
  const [lastPrice, setLastPrice] = useState(null);
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
    // orderAmount,
    // optionsStrategy,
    // optionsExpiration
  } = playData;

  useEffect(() => {
    const getTickerData = async () => {
      let tickerData;
      let url = `https://cloud.iexapis.com/stable/stock/${ticker}`
      // if (optionsStrategy) {
      //   url = `${url}/options/${optionsExpiration}/`;
      // } else {
        url = `${url}/quote`;
      // }
      try {
        
        tickerData = await axios({
          // url: `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=${process.env.ALPHAVANTAGE_KEY}`,
          url: `${url}?token=${process.env.IEX_KEY}`,
        });
      } catch (error) {
        // helpers.setError(error.message)
      }
      if (tickerData) {
        setMetaData({ meta: tickerData.data });
        // setTimeData({ label: tickerData[1][0], value: tickerData[1][1] });
        // let closePrice = Object.values(timeData.value)[0][AVLABELS.CLOSE];
        setLastPrice(tickerData.data.close);
        if (tickerData.data.close <= entryPrice && !isShort) {
          setWinning(false);
        }
      }
        
    };
    const getComments = () => setComments([{_id: "234234234" as any, submitDate: new Date(), userName: "commentKing",uid: "1032fj23f" as any, oid: "l2k3j983fj" as any, message: "some type of comment"}]);

    getTickerData()
    getComments();

  }, [lastPrice]);

  const submitComment = (e) => {
    let msg = e.target.value
    console.log(msg)
  }
  return (
    // <Link href="/plays/[id]" as={`/plays/${data.id}`}>
    <Box
      p={5}
      shadow="md"
      borderWidth="3px"
      borderColor={lastPrice === null ? "blue" : winning ? "green.600" : "red"}
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
        {lastPrice ? ` ($${lastPrice})` : ``}{" "}
      </Text>
      and {isWatching ? `is looking at a ` : `entered a `}
      {isShort ? `short ` : `long `}
      {`play because of `}
      <Text as={"span"} fontWeight={"bold"}>
        {reasoning}{", "}
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
      {comments
        ? Object.values(comments).map((props) => (
            <ul key={props.userName}>
              <CommentCard {...props} />
            </ul>
          ))
        : null}
    </Box>
    // </Link>
  );
};

export default PlayCard;
