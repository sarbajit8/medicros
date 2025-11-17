const Userm = require("../../models/UserM");
const jwt = require("jsonwebtoken");
const twilio = require("twilio");


const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();


const registerUser = async (req, res) => {
    const { mobile } = req.body;
  if (!mobile) return res.status(400).json({ message: "Mobile number is required" });

  try {
    let user = await Userm.findOne({ mobile });
    const otp = generateOTP();

    if (!user) {
      user = new Userm({ mobile, otp });
    } else {
      user.otp = otp;
    }

    await user.save();

    console.log(`Generated OTP for ${mobile}: ${otp}`); // Debugging log

    // Send OTP using Twilio
    const message = await client.messages.create({
      body: `Your OTP code is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: mobile,
    });

    console.log("Twilio Response:", message.sid); // Debugging Twilio response
    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP", error: error.message });
  }
  };


  const verifyOtp = async (req, res) => {

    const { mobile, otp, name, email, businessName } = req.body;
    if (!mobile || !otp) return res.status(400).json({ message: "Mobile and OTP are required" });
  
    try {
      let user = await Userm.findOne({ mobile });
      if (!user || user.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });
  
      user.name = name;
      user.email = email;
      user.businessName = businessName;
      user.isVerified = true;
      user.otp = null;
      await user.save();
  
      // Generate JWT Token
      const token = jwt.sign({ id: user._id, mobile: user.mobile }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
  
      res.json({ success: true, message: "User registered successfully", token, user });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error verifying OTP", error: error.message });
    }

  };


  module.exports = { registerUser, verifyOtp};
