import { Add, Close, Height, Remove } from "@mui/icons-material";
import { Item } from "../../app/models/basket";
import { borderRadius, Box, display, flexbox } from "@mui/system";
import { Button, Grid2, IconButton, Paper, Typography } from "@mui/material";
import { useAddBasketItemMutation, useRemoveBasketItemMutation } from "./basketapi";
import { currencyFormat } from "../../lib/util";

type Props = {
  item: Item;
};

export default function BasketItem({ item }: Props) {
  const [removeBasketItem] = useRemoveBasketItemMutation();
  const [addBasketItem] = useAddBasketItemMutation();
  return (
    <Paper
      sx={{
        Height: 140,
        borderRadius: 3,
        display: "flex",
        JustifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Box display="flex" alignItems="center">
        <Box
          component="img"
          src={item.pictureUrl}
          alt={item.name}
          sx={{
            width: 150,
            height: 150,
            objectFit: "cover",
            borderRadius: "4px",
            marginRight: 8,
            ml: 4,
          }}
        />
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="h6">{item.name}</Typography>
          <Box display="flex" alignItems="center" gap={3}>
            <Typography sx={{ fontSize: "1.1rem" }}>
              {currencyFormat(item.price)} X {item.quantity}
            </Typography>

            <Typography sx={{ fontSize: "1.1rem" }} color="secondary">
              {currencyFormat(item.price * item.quantity)}
            </Typography>
          </Box>

          <Grid2 container spacing={1} alignItems="center">
            <IconButton
              onClick={() => removeBasketItem({productId: item.productId, quantity:1})}
              color="error"
              size="small"
              sx={{ border: 1, borderRadius: 1, minWidth: 0 }}
            >
              <Remove />
            </IconButton>
            <Typography variant="h6">{item.quantity}</Typography>
            <IconButton
              onClick={() => addBasketItem({product: item, quantity: 1})}
              color="success"
              size="small"
              sx={{ border: 1, borderRadius: 1, minWidth: 0 }}
            >
              <Add />
            </IconButton>
          </Grid2>
        </Box>
      </Box>
      <Box ml="auto" marginBottom={12}>
        <IconButton
          onClick={() => removeBasketItem({productId: item.productId, quantity: item.quantity})}
          color="error"
          size="small"
          sx={{
            border: 1,
            borderRadius: 1,
            minWidth: 0,
            alignSelf: "start",
            mr: 1,
            ml: 1,
          }}
        >
          <Close />
        </IconButton>
      </Box>
    </Paper>
  );
}
