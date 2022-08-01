import { createAsyncThunk } from "@reduxjs/toolkit";
import { getEscAcc } from "utils";

export const fetchEscrowAccount = createAsyncThunk(
  "escrowAccount/fetch-escrow-account",
  async () => {
    return await getEscAcc();
  }
);
