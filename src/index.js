import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import AuthContextProvider from "./context/AuthContext";
import PostContextProvider from "./context/PostContext";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

import theme from "./theme";
import { myTheme } from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  <React.StrictMode>
    <ChakraProvider theme={ myTheme }>
      <ColorModeScript initialColorMode={theme.config.initialColorMode}  />
        <AuthContextProvider>
          <PostContextProvider>
            <App />
          </PostContextProvider>
        </AuthContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
