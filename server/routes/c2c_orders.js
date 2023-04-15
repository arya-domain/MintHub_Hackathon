const router = require("express").Router();
const {Order, ovalidate} = require("../models/user")

router.post("/", async (req, res) => {
	
	try {
		const { error } = ovalidate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		// const order = await Order.findOne({ orderID: req.body.orderID });
		// if (order)
		// 	return res
		// 		.status(409)
		// 		.send({ message: "Order already Exist!" });

		await new Order({ ...req.body}).save();
		res.status(201).send({ message: "Order created successfully" });
	} catch (error) {
        console.log({error})
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
