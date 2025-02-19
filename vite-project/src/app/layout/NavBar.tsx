import { Brightness4, Brightness7, ShoppingCart } from "@mui/icons-material";
import { AppBar, Toolbar, Typography, Switch, ListItem, List, Box, IconButton, Badge } from "@mui/material";
import { NavLink } from "react-router-dom";

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

export default function NavBar({ darkMode, toggleDarkMode }: Props) {
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h4" component={NavLink} to={'/'} sx={navStyles} >StarLand</Typography>
         
          <IconButton sx={{ ml: 1 }} onClick={toggleDarkMode} color="inherit">
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
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

          <IconButton size="large" sx={{color: 'inherit'}}>
              <Badge badgeContent={4} color="secondary">
                  <ShoppingCart/>
              </Badge>
          </IconButton>

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
        </Box>
 


      </Toolbar>
    </AppBar>
  );
}
