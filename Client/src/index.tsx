import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import "./index.css";
import { Accessibility } from "accessibility";
import { labels, modules } from "./utils/options";
import { Provider } from "react-redux";
import store from "./store/store";
window.addEventListener(
  "load",
  function () {
    new Accessibility({
      textEmlMode:true,
      labels: labels,
      modules: modules,
      icon: {
        circular: true,
        img: "accessible",
      },
      session: { persistent: false },
    });
  },
  false
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.Suspense fallback="loading">
    <Provider store={store}>
      <App />
    </Provider>
  </React.Suspense>
);
