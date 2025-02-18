import { useEffect, useState } from "react"
import { Product } from "../../models/product";
import Catalog from "../../features/catalog/Catalog";
import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import NavBar from "./NavBar";


function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#111212" : "#1976d2" 
      },
      secondary: {
        main: darkMode ? "#ff4081" : "#111212" 
      },
      background: {
        default: darkMode ? "#121212" : "#F2F3F4",
        paper: darkMode ? "#1e1e1e" : "#ffffff" 
      }
    }
  });

  useEffect(() =>{
    fetch('https://localhost:5001/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
  },[])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar darkMode={darkMode} toggleDarkMode={() => setDarkMode(prev => !prev)} />    
      <Container maxWidth = {false} sx={{mt: 15}}>
      <Catalog products = {products}/>
      </Container>
    </ThemeProvider>
  )
}

export default App
