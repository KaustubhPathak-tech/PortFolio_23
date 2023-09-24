//jshint esversion: 6
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

dotenv.config();
const bodyParser = require("body-parser");
// const request = require("request");

const app = express();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const accessToken = oAuth2Client.getAccessToken();
const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    type: "OAuth2",
    user: "kaustubhpathak9@gmail.com",
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    accessToken: accessToken,
  },
});

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.get("/", function (req, res) {
  res.send("<h4>Hurray! Server is Running on PORT 80 </h4>");
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
                background-color: #f4f4f4;
                font-family: Arial, sans-serif;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
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
                <a class="social-icon" href="https://www.facebook.com/kaustubh.pathak.5477/"><i class="fa-brands fa-facebook"></i></a>
                <a class="social-icon" href="https://twitter.com/Kaustub05796452"><i class="fa-brands fa-twitter"></i></a>
                <a class="social-icon" href="https://www.linkedin.com/in/kaustubh-pathak-293116198/"><i class="fa-brands fa-linkedin"></i></a>
                <a class="social-icon" href="https://www.instagram.com/__pathak__kaustubh_04_04/"><i class="fa-brands fa-instagram"></i></a>
            </div>
        </div>
    </body>
    <script src="https://kit.fontawesome.com/d5be5e0fb3.js" crossorigin="anonymous"></script>
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
    await transporter.sendMail(mailoption1);
    await transporter.sendMail(recieved);

    res.status(200).json("Message sent successfully !");
  } catch (error) {
    res.status(500).send("Enter valid Email");
  }
});

const PORT = 7000 || process.env.PORT;

app.listen(PORT, function (req, res) {
  console.log(`Server is Running on PORT : ${PORT}`);
});
