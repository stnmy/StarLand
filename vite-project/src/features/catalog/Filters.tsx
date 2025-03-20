import {Box,Button,Paper,Typography} from "@mui/material";
import Search from "./Search";
import CheckBoxButtonGroup from "../../app/shared/components/CheckBoxButtonGroup";
import { useAppDispatch, useAppSelector } from "../../app/store/Store";
import { resetParams, setBrands, setOrderBy, setTypes } from "./CatalogSlice";
import RadioButtonGroup from "../../app/shared/components/RadioButtonGroup";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price: High to Low" },
  { value: "price", label: "Price: Low to High" },
];

type Props = {
  filtersData:{
    brands: string[];
    types: string[];
  }
}

export default function Filters({filtersData}: Props) {
  const { orderBy, type, brand } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Paper>
        <Search />
      </Paper>

      <Paper sx={{ p: 2 }}>
        <RadioButtonGroup
          selectedValue={orderBy}
          options={sortOptions}
          onChange={(e) => dispatch(setOrderBy(e.target.value))}
        />
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography>Brands</Typography>
        <CheckBoxButtonGroup
          items={filtersData.brands}
          checked={brand}
          onChange={(items: string[]) => dispatch(setBrands(items))}
        />
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography>Types</Typography>
        <CheckBoxButtonGroup
          items={filtersData.types}
          checked={type}
          onChange={(items: string[]) => dispatch(setTypes(items))}
        />
      </Paper>
      <Button sx={{backgroundColor: "#a6282a", color:"white"}} onClick={() => dispatch(resetParams())}>Reset Filters</Button>
    </Box>
  );
}
