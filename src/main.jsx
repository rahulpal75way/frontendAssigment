import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Toaster } from "react-hot-toast";

import "./index.css"; 
import { ThemeContextProvider } from "./context/ThemeContext";
import { store } from "./store/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeContextProvider>
    <Provider store={store}>
      <BrowserRouter>
        <Toaster />
        <App />
      </BrowserRouter>
    </Provider>
  </ThemeContextProvider>
);
