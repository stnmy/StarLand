import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Product } from "../../models/product";

type Props = {
    product: Product;
}

export default function ProductCard({product}: Props) { 
  return (
    <Card elevation={3}
          sx={{
            width: 280,
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>

        <CardMedia 
        sx={{height:220, backgroundSize:'cover'}} 
        image={product.pictureUrl}
        title={product.name}
        />


        <CardContent>
            <Typography 
            gutterBottom
            sx={{textTransform: 'uppercase'}}
            variant="subtitle2">
                {product.name}
            </Typography>
            <Typography
                variant="h6"
                sx={{color:'secondary.main'}}
                >
                ${(product.price).toFixed(2)}
            </Typography> 
        </CardContent>


        <CardActions
        sx={{justifyContent:'space-between'}}
        >
            <Button variant="contained">Add to Cart</Button>
            <Button variant="contained">View Details</Button>
        </CardActions>

    </Card>
  )
}