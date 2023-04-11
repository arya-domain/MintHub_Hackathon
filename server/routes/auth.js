const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const fetchuser = require("../middleware/fetchuser");

router.post("/login", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const token = user.generateAuthToken();
		res.status(200).send({ authtoken: token, fname: user.firstName, lname: user.lastName, email: user.email , message: "logged in successfully" });
		} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.post("/getuser", fetchuser,  async (req, res) => {

	try {
	  const userId = req.user;
	  const user = await User.findById(userId).select("-password")
	  res.send( {uData : user})
	} catch (error) {
	  console.error(error.message);
	  res.status(500).send("Internal Server Error");
	}
  })

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};



module.exports = router;
