import { configureStore } from "@reduxjs/toolkit";
import getItemsListReducer from "./getItems/getItemsSlice";

export default configureStore({
  reducer: {
    itemsList: getItemsListReducer,
  },
});
