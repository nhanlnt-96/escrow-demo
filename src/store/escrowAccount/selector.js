import { createSelector } from "@reduxjs/toolkit";

export const escrowAccountState = (state) => state.escrowAccount;

export const getEscrowAccountPending = createSelector(
  escrowAccountState,
  (state) => state.escrowAccountPending
);

export const getEscrowAccount = createSelector(
  escrowAccountState,
  (state) => state.escrowAccount
);
