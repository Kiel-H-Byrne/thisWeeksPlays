import React from "react";
import { useFormik } from "formik";
import { Box, Button, Textarea } from "@chakra-ui/react";
import { Session } from "next-auth";
import { mutate } from "swr";
import axios from "axios";

interface Props {
  oid: string;
  session: Session;
}
const CommentForm = ({ oid, session }: Props) => {
  const formik = useFormik({
    initialValues: {
      oid,
      userName: session.user.name,
      comment: "",
    },
    onSubmit: async (values, helpers) => {
      const apiUrl = `/api/orders/comments/${values.oid}`;
      helpers.setSubmitting(true);

      mutate(apiUrl, values,true);

      mutate(
        apiUrl,
        await axios.post(apiUrl, {
          data: values,
        })
      );
      helpers.setSubmitting(false);
    },
  });

  return (
    <Box>
      <span>Comments</span>
      <Box key={oid} marginInline="3" style={{ display: "inline-flex" }}>
        {true ? (
          <form onSubmit={formik.handleSubmit}>
            <Textarea
              rows={2}
              id="comment"
              name="comment"
              onChange={formik.handleChange}
            />
            <Button type="submit">Comment</Button>
          </form>
        ) : (
          <>Submitting...</>
        )}
      </Box>
    </Box>
  );
};

export default CommentForm;
