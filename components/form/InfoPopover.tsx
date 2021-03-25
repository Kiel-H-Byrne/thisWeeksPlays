import React from "react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
  IconButton,
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
    <Popover placement="top-start">
      <PopoverTrigger>
        <InfoOutlineIcon aria-label={`More About ${name}`} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader fontWeight="semibold">
          {name.split("-").join("")}...
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>{MoreInformation[name]}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
