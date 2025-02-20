import { FetchArgs, fetchBaseQuery, FetchBaseQueryError, BaseQueryFn } from "@reduxjs/toolkit/query";
import { startLoading, stopLoading } from "../layout/uiSlice";

const customBaseQuery = fetchBaseQuery({
  baseUrl: 'https://localhost:5001/api'
});

const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));

export const baseQueryWithErrorHandling: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  api.dispatch(startLoading())
  await sleep();
  const result = await customBaseQuery(args, api, extraOptions);
  api.dispatch(stopLoading());
  if (result.error) {
    const { status, data } = result.error;
    console.log({ status, data });
  }

  return result;
};