require("dotenv").config();
const sendMailer = require("../config/mailerConfig");
class MailService {
  static async sendEmail(email, message) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Password",
      html: message,
    };

    await sendMailer.sendMail(mailOptions);
  }
}

module.exports = MailService;
