import CreateItem from "pages/createItem";
import RequestItem from "pages/requestItem";
import PageNotFound from "pages/pageNotFound";
import Homepage from "pages/homepage";

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
    path: "*",
    isExact: true,
    module: <PageNotFound />,
    isPrivate: false,
  },
];
