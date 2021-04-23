import fetcher from "@/lib/fetch";
import {
  Box,
  Collapse,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { useState } from "react";
import useSWR from "swr";

// interface Props {}

export const AutoCompleteField = () => {
  const [field, meta, helpers] = useField("ticker");
  // const [symbolData, setSymbolData] = useState({ meta: [], time: [] });
  const [tickerSearch, setTickerSearch] = useState(null);
  const { isOpen, onToggle } = useDisclosure();

  field.onChange = (e) => {
    if (!isOpen) {
      onToggle();
    }
    setTimeout(() => {
      setTickerSearch(e.target.value);
    }, 300);
    if (error) helpers.setError(error.message);
    helpers.setValue(e.target.value);
  };
  const { data, error } = useSWR(
    tickerSearch
      ? `https://ticker-2e1ica8b9.now.sh/keyword/${tickerSearch}`
      : null,
    fetcher
  );
  // if (data) {console.log(data)};

  const setInputValue = (symbol) => {
    helpers.setValue(symbol);
    onToggle();
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

      {data && (
        <Collapse
          in={isOpen && tickerSearch}
          animateOpacity
          className="result-set"
        >
          <Table boxShadow="inner" backgroundColor="oldlace">
            <Thead>
              <Tr>
                <Th>Symbol</Th>
                <Th>Name</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map(({ symbol, name }, index) => (
                <Tr key={index} onClick={() => setInputValue(symbol)}>
                  <Td>{symbol}</Td>
                  <Td>{name}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Collapse>
      )}
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};
