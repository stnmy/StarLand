import { AppBar, Toolbar, Typography, Switch } from "@mui/material";

type Props = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export default function NavBar({ darkMode, toggleDarkMode }: Props) {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          StarLand
        </Typography>
        <Typography variant="body1" sx={{mr: 2}}>
            {darkMode ? "Dark Mode" : "Light Mode"}
        </Typography>
        <Switch checked={darkMode} onChange={toggleDarkMode} /> {/* Theme Toggle */}
      </Toolbar>
    </AppBar>
  );
}
