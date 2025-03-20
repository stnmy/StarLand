import { debounce, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/Store";
import { setSearchItem } from "./CatalogSlice";
import { useEffect, useState } from "react";

export default function Search() {
    const {searchItem} = useAppSelector(state => state.catalog)
    const dispatch = useAppDispatch();
    const [item, setItem] = useState(searchItem)

    useEffect(()=>{
        setItem(searchItem)
    }, [searchItem]);

    const debouncedSearch = debounce(event => {
        dispatch(setSearchItem(event.target.value))
    }, 1000)

  return (
    <TextField 
    label="Search Products" 
    variant="outlined" 
    fullWidth 
    type="search" 
    value={item}
    onChange={ e => {
        setItem(e.target.value);
        debouncedSearch(e);
    }}
    />
  )
}