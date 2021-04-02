import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

import { Order } from "@/interfaces/index";
import {
  Box,
  Divider,
  Heading,
  ListItem,
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
  const [winning, setWinning ] = useState(true)
  // console.log(playData);
  useEffect(async () => {
    let tickerData;
    try {
      tickerData = await axios({
        url: `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${playData.ticker}&interval=5min&apikey=${process.env.ALPHAVANTAGE_KEY}`,
      });
      tickerData = Object.entries(tickerData.data);
      setMetaData({ meta: tickerData[0][1] });
      setTimeData({ label: tickerData[1][0], value: tickerData[1][1] });
      
      let lastPrice = Object.values(timeData.value)[0][AVLABELS.CLOSE]
      if (lastPrice <= playData.entryPrice && !playData.isShort) {
        setWinning(false);
      }

    } catch (error) {
      // helpers.setError(error.message)
    }
  }, [playData]);

  return (
    // <Link href="/plays/[id]" as={`/plays/${data.id}`}>
    <Box
      p={5}
      shadow="md"
      borderWidth="3px"
      borderColor={winning ? "green.600" : "red"}
      borderRadius={"3%"}
      width={250}
    >
      <Heading>
        {playData.ticker}{" "}
        {timeData.value && Object.keys(timeData.value).length
          ? Object.values(timeData.value)[0][AVLABELS.CLOSE]
          : ""}
      </Heading>
      <UnorderedList>
        <ListItem>Entry Price: ${playData.entryPrice}</ListItem>
        <ListItem>Reasoning: {playData.reasoning} </ListItem>
        <ListItem>Price Target: ${playData.targetAmount} </ListItem>
        <ListItem>Exit Strategy: {playData.exitStrategy} </ListItem>
        {playData.isShort ? <ListItem>Shorting 📉</ListItem> : <></>}
      </UnorderedList>
      <div id="action-bar">
        <Link href="/users/[name]" as={`/users/${playData.userName}`}>
          <a>@{playData.userName}</a>
        </Link>
        : {playData.submitDate.toLocaleDateString()}
        <div id="up-down-vote">
          <VerifyField
            orderId={playData._id}
            userId={playData.uid}
            upVotes={playData.upVotes}
            downVotes={playData.downVotes}
          />
        </div>
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
