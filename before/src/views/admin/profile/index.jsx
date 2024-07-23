import { Box, SimpleGrid } from "@chakra-ui/react";
//import DevelopmentTable from "views/admin/dataTables/components/DevelopmentTable";
//import CheckTable from "views/admin/dataTables/components/CheckTable";
//import ColumnsTable from "views/admin/dataTables/components/ColumnsTable";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import {
  //columnsDataDevelopment,
  //columnsDataCheck,
  //columnsDataColumns,
  columnsDataComplex,
} from "views/admin/dataTables/variables/columnsData";
//import tableDataDevelopment from "views/admin/dataTables/variables/tableDataDevelopment.json";
//import tableDataCheck from "views/admin/dataTables/variables/tableDataCheck.json";
//import tableDataColumns from "views/admin/dataTables/variables/tableDataColumns.json";
import tableDataComplex from "views/admin/dataTables/variables/tableDataComplex.json";
//import PieCard from "views/admin/default/components/PieCard";
//import DailyTraffic from "views/admin/default/components/DailyTraffic";

import React from "react";

export default function Settings() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: "20px", xl: "20px" }}>
          {/* <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          <DailyTraffic />
          <PieCard />
        </SimpleGrid> */}
        {/* <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        <TotalSpent />
        <WeeklyRevenue />
      </SimpleGrid>
        {/* <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={tableDataDevelopment}
        /> */}
        {/* <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
        <ColumnsTable
          columnsData={columnsDataColumns}
          tableData={tableDataColumns}
        /> */}
        {<ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        /> }
      </SimpleGrid>
    </Box>
  );
}



























// Chakra imports
// import { Box, Grid } from "@chakra-ui/react";

// // Custom components
// import Banner from "views/admin/profile/components/Banner";
// import General from "views/admin/profile/components/General";
// import Notifications from "views/admin/profile/components/Notifications";
// import Projects from "views/admin/profile/components/Projects";
// import Storage from "views/admin/profile/components/Storage";
// import Upload from "views/admin/profile/components/Upload";


// // Assets
// import banner from "assets/img/auth/banner.png";
// import avatar from "assets/img/avatars/avatar4.png";
// import React from "react";

// export default function Overview() {
//   return (
//     <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
//       {/* Main Fields */}
//       <Grid
//         templateColumns={{
//           base: "1fr",
//         }}
//         templateRows={{
//           base: "repeat(3, 1fr)",
//           lg: "1fr",
//         }}
//         gap={{ base: "20px", xl: "20px" }}
//       >
//         {/* <Banner
//           gridArea="1 / 1 / 2 / 2"
//           banner={banner}
//           avatar={avatar}
//           name="Adela Parkson"
//           job="Product Designer"
//           posts="17"
//           followers="9.7k"
//           following="274"
//         /> */}
//         <Storage
//           gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
//           used={25.6}
//           total={50}
//         />
//         <Upload
//           gridArea={{
//             base: "3 / 1 / 4 / 2",
//             lg: "1 / 3 / 2 / 4",
//           }}
//           minH={{ base: "auto", lg: "420px", "2xl": "365px" }}
//           pe="20px"
//           pb={{ base: "100px", lg: "20px" }}
//         />
//       </Grid>
//       <Grid
//         mb="20px"
//         templateColumns={{
//           base: "1fr",
//           lg: "repeat(1, 1fr)",
//           "2xl": "1.34fr 1.62fr 1fr",
//         }}
//         templateRows={{
//           base: "1fr",
//           lg: "repeat(2, 1fr)",
//           "2xl": "1fr",
//         }}
//         gap={{ base: "20px", xl: "20px" }}
//       >
//         <Projects
//           gridArea="2 / 2 / 2 / 2"
//           banner={banner}
//           avatar={avatar}
//           name="Adela Parkson"
//           job="Product Designer"
//           posts="17"
//           followers="9.7k"
//           following="274"
//         />
//         {/* <General
//           gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
//           minH="365px"
//           pe="20px"
//         />
//         <Notifications
//           used={25.6}
//           total={50}
//           gridArea={{
//             base: "3 / 1 / 4 / 2",
//             lg: "2 / 1 / 3 / 3",
//             "2xl": "1 / 3 / 2 / 4",
//           }}
//         /> */}
//       </Grid>
//     </Box>
//   );
// }
