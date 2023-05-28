import "./App.css";
import Header from "./components/Header";
import Swap from "./components/Swap";
import { useConnect, useAccount } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

function App() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });

  return (

    <div className="App">
      <Header connect={connect} isConnected={isConnected} address={address} />
      <div className="mainWindow position-relative ">
        <Swap></Swap>
      </div>

    </div>
  )
}

export default App;
