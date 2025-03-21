import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "../../features/contact/counterReducer";
import { catalogApi } from "../../features/catalog/catalogApi";
import { uiSlice } from "../layout/uiSlice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { errorApi } from "../../features/about/errorApi";
import { basketApi } from "../../features/basket/basketApi";
import { catalogSlice } from "../../features/catalog/CatalogSlice";
import { accountApi } from "../../features/account/accountApi";



export const store = configureStore({
    reducer: {
        [catalogApi.reducerPath]: catalogApi.reducer,
        [errorApi.reducerPath]: errorApi.reducer,
        [basketApi.reducerPath]: basketApi.reducer,
        [accountApi.reducerPath]: accountApi.reducer,
        counter: counterSlice.reducer,
        ui: uiSlice.reducer,
        catalog: catalogSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            catalogApi.middleware, 
            errorApi.middleware,
            basketApi.middleware,
            accountApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;