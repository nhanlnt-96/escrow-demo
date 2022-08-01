import { createSlice } from "@reduxjs/toolkit";
import { fetchEscrowItems } from "./fetchEscrowItems";

export const escrowItemsReducer = createSlice({
  name: "escrowItems",
  initialState: {
    escrowItems: [],
    escrowItemsPending: false,
    escrowItemsFailure: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEscrowItems.pending, (state) => {
      state.escrowItemsPending = true;
      state.escrowItemsFailure = false;
    });
    builder.addCase(fetchEscrowItems.fulfilled, (state, action) => {
      state.escrowItemsPending = false;
      state.escrowItems = action.payload;
    });
    builder.addCase(fetchEscrowItems.rejected, (state, action) => {
      state.escrowItemsPending = false;
      state.escrowItemsFailure = true;
    });
  },
});

export default escrowItemsReducer.reducer;
