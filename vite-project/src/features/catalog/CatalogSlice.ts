import { createSlice } from "@reduxjs/toolkit";
import { ProductParams } from "../../app/models/ProductParams";


const initialState : ProductParams ={
    pageNumber: 1,
    pageSize: 5,
    type: [],
    brand: [],
    searchItem: '',
    orderBy: 'name'
}

export const catalogSlice = createSlice({
    name: 'catalogSlice',
    initialState,
    reducers: {
        setPageNumber(state, action) {
            state.pageNumber = action.payload
        },
        setPageSize(state, action) {
            state.pageSize = action.payload
        },
        setOrderBy(state, action){
            state.orderBy =action.payload
            state.pageNumber = 1;
        },
        setTypes(state, action){
            state.type =action.payload
            state.pageNumber = 1;
        },
        setBrands(state, action){
            state.brand =action.payload
            state.pageNumber = 1;
        },
        setSearchItem(state, action){
            state.searchItem =action.payload
            state.pageNumber = 1;
        },
        resetParams() {
            return initialState;
        }
    }
});

export const {setBrands, setOrderBy, setPageNumber, setPageSize, setSearchItem, setTypes, resetParams} 
    = catalogSlice.actions;