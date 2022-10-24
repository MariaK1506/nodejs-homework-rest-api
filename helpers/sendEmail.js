const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

// const email = {
//   to: "el.margo1506@gmail.com",
//   from: "maria_kolesnik@ukr.net",
//   subject: "Test email from NodeJS",
//   html: "This email is test email from NodeJS",
// };

const sendEmail = async (data) => {
  const email = { ...data, from: "maria_kolesnik@ukr.net" };
  // eslint-disable-next-line no-useless-catch
  try {
    await sgMail.send(email);
    console.log("Email was sent successfully");
    return true;
  } catch (error) {
    throw error;
  }
};

// sgMail
//   .send(email)
//   .then(() => console.log("Email was sent successfully"))
//   .catch((error) => console.log(error.message));

module.exports = sendEmail;
