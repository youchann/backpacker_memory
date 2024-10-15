import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import theme from "./theme";
import App from "./App.tsx";
import { CssBaseline, ThemeProvider } from "@mui/material";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
