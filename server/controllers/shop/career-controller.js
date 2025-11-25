const fs = require("fs");
const path = require("path");
const Razorpay = require("razorpay");
const crypto = require('crypto');
const Career = require("../../models/Career.js");

// Initialize Razorpay with default config - will be updated in functions
let razorpayInstance = null;

// Helper function to get/create Razorpay instance
const getRazorpay = () => {
  const key_id = process.env.RAZORPAY_KEY_ID || process.env.RAZOR_PAY_KEY;
  const key_secret = "j4EhnyQaUqZPOIVLiW2xrSjh" || process.env.RAZOR_PAY_SECRET;
  

  if (!key_id || !key_secret) {
    throw new Error("Razorpay credentials missing. Please check your environment variables.");
  }

  if (!razorpayInstance) {
    razorpayInstance = new Razorpay({
      key_id: key_id,
      key_secret: key_secret
    });
  }
  return razorpayInstance;
};

// helper to map duration -> amount/tier/planName
const durationToPayment = (duration = "") => {
  const d = String(duration).toLowerCase();
  if (d.includes("3")) return { amount: 1000, tierId: 1, planName: "Internship - 3 months" };
  if (d.includes("6")) return { amount: 3000, tierId: 2, planName: "Internship - 6 months" };
  if (d.includes("9")) return { amount: 4000, tierId: 3, planName: "Internship - 9 months" };
  if (d.includes("12")) return { amount: 6000, tierId: 4, planName: "Internship - 12 months" };
  const num = parseInt((duration.match(/\d+/) || [0])[0], 10);
  return { amount: isNaN(num) ? 0 : num, tierId: 0, planName: `Internship - ${duration}` };
};

// Add Career Entry (PDF Upload). If Internship => create Payment + Razorpay order
const addCareer = async (req, res) => {
  try {
    const { name, phone, email, type, address, duration, userId } = req.body; // Get userId from frontend
    const date = new Date();

    if (!req.file) {
      return res.status(400).json({ success: false, message: "PDF file is required." });
    }

    // Create career document first
    const careerDoc = new Career({
      image: `/uploads/${req.file.filename}`,
      name,
      phone,
      email,
      type,
      address,
      date,
      duration: duration || "",
      userId,
      paymentStatus: type.toLowerCase() === "internship" ? "pending" : "not_required"
    });

    await careerDoc.save();

    // Handle internship payment creation
    if (type.toLowerCase() === "internship") {
      try {
        const { amount, tierId, planName } = durationToPayment(duration);
        const razorpay = getRazorpay();
        
        const order = await razorpay.orders.create({
          amount: amount * 100, // Convert to paise
          currency: "INR",
          receipt: careerDoc._id.toString(),
          notes: {
            careerId: careerDoc._id.toString(),
            userId,
            planName
          }
        });

        // Update career with payment details
        careerDoc.amount = amount;
        careerDoc.currency = "INR";
        careerDoc.razorpayOrderId = order.id;
        careerDoc.planName = planName;
        careerDoc.tierId = tierId;
        await careerDoc.save();

        return res.status(201).json({
          success: true,
          data: careerDoc,
          payment: {
            amount,
            currency: "INR",
            razorpayOrderId: order.id,
            razorpayKeyId: process.env.RAZORPAY_KEY_ID || process.env.RAZOR_PAY_KEY,
            order
          }
        });
      } catch (error) {
        console.error("Payment creation error:", error);
        return res.status(500).json({
          success: false,
          message: "Failed to create payment order",
          error: error.message
        });
      }
    }

    return res.status(201).json({ success: true, data: careerDoc });
  } catch (error) {
    console.error("Career creation error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Verify payment
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", "R68sqoOkZRy0LdTwHpygjh6H")
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      try {
        const razorpay = getRazorpay();
        const orderInfo = await razorpay.orders.fetch(razorpay_order_id);
        
        if (orderInfo.status === 'paid') {
          const career = await Career.findOne({ razorpayOrderId: razorpay_order_id });

          if (career) {
            career.paymentStatus = "completed";
            career.razorpayPaymentId = razorpay_payment_id;
            career.razorpaySignature = razorpay_signature;
            await career.save();

            res.json({ success: true, message: "Payment successful" });
          } else {
            res.json({ success: false, message: "Career record not found" });
          }
        } else {
          res.json({ success: false, message: "Payment not completed" });
        }
      } catch (razorpayError) {
        console.error("Razorpay verification error:", razorpayError);
        res.status(500).json({ success: false, message: "Payment verification failed" });
      }
    } else {
      res.json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get payment history (by career entries with payments)
const getPaymentHistory = async (req, res) => {
  try {
    const payments = await Career.find({
      type: "Internship",
      paymentStatus: { $exists: true }
    }).sort({ createdAt: -1 });

    res.json({ success: true, payments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get payment details
const getPaymentDetails = async (req, res) => {
  try {
    const { paymentId } = req.params;
    
    const career = await Career.findOne({ razorpayPaymentId: paymentId });

    if (!career) {
      return res.status(404).json({
        success: false,
        message: "Payment details not found"
      });
    }

    // Get additional details from Razorpay
    const razorpayPayment = await razorpayInstance.payments.fetch(paymentId);

    res.json({
      success: true,
      payment: {
        ...career.toJSON(),
        razorpayDetails: razorpayPayment
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Career Entries
const getAllCareer = async (req, res) => {
  try {
    const careers = await Career.find().sort({ date: -1 });
    return res.status(200).json({ success: true, data: careers });
  } catch (error) {
    console.error("Error fetching careers:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch career entries.", error: error.message });
  }
};

const downloadCareerPdf = async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, "../../public/uploads", filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: "File not found." });
    }

    return res.download(filePath);
  } catch (error) {
    console.error("Download error:", error);
    return res.status(500).json({ success: false, message: "Error downloading file.", error: error.message });
  }
};

module.exports = {
  addCareer,
  getAllCareer,
  downloadCareerPdf,
  verifyPayment
};
