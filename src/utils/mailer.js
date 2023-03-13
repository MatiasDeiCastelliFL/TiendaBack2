// create reusable transporter object using the default SMTP transport
const nodemailer = require("nodemailer");
require("dotenv").config();
// async..await is not allowed in global scope, must use a wrapper
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.emailUser, // generated ethereal user
    pass: process.env.emailpass, // generated ethereal password
  },
});

transporter.verify().then(()=>{
  console.log("Listo para enviar email")
}).catch(error=> console.log(error))

module.exports= transporter