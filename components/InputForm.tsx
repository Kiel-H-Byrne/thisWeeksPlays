import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Select,
  Switch,
} from "@chakra-ui/react";
// import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Formik, Field, Form, FormikHelpers, FieldArray, FastField } from "formik";
import {
  Order,
  Instruments,
  OptionStrategies,
  Reasons,
  Sentiment,
} from "@/types/index";
import axios from "axios";
import { AutoCompleteField } from "./MyAutocomplete";
import { InfoPopover } from "./form/InfoPopover";
import { ChevronDownIcon, ChevronUpIcon, MinusIcon } from "@chakra-ui/icons";

const initialData: Order = {
  ticker: "", //string
  sentiment: Sentiment.Neutral, //keyof typeof Sentiment
  instrument: Instruments.Crypto, //ValueOf<Instruments>
  entryPrice: 0, //number
  targetAmount: 0, //number
  exitStrategy: "", //string
  submitDate: new Date(), //Date
  upVotes: [], //array of userIds
  downVotes: [], //array of userIds
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

  const validateName = (value: string) => {
    let error;
    if (!value) {
      error = "Name is required";
    } else if (value.toLowerCase() !== "naruto") {
      error = "Jeez! You're not a fan 😱";
    }
    return error;
  };

  const validateAll = (values) => {};

  const submitForm = async (
    values,
    meta
    //  : Promise<{values: Order; meta: FormikHelpers<Order>}>
  ) => {
    meta.setSubmitting(true);
    setTimeout(async () => {
      await axios
        .post("/api/orders", {
          data: values,
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.statusText);
          }
        });
      meta.setSubmitting(false);
    }, 400);
  };

  return (
    <div>
      <Formik
        initialValues={initialData}
        validate={(values: Order) => {
          validateAll(values);
        }}
        onSubmit={(values, meta) => submitForm(values, meta)}
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
            <Field
              name="ticker"
              component={AutoCompleteField}
              placeholder="Ticker Symbol"
            />
            <Field name="sentiment">
              {({ field, form }) => (
                <FormControl
                  id="sentiment-control"
                  isRequired
                  isInvalid={form.errors.sentiment && form.touched.sentiment}
                >
                  <FormLabel htmlFor="sentiment" placeholder="Sentiment">
                    Think it's going Up or Down? 
                  </FormLabel>
                  <RadioGroup {...field} id="sentiment" onChange={(v) => form.setValues({sentiment: v})}>
                    {Object.keys(Sentiment).map((sentiment) => (
                      <Radio key={`select-option_${sentiment}`} value={sentiment} >
                        {sentiment}
                      </Radio>
                    ))}
                  </RadioGroup>
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
                    Exit Strategy <InfoPopover name="exitStrategy" />
                  </FormLabel>
                  <Input
                    {...field}
                    id="exitStrategy"
                    placeholder="Exit Strategy"
                  />
                  Take Profit: x (dollars/percent switch) Stop Loss: x
                  (dollars/percent switch)
                  {/* value should be object {TP: $3 SL: $20} */}
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
                    At what price do you see this hitting within two months?
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
            <Button mt={4}>Clear</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
