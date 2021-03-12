import { Input } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

interface Props {}

const matchName = (name, keyword) => {
  let keyLen = keyword.length;
  name = name.toLowerCase().substring(0, keyLen);
  return name == keyword && keyLen != 0;
};

const SearchBar = ({ results, setKeyword, keyword }) => {
  const onSearch = async (text) => {
    let data;
    try {
      data = await axios({
        url: `https://ticker-2e1ica8b9.now.sh/keyword/${text}`,
      });
      
    } catch (error) {
      console.log(error.message);
    }
    setResult(data)
  };

  return (
    <Input
      placeholder="Search"
      value={keyword}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

const SearchPreview = ({symbol, setResult}) => {
return (
  <div onClick={() => setResult(symbol)}>{symbol}</div>
)};

export const MyAutocomplete = (props: Props) => {
  const [results, setResults] = useState([])
  const [keyword, setKeyword] = useState('')

  return <div>
    <SearchBar setResult={setResults} results={results} keyword={keyword}/>
    {results.map(({symbol}, index) => {
      return (<SearchPreview key={index} setResult={setResults} symbol={symbol}/>)
    })}
  </div>;
};
