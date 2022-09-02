import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getItems } from "utils";

export const fetchItems = createAsyncThunk(
  "getItems/fetchList",
  async (account) => {
    const response = await getItems(account);
    return {
      data: response,
      account,
    };
  }
);

export const getItemsSlice = createSlice({
  name: "getItems",
  initialState: {
    isLoading: false,
    items: [],
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.isLoading = false;
      let itemsData = [];
      const { data, account } = action.payload;

      if (data.length) {
        data.forEach((val) => {
          if (val.owner === account.account) {
            itemsData.push(val);
          }
        });
      }

      state.items = itemsData;
    });
  },
});

export default getItemsSlice.reducer;
