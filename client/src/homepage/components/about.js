import lkdn from "../assets/lkdn.svg"
import git from "../assets/git.svg"
import { Link } from "react-router-dom";
export const About = () => {
    return (
        <div className="text-white font-extrabold text-center ">
            <p className="text-8xl opacity-90 italic text-transparent bg-clip-text bg-gradient-to-t from-white pt-4">Welcome To MintHub</p>
            <div class="card bg-transparent border-transparent">
                <div class="card-body ">
                    <h5 class="card-title text-5xl font-black italic text-right position-relative right-[65%] opacity-90 ">What Do We Offer ?</h5>
                    <p class="card-text max-w-4xl text-justify position-relative left-[12%] text-lg opacity-70 py-2">
                        Welcome to our site! We offer a range of exciting features and services to enhance your cryptocurrency experience. Whether you're a seasoned trader or a curious beginner, we have something for everyone.
                    </p>
                    <div class="card-text max-w-4xl text-justify position-relative left-[12%] mt-2 opacity-70">
                        <p className="text-3xl font-black italic">
                            MintSwap
                        </p>
                        <p className="max-w-4xl text-lg py-2">
                            &nbsp; &nbsp; Our DEX provides a seamless platform for swapping cryptocurrencies. With our user-friendly interface and advanced technology, you can easily exchange one crypto for another in a secure and efficient manner.
                        </p>
                    </div>
                    <div class="card-text max-w-4xl text-justify position-relative left-[12%] mt-2 opacity-70">
                        <p className="text-3xl font-black italic">
                            Market
                        </p>
                        <p className="max-w-4xl text-lg py-2">
                            &nbsp; &nbsp; Stay up-to-date with the latest trends and fluctuations in the crypto market. Our platform provides real-time prices of various cryptocurrencies, along with analytical graphs and charts, empowering you to make informed investment decisions.
                        </p>
                    </div>
                    <div class="card-text max-w-4xl text-justify position-relative left-[12%] mt-2 opacity-70">
                        <p className="text-3xl font-black italic">
                            C2C International Transactions
                        </p>
                        <p className="max-w-4xl text-lg py-2">
                            &nbsp; &nbsp; We introduce a groundbreaking feature that allows you to perform international transactions using cryptocurrencies. Say goodbye to high fees associated with traditional card transactions. Our C2C (Crypto-To-Country) functionality enables swift and cost-effective cross-border transfers.
                        </p>
                    </div>
                    <div class="card-text max-w-4xl text-justify position-relative left-[12%] mt-2  opacity-70">
                        <p className="text-3xl font-black italic">
                            Fundout
                        </p>
                        <p className="max-w-4xl text-lg py-2">
                            &nbsp; &nbsp; Need to convert your crypto holdings into real money? Our Fundout feature enables you to exchange cryptocurrencies for INR (Indian Rupees) through UPI (Unified Payments Interface) payments. Experience the convenience of converting your digital assets into tangible funds seamlessly.
                        </p>
                    </div>
                </div>
            </div>
            <div class="card bg-transparent border-transparent">
                <div class="card-body ">
                    <h5 class="card-title text-5xl font-black italic text-right position-relative right-[10%] opacity-90">Our Future Plans ?</h5>
                    <p class="card-text max-w-4xl text-justify position-relative left-[38%] text-lg opacity-70 py-2">
                        We constantly strive to innovate and provide the best possible experience for our users. While we already offer a wide range of features including a DEX , Market with analytical graphs and Two transactional functions—C2C international transactions and Fundout for exchanging crypto with real money. Our future plans are even more exciting.
                    </p>
                    <div class="card-text max-w-4xl text-right position-relative left-[38%] mt-2 opacity-70">
                        <p className="text-3xl font-black italic">
                            Expansion of Cryptocurrency Offerings
                        </p>
                        <p className="max-w-4xl text-lg text-justify py-2">
                            We aim to continually expand the range of cryptocurrencies available on our platform. We understand the importance of choice and want to ensure that our users have access to a diverse selection of digital assets for trading and investment.
                        </p>
                    </div>
                    <div class="card-text max-w-4xl text-right position-relative left-[38%] mt-2 opacity-70">
                        <p className="text-3xl font-black italic ">
                            Integration with Decentralized Finance
                        </p>
                        <p className="max-w-4xl text-lg text-justify py-2">
                            DeFi has revolutionized the financial landscape, and we plan to integrate various DeFi protocols and features into our platform. This integration will provide our users with access to decentralized lending, borrowing, staking, and other exciting DeFi opportunities.
                        </p>
                    </div>
                    <div class="card-text max-w-4xl text-right position-relative left-[38%] mt-2 opacity-70">
                        <p className="text-3xl font-black italic">
                            Enhanced Security Measures
                        </p>
                        <p className="max-w-4xl text-lg text-justify py-2">
                            Security is our utmost priority, and we are dedicated to implementing the most robust security measures to safeguard your funds and personal information. We will continue to invest in cutting-edge security technologies and undergo regular security audits to ensure the highest level of protection for our users.
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <p className="text-5xl font-black text-center position-relative text-transparent bg-clip-text bg-gradient-to-t from-white">Meet Our Team</p>
                <div class="card-group pt-10">
                    <div class="card bg-transparent border-transparent ">
                        <img class="card-img-top" src="..." alt="Card image cap" />
                        <div class="card-body">
                            <h5 class="card-title py-2 text-xl ">Aryan Das</h5>
                            <div class="card-text flex items-center justify-center py-2">
                                <Link to="https://www.linkedin.com/in/aryan--das/">
                                    <img class="bg-white rounded-full h-8 px-0 mx-2 " src={lkdn} alt="linkedin" />
                                </Link>
                                <Link to="https://github.com/arya-domain">
                                    <img class="bg-white rounded-full h-8 px-0 mx-2 " src={git} alt="github" />
                                </Link>
                            </div>
                            <div className="py-2 flex items-center justify-center text-center">
                                VIT Bhopal University, India
                                <br />BTech CSE Core
                            </div>
                        </div>
                    </div>
                    <div class="card bg-transparent border-transparent ">
                        <img class="card-img-top" src="..." alt="Card image cap" />
                        <div class="card-body">
                            <h5 class="card-title py-2 text-xl ">Tanmoy Mondal</h5>
                            <div class="card-text flex items-center justify-center py-2">
                                <Link to="">
                                    <img class="bg-white rounded-full h-8 px-0 mx-2 " src={lkdn} alt="linkedin" />
                                </Link>
                                <Link to="">
                                    <img class="bg-white rounded-full h-8 px-0 mx-2 " src={git} alt="github" />
                                </Link>
                            </div>
                            <div className="py-2 flex items-center justify-center text-center">
                                , India
                                <br />BTech CSE Core
                            </div>
                        </div>
                    </div>
                    <div class="card bg-transparent border-transparent ">
                        <img class="card-img-top" src="..." alt="Card image cap" />
                        <div class="card-body">
                            <h5 class="card-title py-2 text-xl ">Rajul Mahto</h5>
                            <div class="card-text flex items-center justify-center py-2">
                                <Link to="">
                                    <img class="bg-white rounded-full h-8 px-0 mx-2 " src={lkdn} alt="linkedin" />
                                </Link>
                                <Link to="">
                                    <img class="bg-white rounded-full h-8 px-0 mx-2 " src={git} alt="github" />
                                </Link>
                            </div>
                            <div className="py-2 flex items-center justify-center text-center">
                                , India
                                <br />BTech CSE Core
                            </div>
                        </div>
                    </div>
                    <div class="card bg-transparent border-transparent ">
                        <img class="card-img-top" src="..." alt="Card image cap" />
                        <div class="card-body">
                            <h5 class="card-title py-2 text-xl ">Devashish Jindal</h5>
                            <div class="card-text flex items-center justify-center py-2">
                                <Link to="">
                                    <img class="bg-white rounded-full h-8 px-0 mx-2 " src={lkdn} alt="linkedin" />
                                </Link>
                                <Link to="">
                                    <img class="bg-white rounded-full h-8 px-0 mx-2 " src={git} alt="github" />
                                </Link>
                            </div>
                            <div className="py-2 flex items-center justify-center text-center">
                                , India
                                <br />BTech CSE Core
                            </div>
                        </div>
                    </div>
                    <div class="card bg-transparent border-transparent ">
                        <img class="card-img-top" src="..." alt="Card image cap" />
                        <div class="card-body">
                            <h5 class="card-title py-2 text-xl ">Sarthak Joshi</h5>
                            <div class="card-text flex items-center justify-center py-2">
                                <Link to="">
                                    <img class="bg-white rounded-full h-8 px-0 mx-2 " src={lkdn} alt="linkedin" />
                                </Link>
                                <Link to="">
                                    <img class="bg-white rounded-full h-8 px-0 mx-2 " src={git} alt="github" />
                                </Link>
                            </div>
                            <div className="py-2 flex items-center justify-center text-center">
                                , India
                                <br />BTech CSE Core
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}