import React from "react";
import "./swap.css";
import App from "./App";
import { configureChains, mainnet, WagmiConfig, createClient, goerli } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const { provider, webSocketProvider } = configureChains(
  [goerli],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});


export const Dex = () => {
  return (
    <div className="bg-gradient-to-b from-black via-purple-600 to-black h-screen">
      <WagmiConfig client={client} >
        <App />
      </WagmiConfig>
    </div>
  );
}