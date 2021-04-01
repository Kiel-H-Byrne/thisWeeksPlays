import { Grid } from "@chakra-ui/react";
import { useSession } from "next-auth/client";
import React from "react";
import MyAvatar from "./MyAvatar";

interface Props {
  uid: number;
  message: string;
}
export const CommentCard = ({ uid, message }: Props) => {
  const [session, loading] = useSession();

  return (
    <div key={uid} className={""}>
      <Grid container direction="row" alignItems="center">
        <Grid item xs={2} md={1}>
          {session && !loading ? (
            <MyAvatar />
          ) : (
            <img
              alt="image"
              src={`https://avatars.dicebear.com/api/bottts/${uid}.svg`}
              className={""}
              height="43px"
              width="43px"
            />
          )}
        </Grid>
        <Grid item xs={10} md={11}>
          <span>{message}</span>
        </Grid>
      </Grid>
    </div>
  );
};
