import { createSelector } from "@reduxjs/toolkit";

export const escrowItemsState = (state) => state.escrowItems;

export const getEscrowItems = createSelector(
  escrowItemsState,
  (state) => state.escrowItems
);
export const getEscrowItemsPending = createSelector(
  escrowItemsState,
  (state) => state.escrowItemsPending
);
