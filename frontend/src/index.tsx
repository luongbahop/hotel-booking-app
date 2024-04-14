import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StoreProvider } from "./providers/StoreProvider";

import "./assets/styles/styles.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StoreProvider>
    <App />
  </StoreProvider>
);

reportWebVitals();
