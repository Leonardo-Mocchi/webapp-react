import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { LoaderProvider } from "./contexts/LoaderContext";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoaderProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LoaderProvider>
  </StrictMode>
);
