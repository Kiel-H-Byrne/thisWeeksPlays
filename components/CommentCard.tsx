import { Box, VStack } from "@chakra-ui/react";
import { useSession } from "next-auth/client";
import React from "react";
import { Comment } from "../types";
import MyAvatar from "./MyAvatar";


export const CommentCard = ({ uid, userName, message }: Comment) => {
  const [session, loading] = useSession();

  return (
    <Box key={uid as any} className={""} style={{ display: "inline-flex" }}>
      {session && !loading ? (
        <MyAvatar />
      ) : (
        <img
          alt="image"
          src={`https://avatars.dicebear.com/api/bottts/${uid}${Math.random()*234}.svg`}
          className={""}
          height="43px"
          width="43px"
        />
      )}
      <VStack>
        <Box>{message}</Box>
        <Box>@{userName}</Box>
      </VStack>
    </Box>
  );
};
