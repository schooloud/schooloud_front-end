import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import GlobalStyles from "./styles/globalStyles";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "react-query";

// React Query는 내부적으로 queryClient를 사용하여
// 각종 상태를 저장하고, 부가 기능을 제공합니다.
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <BrowserRouter>
          <GlobalStyles />
          <App />
        </BrowserRouter>
      </CookiesProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
