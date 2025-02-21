import { BaseQueryApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError, BaseQueryFn } from "@reduxjs/toolkit/query";
import { startLoading, stopLoading } from "../layout/uiSlice";
import { toast } from "react-toastify";

const customBaseQuery = fetchBaseQuery({
  baseUrl: 'https://localhost:5001/api'
});

const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));

export const baseQueryWithErrorHandling: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  api.dispatch(startLoading());
  await sleep();
  const result = await customBaseQuery(args, api, extraOptions);
  api.dispatch(stopLoading());
  if (result.error) {

    const { status, data } = result.error;
    console.log(result.error)
    switch (status) {
      case 400:
        toast.error(data as string)
        break;

      case 401:
        toast.error(data.title)
        break;
      case 404:
        toast.error(data.title)
        break;
    
      default:
        break;
    }
  }

  return result;
};