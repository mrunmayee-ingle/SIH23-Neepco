// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React, { useState } from "react";
// Assets
import { MdUpload } from "react-icons/md";
import Dropzone from "./Dropzone";

export default function Upload(props) {
  const {
    used,
    total,
    selectedFile,
    selectedFileName,
    setSelectedFile,
    setSelectedFileName,
    ...rest
  } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const brandColor = useColorModeValue("brand.500", "white");
  const textColorSecondary = "gray.400";

  return (
    <Card {...rest} mb="20px" align="center" p="20px">
      <Flex h="100%" direction={{ base: "column", "2xl": "row" }}>
        <Dropzone
          w={{ base: "100%", "2xl": "268px" }}
          me="36px"
          onFileSelected={(file) => {
            setSelectedFile(file);
            setSelectedFileName(file.name);
          }}
          selectedFileName={selectedFileName}
          content={
            <Box marginTop={"15rem"}>
              <Icon as={MdUpload} w="80px" h="80px" color={brandColor} />
              <Flex justify="center" mx="auto" mb="12px">
                <Text fontSize="xl" fontWeight="700" color={brandColor}>
                  Upload Tender
                </Text>
              </Flex>
              <Text fontSize="sm" fontWeight="500" color="secondaryGray.500">
                PDF only. 10MB max
              </Text>
            </Box>
          }
        />
      </Flex>
    </Card>
  );
}
