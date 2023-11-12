const mongoose = require("mongoose");
const UserOTPVerificationSchema = mongoose.Schema({
  userEmail: { type: String },
  otp: { type: String },
  createdAt: { type: Date },
  expireAt: { type: Date },
});

module.exports = mongoose.model(
  "UserOTPVerification",
  UserOTPVerificationSchema
);
