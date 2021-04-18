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
import { InfoPopover } from "./form/InfoPopover";
import useSWR, { mutate } from "swr";
import fetcher from "@/lib/fetch";

const initialData: Partial<Order> = {
  _id: "",
  // ticker: "", //string
  // sentiment: " ", //keyof typeof Sentiment
  instrument: Instruments.Crypto, //ValueOf<Instruments>
  // entryPrice: 0, //number
  targetAmount: 0, //number
  exitStrategy: "", //string
  submitDate: new Date(), //Date
  upVotes: [], //array of userIds
  downVotes: [], //array of userIds
  // reasoning: Reasons.News, //keyof typeof Reasons
  isWatching: true, //boolean
  isShort: false, //boolean
  userName: "", //string
  orderAmount: 0, //number
  // optionsStrategy: OptionStrategies.DEBIT_CALL, //ValueOf<OptionStrategies>
  riskAmount: 0, //number
  screenShot: "", //string
  uid: "", //string session.id
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
    mutate(
      "/api/orders",
      await axios.post("/api/orders", {
        data: {uid, ...values},
      })
    );
    mutate("/api/orders");
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
                      {Object.keys(Sentiment).map((sentiment) => (
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
                {({ field, form }) => (
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
              <Field name="targetAmount">
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
                      id="targetAmount-control"
                      isRequired
                      isInvalid={
                        form.errors.targetAmount && form.touched.targetAmount
                      }
                    >
                      <FormLabel
                        htmlFor="targetAmount"
                        placeholder="Target Amount"
                      >
                        What's your target price by the time you exit (or within
                        two months)?
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
                        type="number"
                        {...field}
                        id="targetAmount"
                        placeholder="Target Amount"
                      />
                      <FormErrorMessage>
                        {form.errors.targetAmount}
                      </FormErrorMessage>
                    </FormControl>
                  );
                }}
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
