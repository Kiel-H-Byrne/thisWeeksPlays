import { Grid } from "@chakra-ui/react";
import { useSession } from "next-auth/client";
import React from "react";
import MyAvatar from "./MyAvatar";

interface Props {
  uuid: string;
  message: string;
}
export const CommentCard = ({ uuid, message }: Props) => {
  const [session, loading] = useSession();

  return (
    <div key={uuid} className={""}>
      <Grid container direction="row" alignItems="center">
        <Grid item xs={2} md={1}>
          {session && !loading ? (
            <MyAvatar />
          ) : (
            <img
              alt="image"
              src={`https://avatars.dicebear.com/api/bottts/${uuid}.svg`}
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
