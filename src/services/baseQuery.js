import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { resetTokens, setTokens } from "../store/reducers/authReducers";

const baseUrl = import.meta.env.VITE_API_URL;

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (
    result.error &&
    result.error.status === 401 &&
    result.error.data?.data?.type === "TOKEN_EXPIRED"
  ) {
    const authState = api.getState().auth;

    // If no refresh token, skip
    if (!authState.refreshToken) {
      return result;
    }

    // Attempt refresh
    const refreshResult = await baseQuery(
      {
        url: "/users/refresh-token",
        method: "POST",
        body: { refreshToken: authState.refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult?.data?.data) {
      // ✅ Update Redux + localStorage
      api.dispatch(setTokens(refreshResult.data.data));

      // Retry original query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(resetTokens());
      return refreshResult;
    }
  }

  return result;
};

