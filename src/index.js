import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import GlobalStyles from "./styles/globalStyles";
import { CookiesProvider } from "react-cookie";
import { ThemeProvider } from "styled-components";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <RecoilRoot>
        <BrowserRouter>
          <GlobalStyles />
          {/* <ThemeProvider
            theme={{
              palette: {
                blue: "#228be6",
                gray: "#495057",
                pink: "#f06595",
              },
            }}
          ></ThemeProvider> */}
          <App />
        </BrowserRouter>
      </RecoilRoot>
    </CookiesProvider>
  </React.StrictMode>
);
