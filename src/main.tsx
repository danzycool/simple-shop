import React from "react";
import ReactDOM from "react-dom/client";
import EcommerceStore from "./pages/EcommerceStore";
import "./style.css";

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <EcommerceStore />
  </React.StrictMode>,
);
