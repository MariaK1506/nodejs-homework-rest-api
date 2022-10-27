const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { User } = require("../../models");
const { sendEmail } = require("../../helpers");
const bcrypt = require("bcryptjs");
const { nanoid } = require("nanoid");

const register = async (req, res) => {
  const { email, password, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`Email ${email} in use`);
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: "Site registration confirmation",
    html: `<a href="http://localhost:3000/api/auth/verify/${verificationToken}" target="_blank">Follow the link to confirm your email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    status: "Created",
    code: 201,
    data: {
      user: {
        email,
        subscription,
        verificationToken,
      },
    },
  });
};
module.exports = register;
