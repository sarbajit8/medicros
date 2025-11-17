const User = require("../../models/UserE");
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "arunsarbajitpaul@gmail.com",
    pass: "your-16-character-app-password",
  },
});


const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const registereUser = async (req, res) => {
  const { name, email } = req.body;
  const otp = generateOTP();

  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const user = new User({ name, email, otp, otpExpires: Date.now() + 300000 });
    await user.save();

    await transporter.sendMail({
      to: email,
      subject: 'Verify Your Email',
      text: `Your OTP is: ${otp}`,
    });

    res.status(200).json({ success: true, message: 'OTP sent to email' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

const verifyeOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email, otp, otpExpires: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ success: false, error: 'Invalid or expired OTP' });

    res.status(200).json({ success: true, message: 'Email verified, please login' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

const logineUser = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email, otp, otpExpires: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ success: false, error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ success: true, token, message: 'Login successful', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

module.exports = { registereUser, verifyeOTP, logineUser };
