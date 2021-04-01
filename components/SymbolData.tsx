import { Heading } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

enum AVLABELS {
  OPEN = "1. open",
  HIGH = "2. high",
  LOW = "3. low",
  CLOSE = "4. close",
  VOLUME = "5. volume",
}

interface Props {
  symbol: string 
}

export const SymbolData = ({symbol}: Props) => {
  const [timeData, setTimeData] = useState({ label: "", value: [] });
  const [metaData, setMetaData] = useState({ meta: [] });
  useEffect(() => {
    const getSymbolData = async () => {
      let data;
      try {
        data = await axios({
          url: `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${process.env.ALPHAVANTAGE_KEY}`,
        });
        data = Object.entries(data.data);
        setMetaData({ meta: data[0][1] });
        setTimeData({ label: data[1][0], value: data[1][1] });
      } catch (error) {
        // helpers.setError(error.message)
      }
    };
    getSymbolData();
  }, []); 
  console.log(metaData)
  return (
    <Heading>
      {symbol}{" "}
      {timeData.value && Object.keys(timeData.value).length
        ? Object.values(timeData.value)[0][AVLABELS.CLOSE]
        : ""}
    </Heading>
  );
}
