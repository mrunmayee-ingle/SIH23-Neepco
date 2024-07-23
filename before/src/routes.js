import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdOutlineSettings,
  MdFileCopy,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import RTL from "views/admin/rtl";

// Auth Imports
import SignInCentered from "views/auth/signIn";
import CreateTendor from "views/admin/createTendor";

const routes = [
  {
    name: " Tender Dashboard",
    layout: "/admin",
    path: "/default",
    role: ["admin"],
    isSidebar: true,

    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: MainDashboard,
  },
  {
    name: " Tender Dashboard",
    layout: "/admin",
    path: "/create-tender",
    role: ["admin"],
    isSidebar: false,

    component: CreateTendor,
  },

  // {
  //   name: "Analysis",
  //   layout: "/admin",
  //   path: "/nft-marketplace",
  //   role: ["admin"],
  //   icon: (
  //     <Icon
  //       as={MdOutlineShoppingCart}
  //       width="20px"
  //       height="20px"
  //       color="inherit"
  //     />
  //   ),
  //   component: NFTMarketplace,
  //   secondary: true,
  // },

  {
    name: "Tenders",
    layout: "/admin",
    path: "/tenders",
    role: ["admin", "user"],
    isSidebar: true,
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: NFTMarketplace,
    secondary: true,
  },
  {
    name: "My Space",
    layout: "/admin",
    path: "/my-space",
    role: ["user"],
    isSidebar: true,

    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: Profile,
    secondary: true,
  },
  // {
  //   name: "Data Tables",
  //   layout: "/admin",
  //   icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
  //   path: "/data-tables",
  //   component: DataTables,
  // },
  // {
  //   name: "Data Tables",
  //   layout: "/admin",
  //   role: ["admin"],

  //   icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
  //   path: "/data-tables",
  //   component: DataTables,
  // },
  {
    //name: "Profile",
    name: "Analytics",
    layout: "/admin",
    isSidebar: true,

    role: ["admin"],
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: "/analytics",
    component: DataTables,
  },
  // {
  //   name: "Profile",
  //   layout: "/admin",
  //   role: ["admin"],

  //   path: "/profile",
  //   icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
  //   component: Profile,
  // },
  {
    name: "Sign In",
    layout: "/auth",
    role: [],
    isSidebar: true,

    path: "/sign-in",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: SignInCentered,
  },
  // {
  //   name: "Settings",
  //   layout: "/admin",
  //   path: "/default",
  //   role: ["admin"],
  //   isSidebar: true,

  //   icon: <Icon as={MdOutlineSettings} width="20px" height="20px" color="inherit" />,
  //   component: MainDashboard,
  // },

  {
    name: "Ongoing Contracts and Progress",
    layout: "/admin",
    path: "/profile",
    role: ["admin"],
    isSidebar: true,

    icon: <Icon as={MdFileCopy} width="20px" height="20px" color="inherit" />,
    component: MainDashboard,
  },
  {
    name: "Ongoing Contracts and Progress",
    layout: "/admin",
    path: "/profile",
    role: ["admin"],
    isSidebar: false,

    //component: CreateTendor,
  },
  // {
  //   name: "RTL Admin",
  //   layout: "/rtl",
  //   path: "/rtl-default",
  //   icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
  //   component: RTL,
  // },
];

export default routes;
