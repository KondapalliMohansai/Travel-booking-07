import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { BookingProvider } from "./context/BookingContext.jsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <BookingProvider>
        <App />
      </BookingProvider>
    </BrowserRouter>
  </React.StrictMode>
);
