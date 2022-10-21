const { Schema, model } = require("mongoose");
const Joi = require("joi");
// const bcrypt = require("bcrypt");

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiRegisterSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
  token: Joi.string(),
});

const joiLoginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

const joiSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiRegisterSchema,
  joiLoginSchema,
  joiSubscriptionSchema,
};
