import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { store } from "./Store/store";
import { Provider } from "react-redux";
import { Buffer } from "buffer";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
window.Buffer = Buffer;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <TonConnectUIProvider
        manifestUrl="https://telegram-wallet-payment.vercel.app/tonconnect-manifest.json"
        walletsRequiredFeatures={{
          sendTransaction: {
            minMessages: 2, // Wallet must support at least 2 messages
            extraCurrencyRequired: true // Wallet must support extra currency
          }
        }}
      >
        <App />
      </TonConnectUIProvider>
    </BrowserRouter>
  </Provider>
);
