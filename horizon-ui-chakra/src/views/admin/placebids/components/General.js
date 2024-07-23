// Chakra imports
import {
  Button,
  Flex,
  SimpleGrid,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React from "react";
import Information from "views/admin/profile/components/Information";

// Assets
export default function GeneralInformation(props) {
  const { data } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  const fileUrl = data?.pdfUrl;

  console.log("data: ", data?.pdfUrl);
  return (
    <Card mb={{ base: "0px", "2xl": "20px" }}>
      <Flex
        direction={{ base: "row" }}
        align={"center"}
        justify={"space-between"}
        paddingRight={"5rem"}
      >
        <Text
          color={textColorPrimary}
          fontWeight="bold"
          fontSize="2xl"
          mt="10px"
          mb="4px"
        >
          Best Bid
        </Text>
        <Link href={fileUrl} target="_blank">
          <Button
            mt="10px"
            mb="4px"
            variant="darkBrand"
            color="white"
            fontSize="sm"
            fontWeight="500"
            borderRadius="70px"
            px="24px"
            py="5px"
          >
            View Bid
          </Button>
        </Link>
      </Flex>
      {/* <Text color={textColorSecondary} fontSize="md" me="26px" mb="40px">
        As we live, our hearts turn colder. Cause pain is what we go through as
        we become older. We get insulted by others, lose trust for those others.
        We get back stabbed by friends. It becomes harder for us to give others
        a hand. We get our heart broken by people we love, even that we give
        them all...
      </Text> */}
      <SimpleGrid columns="2" gap="20px">
        <Information boxShadow={cardShadow} title="By" value={data?.name} />
        <Information
          boxShadow={cardShadow}
          title="Price"
          value={data?.ocr.price}
        />
        {/* <Information
          boxShadow={cardShadow}
          title="Department"
          value="Product Design"
        />
        <Information
          boxShadow={cardShadow}
          title="Work History"
          value="Google, Facebook"
        />
        <Information
          boxShadow={cardShadow}
          title="Organization"
          value="Simmmple Web LLC"
        />
        <Information
          boxShadow={cardShadow}
          title="Birthday"
          value="20 July 1986"
        /> */}
      </SimpleGrid>
    </Card>
  );
}
