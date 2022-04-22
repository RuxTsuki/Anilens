import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Popup from "./components/popup/Popup";
import "./index.css";

if (document.getElementById("root"))
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
else
  ReactDOM.createRoot(document.getElementById("root_hinkku")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
