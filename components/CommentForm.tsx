import React from "react";
import { useFormik } from "formik";
import { Box, Button, Text, Textarea } from "@chakra-ui/react";
import { mutate } from "swr";
import axios from "axios";
import { Comment } from '../types';
import { signIn } from 'next-auth/client';

interface Props {
  oid: string;
  session: any;
}
const CommentForm = ({ oid, session }: Props) => {
  const formik = useFormik({
    initialValues: {
      oid,
      userName: session?.user.name,
      comment: "",
    } as any,
    validate: async (values: Comment) => {
      const errors: any = {};
      if (values.comment.length < 5) {
        errors.comment = "Let's say a bit more...";
      }
      if (values.comment.length == 0) {
        errors.comment = "Cannot be blank"
        
      }
      return errors;
    },
    onSubmit: async (values, helpers) => {
      const apiUrl = `/api/orders/comments/${values.oid}`;
      helpers.setSubmitting(true);

      mutate(apiUrl, values, false);

      mutate(
        apiUrl,
        await axios.post(apiUrl, {
          data: { ...values, uid: session["id"] },
        })
      );
      helpers.setSubmitting(false);
      helpers.resetForm({})
      helpers.setStatus({success: true})

    },
  });

  return (
      <Box marginInline="3" >
        {!formik.isSubmitting ? ( //if a user is logged in right??
          <form onSubmit={formik.handleSubmit}>
            <Textarea
              rows={2}
              id="comment"
              name="comment"
              onChange={formik.handleChange}
            />
            {formik.errors ? <Text as="p" color="red" textAlign="center">{formik.errors.comment}</Text>: null}
            {session ? <Button type="submit">Comment</Button> : <Button onClick={() => signIn()}>Login to Comment</Button>}
          </form>
        ) : (
          <>Submitting...</>
        )}
      </Box>
  );
};

export default CommentForm;
