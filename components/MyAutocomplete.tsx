import fetcher from "@/lib/fetch";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { useState } from "react";
import useSWR from "swr";

// interface Props {}

export const AutoCompleteField = () => {
  const [field, meta, helpers] = useField("ticker");
  // const [symbolData, setSymbolData] = useState({ meta: [], time: [] });
  const [tickerSearch, setTickerSearch] = useState("");

  field.onChange = (e) => {
    setTickerSearch(e.target.value);
    if (error) helpers.setError(error.message);
    helpers.setValue(e.target.value);
  };
  const { data, error } = useSWR(
    tickerSearch.length
      ? `https://ticker-2e1ica8b9.now.sh/keyword/${tickerSearch}`
      : null,
    fetcher
  );
  // if (data) {console.log(data)};

  const setInputValue = (symbol) => {
    helpers.setValue(symbol);
    data.splice(0, data.length);
  };
  return (
    <FormControl
      id="ticker-control"
      isRequired
      isInvalid={!!meta.error && meta.touched}
    >
      <FormLabel htmlFor="ticker">Ticker</FormLabel>
      <Input {...field} placeholder="TCKR" autoComplete="off" />

      <div className="result-set">
        {data &&
          data.map(({ symbol, name }, index) => (
            <div key={index} onClick={() => setInputValue(symbol)}>
              {symbol} - {name}
            </div>
          ))}
      </div>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};
