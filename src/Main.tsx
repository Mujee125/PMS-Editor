import "./index.css";

import * as React from "react";
import { createRoot } from "react-dom/client";

import AppWrapper from "./App";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
