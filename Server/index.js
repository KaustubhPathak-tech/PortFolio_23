//jshint esversion: 6
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const UserOTPVerification = require("./model/OTP.js");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
dotenv.config();
const bodyParser = require("body-parser");

const app = express();

const transporter = nodemailer.createTransport({
  service: "gmail",
  type: "OAuth2",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "kaustubhpathak9@gmail.com",
    pass: process.env.pass,
  },
});

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.get("/", function (req, res) {
  res.send("<h4>Hurray! Server is Running on PORT 80 </h4>");
});

app.post("/sendOTP", async (req, res) => {
  const { email } = req.body;
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    //mailoptions
    const mailoptions = {
      from: "<kaustubhpathak9@gmail.com>",
      to: email,
      subject: "Verify Your Account",
      text: "Hello from Kaustubh",
      html: `<p>Enter <b>${otp}</b> in the website to verify your email address.</p><p>This code <b>expires in 1 hour</b>.</p><br/><p><a href="https://medhos.vercel.app/" style="text-decoration:'none'">&copy; MedHos.com </a></p>`,
    };

    const Salt = 12;
    const hashedOTP = await bcrypt.hash(`${otp}`, Salt);
    transporter
      .sendMail(mailoptions)
      .then(() => {
        console.log("--- email sent successfully!");
      })
      .catch((error) => {
        console.error("-- error ocured while sending email", error);
      });
    const newOTPVerification = await UserOTPVerification.create({
      userEmail: email,
      otp: hashedOTP,
      createdAt: Date.now(),
      expireAt: Date.now() + 3600000,
    });
    await newOTPVerification.save();
    res.json({
      status: "PENDING",
      message: "Verification otp email sent",
      data: { email },
    });
  } catch (error) {
    res.status(500).send("Enter valid Email");
  }
});
app.post("/sendOTP@OtivaEducart", async (req, res) => {
  const { email } = req.body;
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    //mailoptions
    const mailoptions = {
      from: "<kaustubhpathak9@gmail.com>",
      to: email,
      subject: "Verify Your Account",
      text: "Hello from Kaustubh",
      html: `<p>Enter <b>${otp}</b> in the website to verify your email address.</p><p>This code <b>expires in 1 hour</b>.</p><br/><p><a href="https://stack-over-flow-clone-2023.vercel.app/" style="text-decoration:"none">&copy; Otiva Educart</a></p>`,
    };

    const Salt = 12;
    const hashedOTP = await bcrypt.hash(`${otp}`, Salt);
    transporter
      .sendMail(mailoptions)
      .then(() => {
        console.log("--- email sent successfully!");
      })
      .catch((error) => {
        console.error("-- error ocured while sending email", error);
      });
    const newOTPVerification = await UserOTPVerification.create({
      userEmail: email,
      otp: hashedOTP,
      createdAt: Date.now(),
      expireAt: Date.now() + 3600000,
    });
    await newOTPVerification.save();
    res.json({
      status: "PENDING",
      message: "Verification otp email sent",
      data: { email },
    });
  } catch (error) {
    res.status(500).send("Enter valid Email");
  }
});

app.post("/sendEnquiry", async function posting(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const address = req.body.address;
  const message = req.body.message;
  try {
    //mailoptions
    const htmlEmail = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Thanks for Reaching out to us</title>
        
        <style>
            body {
                border:1px solid grey;
                background-color: #eaf2c7;
                font-family: Arial, sans-serif;
            }
    
            .container {
                  height: 60vh;
                width: 90%;
                margin: 0 auto;
                padding: 20px;
                background-color: #78afc4;
                color: white;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
    
            .header {
                text-align: center;
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .content {
              text-align: center;
                font-size: 16px;
                line-height: 1.5;
                margin-bottom: 150px;
            }
    
            .social-icons {
                margin-top: 20px;
                text-align: center;
            }
    
            .social-icon {
                font-size: 24px;
                margin: 0 10px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">Thanks for Reaching out to us </div>
            <div class="content">
                <p>Your Message has been received. We acknowledge your Enquiry and will get back to you as soon as possible.</p>
                <p>If you have any questions , please feel free to contact Us.</p>
                <p>Thank you again ! .</p>
            </div>
            <div class="social-icons">
                <a class="social-icon" href=""><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/1024px-2021_Facebook_icon.svg.png" width="25px"/></a>&nbsp;&nbsp;&nbsp;
                <a class="social-icon" href=""><img src="https://cdn-icons-png.flaticon.com/512/124/124021.png" width="25px" /></a>&nbsp;&nbsp;&nbsp;
                <a class="social-icon" href=""><img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="25px" /></a>&nbsp;&nbsp;&nbsp;
                <a class="social-icon" href=""><img src="https://cdn-icons-png.flaticon.com/512/3621/3621435.png" width="25px"/></a>
            </div>
        </div>
        
    </body>
    </html>
    `;
    const mailoption1 = {
      from: "<febshinef@gmail.com>",
      to: email,
      subject: "Regarding Your Enquiry with Feb & Shine ",
      text: "Hello from Feb & Shine ",
      html: htmlEmail,
    };
    const recieved = {
      from: email,
      to: "<kaustubhpathak9@gmail.com>,<kaustubhpathak64@yahoo.com>,<febshinef@gmail.com>",
      subject: "New Enquiry Registered",
      text: `Hello from ${name} `,
      html: `<p>Namaste Team @ Feb & Shine, This is ${name} </p><br> <p>
      My Email id is : ${email} </p> <br> phone: <p> ${phone} </p> <br> address: <p> ${address} </p> <br> message: <p> ${message} </p>`,
    };

    transporter
      .sendMail(mailoption1)
      .then(() => {
        console.log("-- email sent successfully!");
      })
      .catch((error) => {
        console.error("-- error ocured while sending email", error);
      });
    transporter
      .sendMail(recieved)
      .then(() => {
        console.log("--- email sent successfully!");
      })
      .catch((error) => {
        console.error("-- error ocured while sending email", error);
      });
    res.redirect("https://febandshine.vercel.app/enquirySuccess");
    res.status(200).end();
  } catch (error) {
    res.status(500).send("Enter valid Email");
  }
});

app.post("/sendMessage", async function posting(req, res) {
  const fname = req.body.name;
  const sub = req.body.message;
  const e_mail = req.body.email;
  // const lname = req.body.message;
  try {
    //mailoptions
    const htmlEmail = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Thank You for Your Submission</title>
        
        <style>
            body {
                border:1px solid grey;
                background-color: #eaf2c7;
                font-family: Arial, sans-serif;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #eaf2c7;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
    
            .header {
                text-align: center;
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .content {
                font-size: 16px;
                line-height: 1.5;
            }
    
            .social-icons {
                margin-top: 20px;
                text-align: center;
            }
    
            .social-icon {
                font-size: 24px;
                margin: 0 10px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">Thank You for Contacting me </div>
            <div class="content">
                <p>Your Message has been received. I appreciate your interest and will get back to you as soon as possible.</p>
                <p>If you have any questions , please feel free to contact me.</p>
                <p>Thank you again ! .</p>
            </div>
            <div class="social-icons">
                <a class="social-icon" href="https://www.facebook.com/kaustubh.pathak.5477/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/1024px-2021_Facebook_icon.svg.png" width="25px"/></a>&nbsp;&nbsp;&nbsp;
                <a class="social-icon" href="https://twitter.com/Kaustub05796452"><img src="https://cdn-icons-png.flaticon.com/512/124/124021.png" width="25px" /></a>&nbsp;&nbsp;&nbsp;
                <a class="social-icon" href="https://www.linkedin.com/in/kaustubh-pathak-293116198/"><img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="25px" /></a>&nbsp;&nbsp;&nbsp;
                <a class="social-icon" href="https://www.instagram.com/__pathak__kaustubh_04_04/"><img src="https://cdn-icons-png.flaticon.com/512/3621/3621435.png" width="25px"/></a>
            </div>
        </div>
        
    </body>
    </html>
    `;
    const mailoption1 = {
      from: "<kaustubhpathak9@gmail.com>",
      to: e_mail,
      subject: "Thanks from Kaustubh Pathak ",
      text: "Hello from Kaustubh",
      html: htmlEmail,
    };
    const recieved = {
      from: e_mail,
      to: "<kaustubhpathak9@gmail.com>",
      subject: "New User Contacted",
      text: `Hello from ${fname} `,
      html: `<p>Namste Kaustubh, This is ${fname} </p> <br> message: <p> ${sub} </p> `,
    };
    transporter
      .sendMail(mailoption1)
      .then(() => {
        console.log("-- email sent successfully!");
      })
      .catch((error) => {
        console.error("-- error ocured while sending email", error);
      });
    transporter
      .sendMail(recieved)
      .then(() => {
        console.log("--- email sent successfully!");
      })
      .catch((error) => {
        console.error("-- error ocured while sending email", error);
      });

    res.status(200).json("Message sent successfully !");
  } catch (error) {
    res.status(500).send("Enter valid Email");
  }
});

app.post("/sendMessage@SharmaEle", async function posting(req, res) {
  console.log(req.body);
  const fname = req.body.name;
  const e_mail = req.body.email;
  const phone = req.body.phone;
  const sub = req.body.msg;

  try {
    //mailoptions
    const htmlEmail = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Thank You for Your Submission</title>
        
        <style>
            body {
                border:1px solid grey;
                background-color: #eaf2c7;
                font-family: Arial, sans-serif;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #eaf2c7;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
    
            .header {
                text-align: center;
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .content {
                font-size: 16px;
                line-height: 1.5;
            }
    
            .social-icons {
                margin-top: 20px;
                text-align: center;
            }
    
            .social-icon {
                font-size: 24px;
                margin: 0 10px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">Thank You for Contacting Us </div>
            <div class="content">
                <p>Your Message has been received. We appreciate your interest and will get back to you as soon as possible.</p>
                
            </div>
        </div>
        
    </body>
    </html>
    `;
    const mailoption1 = {
      from: "<kaustubhpathak9@gmail.com>",
      to: e_mail,
      subject: "Acknowledgement from Sharma Electricals",
      text: "Greetings from Sharma Electricals",
      html: htmlEmail,
    };
    const recieved = {
      from: e_mail,
      to: "<kaustubhpathak9@gmail.com>,<sharmapravesh7894@gmail.com>",
      subject: "New Customer Contacted",
      text: `Hello from ${fname} `,
      html: `<p>Hello, Sharma Electronics Bhiwadi, This is ${fname} </p> <br> message: <p> ${sub} </p><br> phone: <p> ${phone} </p> `,
    };
    if (!fname || !e_mail || !phone || !sub) {
      res.status(400).json("Please Enter all the fields");
    } else {
      transporter
        .sendMail(mailoption1)
        .then(() => {
          console.log("-- email sent successfully!");
        })
        .catch((error) => {
          console.error("-- error ocured while sending email", error);
        });
      transporter
        .sendMail(recieved)
        .then(() => {
          console.log("-- email sent successfully!");
        })
        .catch((error) => {
          console.error("-- error ocured while sending email", error);
        });

      res.status(200).json("Message sent successfully !");
    }
  } catch (error) {
    res.status(500).send("Enter valid Email");
  }
});
app.post("/sendEnquiry@JMD", async function posting(req, res) {
  console.log(req.body);
  const fname = req.body.name;
  const e_mail = req.body.email;
  const phone = req.body.phoneNumber;
  const sub = req.body.enquiry;

  try {
    //mailoptions
    const htmlEmail = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Thank You for Your Submission</title>
        
        <style>
            body {
                border:1px solid grey;
                background-color: #eaf2c7;
                font-family: Arial, sans-serif;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #eaf2c7;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
    
            .header {
                text-align: center;
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .content {
                font-size: 16px;
                line-height: 1.5;
            }
    
            .social-icons {
                margin-top: 20px;
                text-align: center;
            }
    
            .social-icon {
                font-size: 24px;
                margin: 0 10px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">Thank You for Contacting Us </div>
            <div class="content">
                <p>Your Message has been received. We appreciate your interest and will get back to you as soon as possible.</p>
                
            </div>
        </div>
        
    </body>
    </html>
    `;
    const mailoption1 = {
      from: "<kaustubhpathak9@gmail.com>",
      to: e_mail,
      subject: "Acknowledgement from JMD Real Estates Bhiwadi",
      text: "Greetings from JMD Real Estates Bhiwadi",
      html: htmlEmail,
    };
    const recieved = {
      from: e_mail,
      to: "<kaustubhpathak9@gmail.com>",
      subject: "New Customer Contacted",
      text: `Hello from ${fname} `,
      html: `<p>Hello, Sharma Electronics Bhiwadi, This is ${fname} </p> <br> message: <p> ${sub} </p><br> phone: <p> ${phone} </p> `,
    };
    if (!fname || !e_mail || !phone || !sub) {
      res.status(400).json("Please Enter all the fields");
    } else {
      transporter
        .sendMail(mailoption1)
        .then(() => {
          console.log("-- email sent successfully!");
        })
        .catch((error) => {
          console.error("-- error ocured while sending email", error);
        });
      transporter
        .sendMail(recieved)
        .then(() => {
          console.log("-- email sent successfully!");
        })
        .catch((error) => {
          console.error("-- error ocured while sending email", error);
        });

      res.status(200).json("Message sent successfully !");
    }
  } catch (error) {
    res.status(500).send("Enter valid Email");
  }
});

const PORT = 7005 || process.env.PORT;
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`SMTP server is running on port ${PORT}`);
    })
  )
  .catch((err) => {
    console.log(err.message);
    console.log("         Database URL       ");
  });
