import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { useField } from "formik";
import React, { useEffect, useState } from "react";

interface Props {}

const matchName = (name, keyword) => {
  let keyLen = keyword.length;
  name = name.toLowerCase().substring(0, keyLen);
  return name == keyword && keyLen != 0;
};

export const AutoCompleteField = () => {
  const [field, meta, helpers] = useField("ticker");
  const [symbolData, setSymbolData] = useState({ meta: [], time: [] });
  const [results, setResults] = useState([]);
  const getSymbolSet = async (text) => {
    let data;
    try {
      data = await axios({
        url: `https://ticker-2e1ica8b9.now.sh/keyword/${text}`,
      });
    } catch (error) {
      helpers.setError(error.message);
    }
    data && setResults(data.data);
  };

  field.onChange = (e) => {
    getSymbolSet(e.target.value);
    helpers.setValue(e.target.value);
  };

  const setInputValue = (symbol) => {
    helpers.setValue(symbol);
    setResults([]);
  };
  return (
    <FormControl
      id="ticker-control"
      isRequired
      isInvalid={!!meta.error && meta.touched}
    >
      <FormLabel htmlFor="ticker">Ticker</FormLabel>
      <Input {...field} placeholder="TCKR" />

      <div className="result-set">
        {results &&
          results.map(({ symbol }, index) => (
            <div key={index} onClick={() => setInputValue(symbol)}>
              {symbol}
            </div>
          ))}
      </div>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};
