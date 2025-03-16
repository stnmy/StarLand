
import { useParams } from "react-router-dom";
import {Button,Divider,Grid2,Table,TableBody,TableCell,TableContainer,TableRow,TextField,Typography,} from "@mui/material";
import { useFetchProductDetailsQuery } from "./catalogApi";
import { useAddBasketItemMutation, useFetchBasketQuery, useRemoveBasketItemMutation } from "../basket/basketapi";
import { ChangeEvent, useEffect, useState } from "react";

export default function ProductDetails() {
  const { id } = useParams();
  const [removeBasketItem] = useRemoveBasketItemMutation();
  const [addBasketItem] = useAddBasketItemMutation();
  const {data: basket} = useFetchBasketQuery();
  const item = basket?.items.find(x => x.productId === +id!);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if(item) {
      setQuantity(item.quantity);
    }
  }, [item])



  const {data: product, isLoading} = useFetchProductDetailsQuery(id? parseInt(id):0)

  if (!product || isLoading) return <div>Loading...</div>;

  const handleUpdateBasket = () => {
    const updatedQuantity = item ? Math.abs(quantity - item.quantity) : quantity;
    if(!item || quantity > item.quantity) {
      addBasketItem({product, quantity: updatedQuantity})
    }else{
      removeBasketItem({productId: product.id, quantity: updatedQuantity})
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const value = +event.currentTarget.value;

      if(value >= 0){
        setQuantity(value)
      }
  }

  const ProductDetails = [
    {label: 'Name', value: product.name},
    {label: 'Description', value: product.description},
    {label: 'Type', value: product.type},
    {label: 'Brand', value: product.brand},
    {label: 'Quantity in Stock', value: product.stockQuantity},
  ]


  return (
    <Grid2 container spacing={6} maxWidth="lg" sx={{ mx: "auto" }}>
      <Grid2 size={6}>
        <img
          src={product?.pictureUrl}
          alt={product?.name}
          style={{ width: "100%" }}
        />
      </Grid2>
      <Grid2 size={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h3" color="secondary">
          ${product.price.toFixed(2)}
        </Typography>
        <TableContainer>
          <Table sx={{
            '& td': {fontSize: '1.1rem'},
          }}>
            <TableBody>
              {ProductDetails.map((detail,index) => (
              <TableRow key={index}>
                  <TableCell sx={{fontWeight: 'bold'}}>{detail.label}</TableCell>
                  <TableCell>{detail.value}</TableCell>

              </TableRow>
              ))}

            </TableBody>
          </Table>
        </TableContainer>
        <Grid2 container spacing={2} marginTop={3}>
          <Grid2 size={6}>
            <TextField variant="outlined" type="number" label="Quantity" fullWidth value={quantity} onChange={handleInputChange}/>
          </Grid2>
          <Grid2 size={6}>
              <Button 
              onClick={handleUpdateBasket}
              disabled = {quantity ===item?.quantity || !item && quantity === 0}
              sx={{height:'55px'}} 
              color="secondary" 
              size="large" 
              variant="contained" 
              fullWidth>{item? 'Update Quantity' : 'Add to Basket'}</Button>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
