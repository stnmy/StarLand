import { Box, Grid2, Typography} from "@mui/material";
import ProductList from "./ProductList";
import { useFetchFiltersQuery, useFetchProductsQuery } from "./catalogApi";
import Filters from "./Filters";
import { useAppDispatch, useAppSelector } from "../../app/store/Store";
import AppPagination from "../../app/shared/components/AppPagination";
import { setPageNumber } from "./CatalogSlice";

export default function Catalog() {
  const productParams = useAppSelector(state => state.catalog)
  const { data, isLoading } = useFetchProductsQuery(productParams);
  console.log(data);
  const { data: filtersData, isLoading: filtersLoading } = useFetchFiltersQuery();
  const dispatch = useAppDispatch();

  if (isLoading || !data || filtersLoading || !filtersData) return <div>Loading...</div>;

  return (
    <Grid2 container spacing={6}>
      <Grid2 size={2}>
        <Filters filtersData={filtersData} />
      </Grid2>
      <Grid2 size={10}>
        {data.items && data.items.length > 0 ? (
          <>
            <ProductList products={data.items} />
            <AppPagination 
            metadata={data.pagination}
            onPageChange={(page: number) => {
              dispatch(setPageNumber(page))
              window.scrollTo({top: 0, behavior:'smooth'})
            }}
            />
          </>
        ): (
          <Box display='flex' justifyContent= 'center' alignItems='center' >
            <Typography variant="h2">No products for this Category</Typography>
          </Box>

        )}


      </Grid2>
    </Grid2>
  );
}
