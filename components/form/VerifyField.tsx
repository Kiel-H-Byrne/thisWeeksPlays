import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import React from 'react'

interface Props {
  orderId: string
}

const VerifyField = ({orderId}: Props) => {
  const [field, meta, helpers] = useField("verify");
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
      id="verify-control"
    >
<div className="voteButton">
      <span className="upVote">
        <ArrowDownIcon className={in_verified ? `verified`: `verify`} />
      </span>
    <span  className="vote-count">{{ verifiedCount}}  Verified</span>
    <span className="downVote">
      <ArrowUpIcon classNae={in_deverified ? `deverified`: `deverify` } />
    </span>
 </a>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  )
}

export default VerifyField
