import { Link, useLocation } from "react-router-dom"
import { Order } from "../../app/models/order";
import { Box, Button, Container, Divider, Paper, Typography } from "@mui/material";
import { currencyFormat, formatAddressString, formatPaymentString } from "../../lib/util";

export default function CheckoutSuccess() {
  const {state} = useLocation();
  const order = state.data as Order;

  if(!order) return <Typography>Problem Creating the order..</Typography>

 

  return (
    <Container maxWidth='md'>
      <>
        <Typography variant="h4" gutterBottom fontWeight='bold'>
          Thanks for your fake order!
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
            Your Order <strong>#{order.id}</strong> will never be processed because this is a fake shop.
        </Typography>
        <Paper elevation={1} sx={{p:2, mb:2, display:'flex', flexDirection:'column',gap:1.5}}>
            <Box display='flex' justifyContent='space-between'>
              <Typography variant="body2" color='textSecondary'>
                Order Date
              </Typography>
              <Typography variant="body2" fontWeight='bold'>
                {order.orderDate}
              </Typography>
            </Box>
            <Divider/>
            <Box display='flex' justifyContent='space-between'>
              <Typography variant="body2" color='textSecondary'>
                Payment Method
              </Typography>
              <Typography variant="body2" fontWeight='bold'>
                {formatPaymentString(order.paymentSummary)}
              </Typography>
            </Box>
            <Divider/>
            <Box display='flex' justifyContent='space-between'>
              <Typography variant="body2" color='textSecondary'>
                Shipping Address
              </Typography>
              <Typography variant="body2" fontWeight='bold'>
                {formatAddressString(order.shippingAddress)}
              </Typography>
            </Box>
            <Divider/>
            <Box display='flex' justifyContent='space-between'>
              <Typography variant="body2" color='textSecondary'>
                Amount
              </Typography>
              <Typography variant="body2" fontWeight='bold'>
                {currencyFormat(order.subtotal)}
              </Typography>
            </Box>     
        </Paper>
        <Box display='flex' justifyContent='flex-start' gap={2}>
            <Button variant="contained" color="primary" component={Link} to={`/orders/${order.id}`}>
               View your order
            </Button>
            <Button component={Link} to= '/catalog'>
               Continue Shopping
            </Button>
        </Box>
      </>
    </Container>
  )
}