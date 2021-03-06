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
import {
  Instruments,
  OptionStrategies,
  Reasons,
  Sentiment,
} from "@/interfaces/util";
import { useForm, FielderProvider, useField, UseFieldProps, UseFieldMeta } from 'fielder';

export const InputForm = () => {
  const [step, setStep] = useState(0);
  const form = useForm();
  useEffect(() => {
    console.log('Form state has changed! (validate maybe)', form);
  }, [form]);
  // function validateName(value: string) {
  //   let error;
  //   if (!value) {
  //     error = "Name is required";
  //   } else if (value.toLowerCase() !== "naruto") {
  //     error = "Jeez! You're not a fan 😱";
  //   }
  //   return error;
  // }
  const [usernameProps, usernameMeta] = useField({
    name: 'username',
    initialValue: '',
    validate: useCallback(({ value }) => {
      if (!value) {
        throw Error('Username is required!');
      }
    }, []),
  });
  
  return (
    <>
      <input type="text" {...usernameProps} />
      <span>{usernameMeta.error}</span>
    </>
  );
  // const [tickerProps] = useField({
  //   name: 'ticker',
  //   initialValue: 'default'
  // })
  // const [sentimentProps] = useField({
  //   name: 'sentiment',
  //   initialValue: 'default'
  // })
  // const [isWatchingProps] = useField({
  //   name: 'isWatching',
  //   initialValue: 'default'
  // })
  // const [isShortProps] = useField({
  //   name: 'isShort',
  //   initialValue: 'default'
  // })
  // const [reasoningProps] = useField({
  //   name: 'reasoning',
  //   initialValue: 'default'
  // })
  // const [exitStrategyProps] = useField({
  //   name: 'exitStrategy',
  //   initialValue: 'default'
  // })
  // const [optionStrategyProps] = useField({
  //   name: 'optionStrategy',
  //   initialValue: 'default'
  // })
  // const [targetAmountProps] = useField({
  //   name: 'targetAmount',
  //   initialValue: 'default'
  // })

  // return (
  //   <Box shadow={"sm"} p={3}>
  //     {form && (
  //       <FielderProvider value={form}>
  //         <form>
  //           <label>Instrument</label>
  //           <select title="instrument" {...instrumentProps}>
  //             {Object.values(Instruments).map((instrument) => (
  //               <option key={`select-option_${instrument}`} value={instrument}>
  //                 {instrument}
  //               </option>
  //             ))}
  //           </select>
  //           {/* <input type="text" title="ticker" {...tickerProps} />
  //           <select title="sentiment" {...sentimentProps}>
  //             {Object.keys(Sentiment).map((sentiment) => (
  //               <option>{sentiment}</option>
  //             ))}
  //           </select>
  //           <input type="text" title="isWatching" {...isWatchingProps} />
  //           <input type="text" title="isShort" {...isShortProps} />
  //           <input
  //             type="text"
  //             title="optionStrategy"
  //             {...optionStrategyProps}
  //           />
  //           <input type="text" title="exitStrategy" {...exitStrategyProps} />
  //           <input type="text" title="reasoning" {...reasoningProps} />
  //           <input type="text" title="targetAmount" {...targetAmountProps} /> */}

  //           {/* <Field name="instrument">
  //             {({ field, form }) => (
  //               <FormControl
  //                 id="instrument-control"
  //                 isRequired
  //                 isInvalid={form.errors.instrument && form.touched.instrument}
  //               >
  //                 <FormLabel htmlFor="instrument" placeholder="Instrument">
  //                   Instrument
  //                 </FormLabel>
  //                 <Select {...field} id="instrument" placeholder="Instrument">
  //                   {Object.values(Instruments).map((instrument) => (
  //                     <option
  //                       key={`select-option_${instrument}`}
  //                       value={instrument}
  //                     >
  //                       {instrument}
  //                     </option>
  //                   ))}
  //                 </Select>
  //                 <FormErrorMessage>{form.errors.instrument}</FormErrorMessage>
  //               </FormControl>
  //             )}
  //           </Field>
  //           <Field name="ticker">
  //             {({ field, form }) => (
  //               <FormControl
  //                 id="ticker-control"
  //                 isRequired
  //                 isInvalid={form.errors.ticker && form.touched.ticker}
  //               >
  //                 <FormLabel htmlFor="ticker" placeholder="TCKR">
  //                   Ticker
  //                 </FormLabel>
  //                 <Input {...field} id="ticker" placeholder="TCKR" />
  //                 <FormErrorMessage>{form.errors.ticker}</FormErrorMessage>
  //               </FormControl>
  //             )}
  //           </Field>
  //           <Field name="sentiment">
  //             {({ field, form }) => (
  //               <FormControl
  //                 id="sentiment-control"
  //                 isRequired
  //                 isInvalid={form.errors.sentiment && form.touched.sentiment}
  //               >
  //                 <FormLabel htmlFor="sentiment" placeholder="Sentiment">
  //                   Sentiment
  //                 </FormLabel>
  //                 <Select {...field} id="sentiment" placeholder="Sentiment">
  //                   {Object.keys(Sentiment).map((sentiment) => (
  //                     <option>{sentiment}</option>
  //                   ))}
  //                 </Select>
  //                 <FormErrorMessage>{form.errors.sentiment}</FormErrorMessage>
  //               </FormControl>
  //             )}
  //           </Field>
  //           <Field name="isWatching">
  //             {({ field, form }) => (
  //               <FormControl
  //                 id="isWatching-control"
  //                 isRequired
  //                 isInvalid={form.errors.isWatching && form.touched.isWatching}
  //               >
  //                 <FormLabel htmlFor="isWatching" placeholder="Watching?">
  //                   Did you Purchase this?
  //                 </FormLabel>
  //                 <Switch {...field} id="isWatching" placeholder="Watching?" />
  //                 <FormErrorMessage>{form.errors.isWatching}</FormErrorMessage>
  //               </FormControl>
  //             )}
  //           </Field>
  //           {props.values.instrument == Instruments.Stocks ? (
  //             <Field name="isShort">
  //               {({ field, form }) => (
  //                 <FormControl
  //                   id="isShort-control"
  //                   isRequired
  //                   isInvalid={form.errors.isShort && form.touched.isShort}
  //                 >
  //                   <FormLabel htmlFor="isShort" placeholder="Long or Short?">
  //                     Are you shorting this?
  //                   </FormLabel>
  //                   <Switch
  //                     {...field}
  //                     id="isWatching"
  //                     placeholder="Watching?"
  //                   />
  //                   <FormErrorMessage>
  //                     {form.errors.isWatching}
  //                   </FormErrorMessage>
  //                 </FormControl>
  //               )}
  //             </Field>
  //           ) : props.values.instrument == Instruments.Options ? (
  //             <Field name="optionStrategy">
  //               {({ field, form }) => (
  //                 <FormControl
  //                   id="optionsStrategy-control"
  //                   isRequired
  //                   isInvalid={
  //                     form.errors.optionsStrategy &&
  //                     form.touched.optionsStrategy
  //                   }
  //                 >
  //                   <FormLabel
  //                     htmlFor="optionsStrategy"
  //                     placeholder="Options Strategy"
  //                   >
  //                     Options Strategy
  //                   </FormLabel>
  //                   <Select
  //                     {...field}
  //                     id="optionsStrategy"
  //                     placeholder="Options Strategy"
  //                   >
  //                     {Object.values(OptionStrategies).map((strategy) => (
  //                       <option>{strategy}</option>
  //                     ))}
  //                   </Select>
  //                   <FormErrorMessage>
  //                     {form.errors.optionsStrategy}
  //                   </FormErrorMessage>
  //                 </FormControl>
  //               )}
  //             </Field>
  //           ) : null}

  //           <Field name="exitStrategy">
  //             {({ field, form }) => (
  //               <FormControl
  //                 id="exitStrategy-control"
  //                 isRequired
  //                 isInvalid={
  //                   form.errors.exitStrategy && form.touched.exitStrategy
  //                 }
  //               >
  //                 <FormLabel htmlFor="exitStrategy" placeholder="Exit Strategy">
  //                   Exit Strategy
  //                 </FormLabel>
  //                 <Input
  //                   {...field}
  //                   id="exitStrategy"
  //                   placeholder="Exit Strategy"
  //                 />
  //                 <FormErrorMessage>
  //                   {form.errors.exitStrategy}
  //                 </FormErrorMessage>
  //               </FormControl>
  //             )}
  //           </Field>
  //           <Field name="reasoning">
  //             {({ field, form }) => (
  //               <FormControl
  //                 id="reasoning-control"
  //                 isRequired
  //                 isInvalid={form.errors.reasoning && form.touched.reasoning}
  //               >
  //                 <FormLabel htmlFor="reasoning" placeholder="Reasoning">
  //                   Reasoning
  //                 </FormLabel>
  //                 <Select {...field} id="reasoning" placeholder="Reasoning">
  //                   {Object.keys(Reasons).map((reason) => (
  //                     <option>{reason}</option>
  //                   ))}
  //                 </Select>
  //                 <FormErrorMessage>{form.errors.reasoning}</FormErrorMessage>
  //               </FormControl>
  //             )}
  //           </Field>
  //           <Field name="targetAmount">
  //             {({ field, form }) => (
  //               <FormControl
  //                 id="targetAmount-control"
  //                 isRequired
  //                 isInvalid={
  //                   form.errors.targetAmount && form.touched.targetAmount
  //                 }
  //               >
  //                 <FormLabel htmlFor="targetAmount" placeholder="Target Amount">
  //                   Target Amount
  //                 </FormLabel>
  //                 <Input
  //                   type="number"
  //                   {...field}
  //                   id="targetAmount"
  //                   placeholder="Target Amount"
  //                 />
  //                 <FormErrorMessage>
  //                   {form.errors.targetAmount}
  //                 </FormErrorMessage>
  //               </FormControl>
  //             )}
  //           </Field>
  //           */}
  //           <Button mt={4} isLoading={false} type="submit">
  //             Submit
  //           </Button>
  //         </form>
  //       </FielderProvider>
  //     )}
  //   </Box>
  // );
};
