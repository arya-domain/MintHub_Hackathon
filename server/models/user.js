const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
});

const orderSchema = new mongoose.Schema({
	  sending_amt: { type: Number, required: true },
	  charge: { type: Number, required: true },
	  total: { type: Number, required: true },
	  account_no: { type: String, required: true },
	  bankname: { type: String, required: true },
	  ifsc: { type: String, required: true },
	  address: { type: String, required: true },
	  email: Joi.string().email().required().label("Email"),

  });

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};
const Order = mongoose.model("order", orderSchema);


const ovalidate = (order) => {
  const schema = Joi.object({
		sending_amt: Joi.number().required().label("amt1234"),
		charge: Joi.number().required().label("charge"),
		total: Joi.number().required().label("total"),
		account_no: Joi.string().required().label("account_no"),
		bankname: Joi.string().required().label("bankname"),
		ifsc: Joi.string().required().label("ifsc"),
		address: Joi.string().required().label("address"),
		email: Joi.string().email().required().label("Email"),
	});
  return schema.validate(order);
};

module.exports = { User,Order, validate, ovalidate };
