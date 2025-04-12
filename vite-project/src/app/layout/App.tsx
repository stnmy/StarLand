import { useState } from "react";
import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet, ScrollRestoration } from "react-router-dom";

const getInitialDarkMode = () => {
  const storedDarkMode = localStorage.getItem('darkMode');
  return storedDarkMode ? JSON.parse(storedDarkMode) : false;
};

function App() {
  const [darkMode] = useState(getInitialDarkMode());

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
        default: darkMode ? "#121212" : "#EDEFEF",
        paper: darkMode ? "#1e1e1e" : "#ffffff"
      }
    }
  });

  // const toggleDarkMode = () => {
  //   setDarkMode((prev: boolean) => {
  //     const newMode = !prev;
  //     localStorage.setItem('darkMode', JSON.stringify(newMode));
  //     return newMode;
  //   });
  // };

  return (
    <ThemeProvider theme={theme}>
      <ScrollRestoration/>
      <CssBaseline />
      <NavBar/>
      <Container maxWidth={false} sx={{ mt: 15 }}>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;