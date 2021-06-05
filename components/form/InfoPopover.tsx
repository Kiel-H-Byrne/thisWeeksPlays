import React from "react";
import {
  ChakraComponent,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { MoreInformation } from "@/util/index";

export const IconPopover = ({ name, Icon }: { name: string, Icon: ChakraComponent<any> }) => {
  return (
    <Popover placement="top-start" trigger="hover">
      <PopoverTrigger>
        <Icon aria-label={`More About ${name}`} />
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
