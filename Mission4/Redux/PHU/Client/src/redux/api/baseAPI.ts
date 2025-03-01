import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { logOut, setUser } from "../feature/auth/authSlice";
import { RootState } from "../store/store";
import { toast } from "sonner";
import { IErrorData } from "../../types";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

const BaseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  console.log("Result before refresh token", result);

  if (result?.error?.status === 404) {
    toast.error(
      (result?.error?.data as IErrorData)?.message || "Resource not found"
    );
  }
  if (result?.error?.status === 401) {
    // Send refresh token request here
    console.log("Refresh token request is sending ...");
    // If refresh token is expired, log out the user
    const res = await fetch("http://localhost:5000/api/v1/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });

    const user = (api.getState() as RootState).auth.user;

    const data = await res.json();

    if (data?.data?.accessToken) {
      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken,
        })
      );
      console.log("Refresh token is received");
      result = await baseQuery(args, api, extraOptions);
      console.log("Request is sent again");
      console.log("Result after refresh token", result);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const baseAPI = createApi({
  reducerPath: "baseAPI",
  baseQuery: BaseQueryWithRefreshToken,
  tagTypes: ["semester", "course", "user", "courses"],
  endpoints: () => ({}),
});
