import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";
const rootElement = document.getElementById("container");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
  console.log("Running this function");
} else {
  console.error("No root element found!");
}
