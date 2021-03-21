import { Grid } from "@chakra-ui/react";
import React from "react";

interface Props {
  uuid: string;
  message: string;
}
export const CommentCard = ({ uuid, message }: Props) => {
  return (
    <div key={`${uuid}-${i}`} className={""}>
      <Grid container direction="row" alignItems="center">
        <Grid item xs={2} md={1}>
          <img
            alt="image"
            src={`https://api.adorable.io/avatars/40/${uuid}.pngCopy`}
            className={""}
            height="43px"
            width="43px"
          />
        </Grid>
        <Grid item xs={10} md={11}>
          <span>{message}</span>
        </Grid>
      </Grid>
    </div>
  );
};
