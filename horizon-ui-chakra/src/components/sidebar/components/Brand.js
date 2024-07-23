import React from "react";

// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";

// Custom components
import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";
import neepcoLogo from "../../../assets/neepco.png";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align="center" direction="column">
      <img
        src={neepcoLogo}
        alt="neepco-logo"
        style={{ width: "30%", marginBottom: "1rem" }}
      />
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
