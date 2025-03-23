import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Toolbar, Typography, ListItem, List, Box, IconButton, Badge, LinearProgress } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/Store";
import { useFetchBasketQuery } from "../../features/basket/basketApi";
import UserMenu from "./UserMenu";
import { useUserInfoQuery } from "../../features/account/accountApi";

const midLinks = [
  { Title: "Products", path: "/catalog" },
  { Title: "About", path: "/about" },
  { Title: "Contact", path: "/contact" },
];

const rightLinks = [
  {Title: 'Login', path: '/login'},
  {Title: 'Register', path: '/register'}
]

const navStyles = { 
  color: "inherit",
  typography: "h6",
  textDecoration: 'none',
  '&:hover':{
    color: 'grey.500',
  },
  '&.active':{
    color: 'secondary.main',
  }
  
}

type Props = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export default function NavBar() {
  const {data: user} = useUserInfoQuery();
  const {isLoading} = useAppSelector(state => state.ui);
  const {data: basket} = useFetchBasketQuery();
  const itemCount = basket?.items.reduce((sum, item) => sum+ item.quantity, 0) || 0;
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h4" component={NavLink} to={'/'} sx={navStyles} >StarLand</Typography>
         
        </Box>
        
        <Box sx={{ display: "flex", ml: 5 }}>
          <List sx={{ display: "flex" }}>
            {midLinks.map(({ Title, path }) => (
              <ListItem
                component={NavLink}
                to={path}
                key={path}
                sx={navStyles}
              >
                {Title.toUpperCase()}
              </ListItem>
            ))}
          </List>

          <IconButton component={Link} to='/basket' size="large" sx={{color: 'inherit'}}>
              <Badge badgeContent={itemCount} color="secondary">
                  <ShoppingCart/>
              </Badge>
          </IconButton>

          {user? (
            <UserMenu user={user}/>
          ) : (
            <List sx={{ display: "flex" }}>
            {rightLinks.map(({ Title, path }) => (
              <ListItem
                component={NavLink}
                to={path}
                key={path}
                sx={navStyles}
              >
                {Title.toUpperCase()}
              </ListItem>
            ))}
          </List>
          )}

          
        </Box>
      </Toolbar>

      {isLoading && (
        <Box sx={{width:'100%'}}> 
          <LinearProgress color="secondary"/>
        </Box>
      )}
    </AppBar>
  );
}
