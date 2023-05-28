require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const c2c_orderRoutes = require("./routes/c2c_orders")
const fundoutRoutes = require("./routes/fundout")
const paymentRoutes = require("./routes/payment")
const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");


const port = process.env.PORT || 8080;

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/c2c_order", c2c_orderRoutes);
app.use("/api/fundout", fundoutRoutes);
app.use("/api/payment", paymentRoutes);

app.get("/tokenPrice", async (req, res) => {

    const { query } = req;
    const chain = EvmChain.ETHEREUM;
    const responseOne = await Moralis.EvmApi.token.getTokenPrice({
        address: query.addressOne,
        chain: chain
    })

    const responseTwo = await Moralis.EvmApi.token.getTokenPrice({
        address: query.addressTwo,
        chain: chain
    })

    const usdPrices = {
        tokenOne: responseOne.raw.usdPrice,
        tokenTwo: responseTwo.raw.usdPrice,
        ratio: responseOne.raw.usdPrice / responseTwo.raw.usdPrice
    }


    return res.status(200).json(usdPrices);
});
const runApp = async () => {
    try {
        await Moralis.start({ apiKey: process.env.MORALIS_KEY });
        console.log('Moralis started');
    } catch (error) {
        console.log('Failed to start Moralis:', error);
    }
};

runApp();

app.listen(port, () => {
    console.log(`Listening for API Calls ${port}`);
});
