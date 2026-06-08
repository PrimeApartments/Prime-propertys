const nodemailer = require("nodemailer");

const sendEmail = async (
  subject,
  message
) => {

  try {

    const transporter =
    nodemailer.createTransport({

      service: "gmail",

      auth: {

        user:
        process.env.EMAIL_USER,

        pass:
        process.env.EMAIL_PASS

      }

    });

    await transporter.sendMail({

      from:
      process.env.EMAIL_USER,

      to:
      process.env.EMAIL_USER,

      subject,

      text: message

    });

    console.log(
      "Email sent successfully"
    );

  } catch(error) {

    console.log(error);

  }

};

module.exports = sendEmail;