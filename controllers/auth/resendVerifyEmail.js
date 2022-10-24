const { NotFound } = require("http-errors");
const { User } = require("../../models/user");
const { RequestError } = require("../../middlewares");
const { sendEmail } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFound("User not found");
  }
  if (user.verify) {
    throw RequestError(400, "Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "Site registration confirmation",
    html: `<a href="http://localhost:3000/api/auth/verify/${user.verificationToken}" target="_blank">Follow the link to confirm your email</a>`,
  };

  await sendEmail(mail);
  res.json({
    status: "OK",
    code: 200,
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
