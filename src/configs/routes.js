import Homepage from "pages/homepage";
import CreateItem from "pages/createItem";
import RequestItem from "pages/requestItem";
import PerformDelivery from "pages/performDelivery";
import PageNotFound from "pages/pageNotFound";
import OwnerPannel from "pages/ownerPannel";
import { OwnerPannelRefundItem } from "pages/ownerPannelRefundItem";
import OwnerPannelWithdrawFund from "pages/ownerPannelWithdrawFund.jsx";

export const routes = [
  {
    label: "Home",
    path: "/",
    isExact: true,
    module: <Homepage />,
    isPrivate: false,
    children: [],
  },
  // {
  //   label: "Create Item",
  //   isExact: true,
  //   path: "/create-item",
  //   module: <CreateItem />,
  //   isPrivate: true,
  //   children: [],
  // },
  {
    label: "Request Item",
    isExact: true,
    path: "/request-item",
    module: <RequestItem />,
    isPrivate: true,
    children: [],
  },
  {
    label: "Perform Delivery",
    isExact: true,
    path: "/perform-delivery",
    module: <PerformDelivery />,
    isPrivate: true,
    children: [],
  },
  {
    label: "Owner Pannel",
    isExact: true,
    path: "/owner-pannel",
    module: <OwnerPannel />,
    isPrivate: true,
    isExactUser: true,
    children: [
      {
        label: "Refund Item",
        isExact: true,
        path: "refund-item",
        module: <OwnerPannelRefundItem />,
      },
      {
        label: "Withdraw Fund",
        isExact: true,
        path: "withdraw-fund",
        module: <OwnerPannelWithdrawFund />,
      },
    ],
  },
  {
    path: "*",
    isExact: true,
    module: <PageNotFound />,
    isPrivate: false,
    children: [],
  },
];
