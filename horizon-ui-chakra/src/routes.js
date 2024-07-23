import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdFolderOpen,
  MdAssignment,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import Analytics from "views/admin/analytics";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import RTL from "views/admin/rtl";
import Viewbids from "views/admin/viewbids";
import Placebids from "views/admin/placebids";
import Viewtendors from "views/admin/viewtendors";
import Ongoingcontract from "views/admin/ongoingcontract";
import { IoDocumentText, IoDocuments } from "react-icons/io5";
import Createtendor from "views/admin/createtendor";
import Createbid from "views/admin/createbid";

// Auth Imports
import SignInCentered from "views/auth/signIn";
import { ImHammer2 } from "react-icons/im";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "/dashboard",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: MainDashboard,
    roles: ["admin"],
    isSidebar: true,
  },

  {
    name: "Tenders",
    layout: "/admin",
    path: "/tenders",
    icon: <Icon as={IoDocuments} width="20px" height="20px" color="inherit" />,
    component: NFTMarketplace,
    secondary: true,
    roles: ["admin"],
    isSidebar: true,
  },
  {
    name: "View Bids",
    layout: "/admin",
    path: "/view-bids",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: Viewbids,
    secondary: true,
    roles: ["admin"],
  },

  {
    name: "Create Tender",
    layout: "/admin",
    path: "/create-tender",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    // component: Viewbids,
    component: Createtendor,
    secondary: true,
    roles: ["admin"],
  },
  {
    name: "Place Bid",
    layout: "/admin",
    path: "/create-bid",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    // component: Viewbids,
    component: Createbid,
    secondary: true,
    roles: ["user"],
  },

  {
    name: "Analytics",
    layout: "/admin",
    path: "/analytics",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    component: Analytics,
    roles: ["admin"],
    isSidebar: true,
  },
  // {
  //   name: "Data Tables",
  //   layout: "/admin",
  //   icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
  //   path: "/data-tables",
  //   component: DataTables,
  //   roles: ["admin"],
  //   isSidebar: true,
  // },

  {
    name: "Place Bids",
    layout: "/admin",
    path: "/place-bids",
    icon: <Icon as={ImHammer2} width="20px" height="20px" color="inherit" />,
    component: Viewtendors,
    roles: ["user"],
    isSidebar: true,
  },
  {
    name: "Ongoing Contracts",
    layout: "/admin",
    path: "/ongoing-contracts",
    icon: <Icon as={MdAssignment} width="20px" height="20px" color="inherit" />,
    component: Ongoingcontract,
    secondary: true,
    isSidebar: true,
    roles: ["admin", "user"],
  },
  {
    name: "My Space",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdFolderOpen} width="20px" height="20px" color="inherit" />,
    component: Profile,
    roles: ["user"],
    isSidebar: true,
  },
  // {
  //   name: "Sign In",
  //   layout: "/auth",
  //   path: "/sign-in",
  //   icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
  //   component: SignInCentered,
  //   roles: ["admin"],
  // },
];

export default routes;
