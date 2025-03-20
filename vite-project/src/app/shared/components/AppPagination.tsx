import { Box, Pagination, Typography } from "@mui/material";
import { Pagination as PaginationType } from "../../models/pagination";

type Props ={
    metadata: PaginationType
    onPageChange: (page: number) => void
}


export default function AppPagination({metadata, onPageChange}: Props) {
    const {currentPage, totalPages,pageSize,totalCount} = metadata;

    const startItem = (currentPage-1)* pageSize + 1
    const endItem = Math.min(currentPage*pageSize , totalCount);
  return (
    <Box display='flex' flexDirection="column" justifyContent= 'center' alignItems='center' sx={{mt:2}}>
        <Typography>Displaying {startItem}-{endItem} of {totalCount} Products</Typography>
      <Pagination
        sx={{mt: 1}}
        color="secondary"
        size="large"
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => onPageChange(page)}
      />
    </Box>
  );
}
