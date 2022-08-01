import { createSlice } from "@reduxjs/toolkit";
import { fetchEscrowAccount } from "./fetchEscrowAccount";

export const escrowAccountReducer = createSlice({
  name: "escrowAccount",
  initialState: {
    escrowAccount: "",
    escrowAccountPending: false,
    escrowAccountFailure: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEscrowAccount.pending, (state) => {
      state.escrowAccountPending = true;
      state.escrowAccountFailure = false;
    });
    builder.addCase(fetchEscrowAccount.fulfilled, (state, action) => {
      state.escrowAccount = action.payload;
      state.escrowAccountPending = false;
    });
    builder.addCase(fetchEscrowAccount.rejected, (state, action) => {
      state.escrowAccountPending = false;
      state.escrowAccountFailure = true;
    });
  },
});

export default escrowAccountReducer.reducer;
