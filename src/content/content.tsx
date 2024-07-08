import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

const target = document.getElementById("listingBodyLeftCon");

if (target) {
  const root = document.createElement("div");
  root.id = "my-extension-root";

  target.insertBefore(root, document.getElementById("listingDetailsTabsCon")!);

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
