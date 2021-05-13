const nodemailer = require("nodemailer");


let options = {}
const transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: "apikey",
      pass: "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"
    }
  });

module.exports = transporter