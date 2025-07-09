import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["ME", "WALLET", "TXNS", "COMMISSIONS"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // --- USER APIs ---
    me: builder.query({
      query: () => `/users/me`,
      providesTags: ["ME"],
    }),
    login: builder.mutation({
      query: (body) => ({
        url: `/users/login`,
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: `/users/register`,
        method: "POST",
        body,
      }),
    }),
    updateUser: builder.mutation({
      query: (body) => ({
        url: `/users/${body._id}`,
        method: "PUT",
        body,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/users/logout`,
        method: "POST",
      }),
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: `/users/change-password`,
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: `/users/reset-password`,
        method: "POST",
        body,
      }),
    }),
    verfiyInvitation: builder.mutation({
      query: (body) => ({
        url: `/users/verify-invitation`,
        method: "POST",
        body,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: `/users/forgot-password`,
        method: "POST",
        body,
      }),
    }),

    // --- WALLET APIs ---
    getWallet: builder.query({
      query: (userId) => `/wallets/${userId}`,
      providesTags: ["WALLET"],
    }),
    createWallet: builder.mutation({
      query: (body) => ({
        url: `/wallets/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["WALLET"],
    }),

    // --- TRANSACTION APIs ---
    createTransaction: builder.mutation({
      query: (body) => ({
        url: `/transactions/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["TXNS", "WALLET"],
    }),
    transferTransaction: builder.mutation({
      query: (body) => ({
        url: `/transactions/transfer`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["TXNS", "WALLET"],
    }),
    approveTransaction: builder.mutation({
      query: (id) => ({
        url: `/transactions/approve/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["TXNS", "WALLET"],
    }),
    rejectTransaction: builder.mutation({
      query: (id) => ({
        url: `/transactions/reject/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["TXNS"],
    }),
    getUserTransactions: builder.query({
      query: (userId) => `/transactions/user/${userId}`,
      providesTags: ["TXNS"],
    }),
    requestWithdrawal: builder.mutation({
      query: (body) => ({
        url: `/transactions/withdraw`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["TXNS", "WALLET"],
    }),
    requestDeposit: builder.mutation({
      query: (body) => ({
        url: `/transactions/deposit`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["TXNS", "WALLET"],
    }),
    getAllTransactions: builder.query({
      query: () => `/transactions/admin/all`,
      providesTags: ["TXNS"],
    }),

    // --- COMMISSION APIs ---
    getCommissions: builder.query({
      query: () => `/commissions`,
      providesTags: ["COMMISSIONS"],
    }),
  }),
});

export const {
  useMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerfiyInvitationMutation,

  // Wallet
  useGetWalletQuery,
  useCreateWalletMutation,

  // Transaction
  useCreateTransactionMutation,
  useTransferTransactionMutation,
  useApproveTransactionMutation,
  useRejectTransactionMutation,
  useGetUserTransactionsQuery,
  useRequestWithdrawalMutation,
  useRequestDepositMutation,
  useGetAllTransactionsQuery,

  // Commissions
  useGetCommissionsQuery,
} = api;
