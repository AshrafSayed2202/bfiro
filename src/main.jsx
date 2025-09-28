import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="87072387506-logr99bpdg4p3bnqfnpnd77fqoglqdvv.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </Provider>
);
