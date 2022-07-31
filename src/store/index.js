import { configureStore } from "@reduxjs/toolkit";
import escrowItems from "./account/reducer";

export default configureStore({
  reducer: {
    escrowItems: escrowItems,
  },
});
