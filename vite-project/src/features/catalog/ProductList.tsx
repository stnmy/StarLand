import { Box } from "@mui/material"
import { Product } from "../../models/product"
import ProductCard from "./ProductCard"

type Props = {
    products: Product[]
}

export default function ProductList({products}: Props) {
  return (
    <Box sx={{display:'flex', flexWrap:'wrap', gap:4, justifyContent:'center'}}>
    {products.map((product) => (
      <ProductCard key={product.id} product ={product}/>
    ))}
    </Box>
  )
}
