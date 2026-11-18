import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import GlobalStyle from "./styles/GlobalStyle.js";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CarritoProvider } from "./context/CarritoContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <CarritoProvider>
            <GlobalStyle />
            <App />
          </CarritoProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
