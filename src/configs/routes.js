import CreateItem from "pages/createItem";
import RequestItem from "pages/requestItem";
import PageNotFound from "pages/pageNotFound";
import Escrow from "pages/homepage";

export const routes = [
  {
    label: "Home",
    path: "/",
    isExact: true,
    module: <Escrow />,
  },
  {
    label: "Create Item",
    isExact: true,
    path: "/create-item",
    module: <CreateItem />,
  },
  {
    label: "Request Item",
    isExact: true,
    path: "/request-item",
    module: <RequestItem />,
  },
  {
    path: "*",
    isExact: true,
    module: <PageNotFound />,
  },
];
