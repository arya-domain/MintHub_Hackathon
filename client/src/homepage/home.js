import { Outlet } from "react-router-dom";
import { NAV } from "./components/nav.js"
import { Footer } from "./components/footer.js";
import { CryptoProvider } from "../Market/components/CryptoContext.js";
import { useLocation } from "react-router-dom";

const token = localStorage.getItem("authtoken");

export const Home = () => {
  const location = useLocation()
  return (
    <CryptoProvider>
      <div className="Home bg-gray-950 min-h-[900px]">
        <NAV />
        {location.pathname === "/" ?
        <div className="text-white font-extrabold text-2xl text-center">
             Welcome To MintHub
        </div> 
        : null}
        <div className="Home bg-gray-950 min-h-screen">
        <Outlet /> 
        </div>
        <Footer />
      </div>
      
    </CryptoProvider>
  );
}