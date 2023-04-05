import { Outlet } from "react-router-dom";
import { NAV } from "./components/nav.js"
import { Footer } from "./components/footer.js";
import { CryptoProvider } from "../Market/components/CryptoContext.js";

export const Home = () => {
  const user = localStorage.getItem("token");
  return (
    <CryptoProvider>
      <div className="Home bg-gray-950">
        <NAV />
        <Outlet/>
        <Footer/>
      </div>
    </CryptoProvider> 
  );
}