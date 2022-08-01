import { configureStore } from "@reduxjs/toolkit";
import escrowItemsReducer from "./escrowItems/reducer";
import escrowAccountReducer from "./escrowAccount/reducer";

export default configureStore({
  reducer: {
    escrowItems: escrowItemsReducer,
    escrowAccount: escrowAccountReducer,
  },
});
