import React from "react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { MoreInformation } from "@/util/index";

export const InfoPopover = ({ name }: { name: string }) => {
  return (
    <Popover placement="top-start" trigger="hover">
      <PopoverTrigger>
        <InfoOutlineIcon aria-label={`More About ${name}`} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader
          fontWeight="semibold"
          fontSize="sm"
          textTransform="capitalize"
        >
          {name.split("-").join(" ")}:
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody fontWeight="normal" fontSize="sm">
          {MoreInformation[name]}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
