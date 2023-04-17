import { Outlet } from "react-router-dom";
import { NAV } from "./components/nav.js"
import { Footer } from "./components/footer.js";
import { CryptoProvider } from "../Market/components/CryptoContext.js";
import { Login } from "../login_register/Login/index.jsx";
import { useLocation } from "react-router-dom";
import { Signup } from "../login_register/register/index.jsx";

const token = localStorage.getItem("authtoken");

export const Home = () => {
  const location = useLocation()
  return (
    <CryptoProvider>
      <div className="Home bg-gray-950">
        <NAV />
        <Outlet />
        <Footer />
      </div>
    </CryptoProvider>
  );
}