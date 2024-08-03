import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { LoadingProvider } from "./contexts/loading";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { CartProvider } from "./contexts/cart";
import { UserProvider } from "./contexts/user";
import { configureAxios } from "./config/axios";

// Create MUI theme
const theme = createTheme({
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

// Configure Axios
configureAxios();

// Render the application
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <UserProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </UserProvider>
        </ThemeProvider>
      </LoadingProvider>
    </BrowserRouter>
  </React.StrictMode>
);
