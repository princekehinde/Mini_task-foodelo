const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();

class EmailService {
  static async sendMail(data) {
    // nodemailer configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    console.log(process.env.EMAIL, process.env.EMAIL_PASSWORD);

    // email content
    const mailOptions = {
      from: process.env.EMAIL,
      to: data.email,
      subject: data.subject,
      text: data.text,
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      // TODO : node mail service is not supported anymore
      if (error) {
        console.log(error);
        return false;
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      return true;
    });
  }
}
module.exports = EmailService;
