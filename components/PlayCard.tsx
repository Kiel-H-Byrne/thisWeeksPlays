import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

import { Order } from "../types";
import {
  Box,
  Divider,
  Heading,
  ListItem,
  Text,
  Textarea,
  UnorderedList,
} from "@chakra-ui/react";
import { CommentCard } from "./CommentCard";
import VerifyField from "./form/VerifyField";
enum AVLABELS {
  OPEN = "1. open",
  HIGH = "2. high",
  LOW = "3. low",
  CLOSE = "4. close",
  VOLUME = "5. volume",
}

type Props = {
  playData: Order;
};

const PlayCard = ({ playData }: Props) => {
  const [comments, setComments] = useState([]);
  const [timeData, setTimeData] = useState({ label: "", value: [] });
  const [metaData, setMetaData] = useState({ meta: [] });
  const [winning, setWinning] = useState(true);
  const [lastPrice, setLastPrice] = useState(null);
  console.log(playData);
  const {
    userName,
    ticker,
    entryPrice,
    exitStrategy,
    isWatching,
    targetAmount,
    reasoning,
    isShort,
    submitDate,
    _id,
    uid,
    upVotes,
    downVotes,
  } = playData;

  useEffect(async () => {
    let tickerData;
    try {
      tickerData = await axios({
        url: `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=${process.env.ALPHAVANTAGE_KEY}`,
      });
      tickerData = Object.entries(tickerData.data);
      setMetaData({ meta: tickerData[0][1] });
      setTimeData({ label: tickerData[1][0], value: tickerData[1][1] });

      let closePrice = Object.values(timeData.value)[0][AVLABELS.CLOSE];
      setLastPrice(closePrice);
      if (closePrice <= entryPrice && !isShort) {
        setWinning(false);
      }
    } catch (error) {
      // helpers.setError(error.message)
    }
  }, [lastPrice]);

  return (
    // <Link href="/plays/[id]" as={`/plays/${data.id}`}>
    <Box
      p={5}
      shadow="md"
      borderWidth="3px"
      borderColor={
        winning === "null" ? "inherit" : winning ? "green.600" : "red"
      }
      borderRadius={"3%"}
      width={250}
    >
      <Link href="/users/[name]" as={`/users/${userName}`}>
        <Text as={"span"} fontStyle={"italic"}><a>@{userName}</a></Text>
      </Link>
      {isWatching ? ` is looking at a ` : ` entered a `}
      {isShort ? `short ` : `long `}
      <Text as={"span"} fontWeight={"bold"}>{ticker}</Text>
      {` play because of `}<Text as={"span"} fontWeight={"bold"} >{reasoning}</Text>{`, expecting it to hit `}
      <Text as={"span"} fontWeight={"bold"} >${targetAmount}</Text>. 
      <br />
      {isWatching
        ? `\n`
        : exitStrategy
        ? `They will ${exitStrategy}...`
        : `They have no exit strategy...`}

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
      <Textarea rows={2} />
      {comments
        ? Object.values(comments).map((props) => (
            <ul>
              <CommentCard {...props} />
            </ul>
          ))
        : null}
    </Box>
    // </Link>
  );
};

export default PlayCard;
