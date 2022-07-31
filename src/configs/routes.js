import Homepage from "pages/homepage";
import CreateItem from "pages/createItem";
import RequestItem from "pages/requestItem";
import PerformDelivery from "pages/performDelivery";
import PageNotFound from "pages/pageNotFound";

export const routes = [
  {
    label: "Home",
    path: "/",
    isExact: true,
    module: <Homepage />,
    isPrivate: false,
  },
  {
    label: "Create Item",
    isExact: true,
    path: "/create-item",
    module: <CreateItem />,
    isPrivate: true,
  },
  {
    label: "Request Item",
    isExact: true,
    path: "/request-item",
    module: <RequestItem />,
    isPrivate: true,
  },
  {
    label: "Perform Delivery",
    isExact: true,
    path: "/perform-delivery",
    module: <PerformDelivery />,
    isPrivate: true,
  },
  {
    path: "*",
    isExact: true,
    module: <PageNotFound />,
    isPrivate: false,
  },
];
