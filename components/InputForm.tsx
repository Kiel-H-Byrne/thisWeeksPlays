import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Select,
  Switch,
  Text,
} from "@chakra-ui/react";
// import { Field, Form, Formik } from "formik";
import React from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import {
  Order,
  Instruments,
  OptionStrategies,
  Reasons,
  Sentiment,
} from "@/types/index";
import axios from "axios";
import { AutoCompleteField } from "./MyAutocomplete";
import { IconPopover } from "./form/InfoPopover";
import useSWR, { mutate } from "swr";
import fetcher from "@/lib/fetch";
import { calculatePoints, getDateThreeWeeksAgo } from "../util";
import { InfoOutlineIcon } from '@chakra-ui/icons';

const initialData: Partial<Order> = {
  instrument: Instruments.Crypto, //ValueOf<Instruments>
  upVotes: [], //array of userIds
  downVotes: [], //array of userIds
  isWatching: true, //boolean
  isShort: false, //boolean
  riskAmount: 0, //number
  points: 0,
};

export const InputForm = ({ onClose, userName, uid }) => {
  // const [step, setStep] = useState(0);
  // const validateName = (value: string) => {
  //   let error;
  //   if (!value) {
  //     error = "Name is required";
  //   } else if (value.toLowerCase() !== "naruto") {
  //     error = "Jeez! You're not a fan 😱";
  //   }
  //   return error;
  // };

  const validateAll = (values: Partial<Order>) => {
    const errors: Partial<Order> = {};
    if (!values.ticker) {
      errors.ticker = "Required";
    }
    if (!values.sentiment) {
      errors.sentiment = "Pick a Direction" as any;
    }
    return errors;
  };

  const submitForm = async (
    values,
    helpers: FormikHelpers<Partial<Order>>
    //  : Promise<{values: Order; helpers: FormikHelpers<Order>}>
  ) => {
    helpers.setSubmitting(true);
    const totalPoints = calculatePoints(values);
    mutate(
      `/api/orders?from=${getDateThreeWeeksAgo}`,
      await axios.post(`/api/orders?from=${getDateThreeWeeksAgo}`, {
        data: { uid, ...values, points: totalPoints },
      })
    );
    mutate(`/api/orders?from=${getDateThreeWeeksAgo}`);
    helpers.setSubmitting(false);
    helpers.resetForm({});
    onClose();
  };

  //depend on form value ticker,
  // when changes,
  // wait a few seconds then call this api,
  // data is set and price will show in form
  return (
    <div>
      {/* <Text paddingBottom="3" fontSize="1.3rem">Enter your pick, general direction, entry price and target exit date or price.</Text> */}
      <Formik
        initialValues={{ ...initialData, userName }}
        validate={(values: Partial<Order>) => {
          validateAll(values);
        }}
        onSubmit={(values, helpers) => submitForm(values, helpers)}
      >
        {({ isSubmitting, values }) =>
          !isSubmitting ? (
            <Form>
              <Field name="instrument">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.instrument && form.touched.instrument
                    }
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
                    <FormErrorMessage>
                      {form.errors.instrument}
                    </FormErrorMessage>
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
                    isRequired
                    isInvalid={form.errors.sentiment && form.touched.sentiment}
                  >
                    <FormLabel htmlFor="sentiment" placeholder="Sentiment">
                      Think it's going Up or Down?
                    </FormLabel>
                    <RadioGroup
                      {...field}
                      id="sentiment"
                      onChange={(v) =>
                        form.setValues({ ...form.values, sentiment: v })
                      }
                    >
                      {Object.values(Sentiment).map((sentiment) => (
                        <Radio
                          key={`select-option_${sentiment}`}
                          value={sentiment}
                        >
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
                    isInvalid={
                      form.errors.isWatching && form.touched.isWatching
                    }
                  >
                    <FormLabel htmlFor="isWatching" placeholder="Watching?">
                      Did you Purchase this?
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
              {values.instrument == Instruments.Stocks ? (
                <Field name="isShort">
                  {({ field, form }) => (
                    <FormControl
                      id="isShort-control"
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
                {({ field, form }) => {
                  const method = "stock";
                  const action = "quote";
                  const { data, error } = useSWR(
                    !form.values.ticker
                      ? null
                      : `https://cloud.iexapis.com/stable/${method}/${form.values.ticker}/${action}?token=${process.env.IEX_KEY}`,
                    fetcher
                  );
                  if (error) {
                    console.error(error);
                  }
                  return (
                    <FormControl
                      id="exitStrategy-control"
                      isRequired
                      isInvalid={
                        form.errors.exitStrategy && form.touched.exitStrategy
                      }
                    >
                      <FormLabel
                        htmlFor="exitStrategy"
                        placeholder="Exit Strategy"
                      >
                        Exit Strategy <IconPopover name="exit-strategy" Icon={InfoOutlineIcon}/>
                        {data ? (
                          <Text as="span" fontSize="small">
                            {" "}
                            ${form.values.ticker} is currently $
                            {data.latestPrice}
                          </Text>
                        ) : (
                          ``
                        )}
                      </FormLabel>
                      <Input
                        {...field}
                        id="exitStrategy"
                        placeholder="Exit Strategy"
                      />
                      {/* value should be object {TP: $3 SL: $20} */}
                      <FormErrorMessage>
                        {form.errors.exitStrategy}
                      </FormErrorMessage>
                    </FormControl>
                  );
                }}
              </Field>
              <Field name="reasoning">
                {({ field, form }) => (
                  <FormControl
                    id="reasoning-control"
                    isRequired
                    isInvalid={form.errors.reasoning && form.touched.reasoning}
                  >
                    <FormLabel htmlFor="reasoning" placeholder="Reasoning">
                      Reasoning <IconPopover name="reasoning" Icon={InfoOutlineIcon} />
                    </FormLabel>
                    <Select
                      {...field}
                      id="reasoning"
                      placeholder="Select A Reason..."
                    >
                      {Object.keys(Reasons).map((reason) => (
                        <option key={`select-option_${reason}`}>
                          {reason}
                        </option>
                      ))}
                    </Select>
                    <FormErrorMessage>{form.errors.reasoning}</FormErrorMessage>
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
          ) : (
            <>Submitting...</>
          )
        }
      </Formik>
    </div>
  );
};
