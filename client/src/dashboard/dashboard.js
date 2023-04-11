import {News} from "./components/news.js"
import { Offer } from "./components/offer.js";
import { UserDetails } from "./components/userdetails.js";

export const Dash = () => {
    const token = localStorage.getItem("authtoken");
    
    return (
        <div className="my-0 bg-black " >
            {token ? <UserDetails/> :<Offer/>}
            <News/>
        </div>
    );
};

