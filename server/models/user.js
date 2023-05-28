const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneno: { type: String, required: true },
  address: { type: String, required: true },
  country: { type: String, required: true },
  pincode: { type: String, required: true },
});

const orderSchema = new mongoose.Schema({
  sending_amt: { type: Number, required: true },
  charge: { type: Number, required: true },
  total: { type: Number, required: true },
  account_no: { type: String, required: true },
  bankname: { type: String, required: true },
  ifsc: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
});

const fundSchema = new mongoose.Schema({
  available_INR: { type: Number, required: true },
  cryptoval: { type: Number, required: true },
  currency: { type: String, required: true },
  currentAccount: { type: String, required: true },
  symbol: { type: String, required: true },
  symval: { type: String, required: true },
  totalamt: { type: Number, required: true },
  upi_id: { type: String, required: true },
  email: { type: String, required: true },
  txnid: { type: String, required: true },
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
    phoneno: Joi.number().required().label("Phone No"),
    address: Joi.string().required().label("Address"),
    country: Joi.string().required().label("Country"),
    pincode: Joi.number().required().label("Pincode"),

  });
  return schema.validate(data);
};

const Order = mongoose.model("order", orderSchema);
//C2C Validation
const ovalidate = (order) => {
  const schema = Joi.object({
    sending_amt: Joi.number().required().label("amt"),
    charge: Joi.number().required().label("charge"),
    total: Joi.number().required().label("total"),
    account_no: Joi.string().required().label("account_no"),
    bankname: Joi.string().required().label("bankname"),
    ifsc: Joi.string().required().label("ifsc"),
    address: Joi.string().required().label("address"),
    email: Joi.string().email().required().label("email"),
  });
  return schema.validate(order);
};

const Fund = mongoose.model("fund", fundSchema);
//fund validation
const fvalidate = (fund) => {
  const schema = Joi.object({
    available_INR: Joi.number().required().label("available_INR"),
    cryptoval: Joi.number().required().label("cryptoval"),
    currency: Joi.string().required().label("currency"),
    currentAccount: Joi.string().required().label("currentAccount"),
    symbol: Joi.string().required().label("symbol"),
    symval: Joi.string().required().label("symval"),
    totalamt: Joi.number().required().label("totalamt"),
    upi_id: Joi.string().required().label("upi_id"),
    email: Joi.string().email().required().label("email"),
    txnid: Joi.string().required().label("txnid"),
  });
  return schema.validate(fund);

};

module.exports = { User, Order, Fund, validate, ovalidate, fvalidate };
