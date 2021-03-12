import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Switch,
} from "@chakra-ui/react";
// import { Field, Form, Formik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { Formik, Field, ErrorMessage, Form, FormikHelpers } from "formik";
import {
  Order,
  Instruments,
  OptionStrategies,
  Reasons,
  Sentiment,
} from "../interfaces";
import axios from "axios";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import { MyAutocomplete } from "./MyAutocomplete";

const initialData: Order = {
  id: "", //any
  ticker: "", //string
  sentiment: Sentiment.Neutral, //keyof typeof Sentiment
  instrument: Instruments.Crypto, //ValueOf<Instruments>
  entryPrice: 0, //number
  targetAmount: 0, //number
  exitStrategy: "", //string
  submitDate: new Date(), //Date
  upVotes: 0, //number
  downVotes: 0, //number
  reasoning: Reasons.News, //keyof typeof Reasons
  isWatching: false, //boolean
  isShort: false, //boolean
  userName: "", //string
  orderAmount: 0, //number
  // optionsStrategy: OptionStrategies.DEBIT_CALL, //ValueOf<OptionStrategies>
  riskAmount: 0, //number
  screenShot: "", //string
  uid: "", //string
};

export const InputForm = () => {
  const [step, setStep] = useState(0);

  function validateName(value: string) {
    let error;
    if (!value) {
      error = "Name is required";
    } else if (value.toLowerCase() !== "naruto") {
      error = "Jeez! You're not a fan 😱";
    }
    return error;
  }

  return (
    <div>
      <Formik
        initialValues={initialData}
        validate={(values: Order) => {}}
        onSubmit={ async (values: Order, { setSubmitting }: FormikHelpers<Order>) => {
          await axios.post("/api/orders", {
            data: values,
          });

          setTimeout(() => {
            console.log(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <Field name="instrument">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.instrument && form.touched.instrument}
                >
                  <FormLabel htmlFor="instrument">Instrument</FormLabel>
                  <Select {...field} id="instrument" placeholder="Instrument">
                    {Object.values(Instruments).map((instrument) => (
                      <option
                        key={`select-option_${instrument}`}
                        value={instrument}
                      >
                        {instrument}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>{form.errors.instrument}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="ticker">
              {({ field, form }) => (
                <FormControl
                  id="ticker-control"
                  isRequired
                  isInvalid={form.errors.ticker && form.touched.ticker}
                >
                  <FormLabel htmlFor="ticker" placeholder="TCKR">
                    Ticker
                  </FormLabel>
                  <MyAutocomplete {...field} id="ticker" placeholder="TCKR" 
                  items={() => [{}]}/>
                  <FormErrorMessage>{form.errors.ticker}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="sentiment">
              {({ field, form }) => (
                <FormControl
                  id="sentiment-control"
                  isRequired
                  isInvalid={form.errors.sentiment && form.touched.sentiment}
                >
                  <FormLabel htmlFor="sentiment" placeholder="Sentiment">
                    Sentiment
                  </FormLabel>
                  <Select {...field} id="sentiment" placeholder="Sentiment">
                    {Object.keys(Sentiment).map((sentiment) => (
                      <option key={`select-option_${sentiment}`}>
                        {sentiment}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>{form.errors.sentiment}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="isWatching">
              {({ field, form }) => (
                <FormControl
                  id="isWatching-control"
                  isRequired
                  isInvalid={form.errors.isWatching && form.touched.isWatching}
                >
                  <FormLabel htmlFor="isWatching" placeholder="Watching?">
                    Did you Purchase this?
                  </FormLabel>
                  <Switch {...field} id="isWatching" placeholder="Watching?" />
                  <FormErrorMessage>{form.errors.isWatching}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            {values.instrument == Instruments.Stocks ? (
              <Field name="isShort">
                {({ field, form }) => (
                  <FormControl
                    id="isShort-control"
                    isRequired
                    isInvalid={form.errors.isShort && form.touched.isShort}
                  >
                    <FormLabel htmlFor="isShort" placeholder="Long or Short?">
                      Are you shorting this?
                    </FormLabel>
                    <Switch
                      {...field}
                      id="isWatching"
                      placeholder="Watching?"
                    />
                    <FormErrorMessage>
                      {form.errors.isWatching}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            ) : values.instrument == Instruments.Options ? (
              <Field name="optionStrategy">
                {({ field, form }) => (
                  <FormControl
                    id="optionsStrategy-control"
                    isRequired
                    isInvalid={
                      form.errors.optionsStrategy &&
                      form.touched.optionsStrategy
                    }
                  >
                    <FormLabel
                      htmlFor="optionsStrategy"
                      placeholder="Options Strategy"
                    >
                      Options Strategy
                    </FormLabel>
                    <Select
                      {...field}
                      id="optionsStrategy"
                      placeholder="Options Strategy"
                    >
                      {Object.values(OptionStrategies).map((strategy) => (
                        <option key={`select-option_${strategy}`}>
                          {strategy}
                        </option>
                      ))}
                    </Select>
                    <FormErrorMessage>
                      {form.errors.optionsStrategy}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            ) : null}

            <Field name="exitStrategy">
              {({ field, form }) => (
                <FormControl
                  id="exitStrategy-control"
                  isRequired
                  isInvalid={
                    form.errors.exitStrategy && form.touched.exitStrategy
                  }
                >
                  <FormLabel htmlFor="exitStrategy" placeholder="Exit Strategy">
                    Exit Strategy
                  </FormLabel>
                  <Input
                    {...field}
                    id="exitStrategy"
                    placeholder="Exit Strategy"
                  />
                  <FormErrorMessage>
                    {form.errors.exitStrategy}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="reasoning">
              {({ field, form }) => (
                <FormControl
                  id="reasoning-control"
                  isRequired
                  isInvalid={form.errors.reasoning && form.touched.reasoning}
                >
                  <FormLabel htmlFor="reasoning" placeholder="Reasoning">
                    Reasoning
                  </FormLabel>
                  <Select {...field} id="reasoning" placeholder="Reasoning">
                    {Object.keys(Reasons).map((reason) => (
                      <option key={`select-option_${reason}`}>{reason}</option>
                    ))}
                  </Select>
                  <FormErrorMessage>{form.errors.reasoning}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="targetAmount">
              {({ field, form }) => (
                <FormControl
                  id="targetAmount-control"
                  isRequired
                  isInvalid={
                    form.errors.targetAmount && form.touched.targetAmount
                  }
                >
                  <FormLabel htmlFor="targetAmount" placeholder="Target Amount">
                    Target Amount
                  </FormLabel>
                  <Input
                    type="number"
                    {...field}
                    id="targetAmount"
                    placeholder="Target Amount"
                  />
                  <FormErrorMessage>
                    {form.errors.targetAmount}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Button
              colorScheme="green"
              mr={3}
              mt={4}
              isLoading={false}
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </Button>
            <Button mt={4}>
              Clear
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
