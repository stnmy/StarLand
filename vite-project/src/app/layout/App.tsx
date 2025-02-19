import {useState } from "react"
import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";


function App() {

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


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <NavBar darkMode={darkMode} toggleDarkMode={() => setDarkMode(prev => !prev)} />    
      <Container maxWidth = {false} sx={{mt: 15}}>
        <Outlet/>
      </Container>
    </ThemeProvider>
  )
}

export default App
