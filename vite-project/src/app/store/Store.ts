import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "../../features/contact/counterReducer";
import { catalogApi } from "../../features/catalog/catalogApi";
import { uiSlice } from "../layout/uiSlice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { errorApi } from "../../features/about/errorApi";

export const store = configureStore({
    reducer: {
        [catalogApi.reducerPath]: catalogApi.reducer,
        [errorApi.reducerPath]: errorApi.reducer,
        counter: counterSlice.reducer,
        ui: uiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(catalogApi.middleware, errorApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;