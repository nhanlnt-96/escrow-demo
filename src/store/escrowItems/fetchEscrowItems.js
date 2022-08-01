import { createAsyncThunk } from "@reduxjs/toolkit";
import { getItems } from "utils";

export const fetchEscrowItems = createAsyncThunk(
  "escrowItems/fetch-escrow-items",
  async (account) => {
    const response = await getItems(account);

    return response
      ?.filter((data) => data.owner === account)
      .map((item) => {
        return {
          amount: item.amount,
          confirmed: item.confirmed,
          itemId: item.itemId,
          owner: item.owner,
          provided: item.provided,
          provider: item.provider,
          purpose: item.purpose,
          status: item.status,
          timestamp: item.timestamp,
        };
      });
  }
);
