import { Outlet } from "react-router-dom";
import { NAV } from "./components/nav.js"
import { Footer } from "./components/footer.js";
import { CryptoProvider } from "../Market/components/CryptoContext.js";
import { useLocation } from "react-router-dom";
import { About } from "./components/about.js";

const token = localStorage.getItem("authtoken");

export const Home = () => {
  const location = useLocation()
  return (
    <CryptoProvider>
      <div className="Home bg-gray-950 min-h-[900px]">
        <NAV />
        {location.pathname === "/" ?
          <div className="bg-gradient-to-b from-black via-gray-800 to-black h-screen">
            <About />
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