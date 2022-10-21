const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { User } = require("../../models");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { email, password, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`Email ${email} in use`);
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);
  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    status: "Created",
    code: 201,
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};
module.exports = register;
