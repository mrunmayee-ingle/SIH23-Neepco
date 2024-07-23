/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React, { useLayoutEffect } from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/viewbids/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/viewbids/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/viewbids/variables/tableDataComplex.json";
import General from "views/admin/viewbids/components/General";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "url";
import { ChatFeed, Message } from "react-chat-ui";

export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  //how can i access the id in the url
  const history = useHistory();
  const id = history.location.pathname.split("view-bids/")[1];
  const [data, setData] = React.useState([]);
  useLayoutEffect(() => {
    async function getData() {
      await axios
        .get(`${BASE_URL}/tendorById?id=${id}`)
        .then((res) => {
          let data = res.data;
          //in data reverse the bids array and keep everything else same
          data.bids = data.bids.reverse();

          setData(data);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getData();

    const eventSource = new EventSource(`${BASE_URL}/sse`);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "new-bid") {
        // Handle the incoming bid data here
        getData();
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE Error:", error);
      eventSource.close();
    };

    return () => {
      // Clean up the EventSource when the component unmounts
      eventSource.close();
    };

    //if page not active then cancel the axios request
  }, []);

  const chatData = [
    new Message({
      id: 1,
      message:
        "We request you to kindly modify the said sub-clause as \n (d) Last date & time for submission for online bids: Upto 14:00 Hours of 27-10-2023",
    }), // Gray bubble
    new Message({ id: 0, message: "Bid stipulation shall prevail" }), // Blue bubble
  ];
  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap="20px"
        mb="20px"
      >
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdBarChart} color={brandColor} />
              }
            />
          }
          name="Earnings"
          value="$350.4"
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdAttachMoney} color={brandColor} />
              }
            />
          }
          name="Spend this month"
          value="$642.39"
        />
        <MiniStatistics growth="+23%" name="Sales" value="$574.34" />
        <MiniStatistics
          endContent={
            <Flex me="-16px" mt="10px">
              <FormLabel htmlFor="balance">
                <Avatar src={Usa} />
              </FormLabel>
              <Select
                id="balance"
                variant="mini"
                mt="5px"
                me="0px"
                defaultValue="usd"
              >
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="gba">GBA</option>
              </Select>
            </Flex>
          }
          name="Your balance"
          value="$1,000"
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg="linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)"
              icon={<Icon w="28px" h="28px" as={MdAddTask} color="white" />}
            />
          }
          name="New Tasks"
          value="154"
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdFileCopy} color={brandColor} />
              }
            />
          }
          name="Total Projects"
          value="2935"
        />
      </SimpleGrid> */}

      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
        <General minH="auto" pe="20px" data={data?.tendor?.bestBid} />
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
          data={data?.bids}
        />
        <SimpleGrid
          columns={{ base: 1, md: 1, xl: 1 }}
          gap="20px"
          mb="20px"
          backgroundColor={"white"}
          p="20px"
          borderRadius="25px"
        >
          <Text
            color={textColor}
            fontSize="22px"
            fontWeight="700"
            lineHeight="100%"
          >
            Queries
          </Text>
          <ChatFeed
            messages={chatData} // Array: list of message objects
            isTyping={false} // Boolean: is the recipient typing
            hasInputField={false} // Boolean: use our input, or use your own
            showSenderName // show the name of the user who sent the message
            bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
            // JSON: Custom bubble styles
            bubbleStyles={{
              text: {
                fontSize: 16,
              },
              chatbubble: {
                borderRadius: 20,
                padding: 10,
              },
            }}
          />
        </SimpleGrid>
      </SimpleGrid>
      {/* <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
          <DailyTraffic />
          <PieCard />
        </SimpleGrid>
      </SimpleGrid> */}
      {/* <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          <Tasks />
          <MiniCalendar h='100%' minW='100%' selectRange={false} />
        </SimpleGrid>
      </SimpleGrid> */}
    </Box>
  );
}
