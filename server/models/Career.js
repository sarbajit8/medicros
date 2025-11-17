const mongoose = require("mongoose");

const CareerSchema = new mongoose.Schema(
  {
    // applicant info
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },

    // application type and metadata
    type: { type: String, enum: ["Internship", "Job"] },
    duration: { type: String, default: "" }, // e.g. "3 months - 1000rs"

    // CV (store filename / URL / path)
    image: { type: String },

    // application date
    date: { type: Date, default: Date.now },

    // Payment-related fields (for Internship / paid applications)
    planName: { type: String, default: "" },
    tierId: { type: Number, default: null },

    billingCycle: {
      type: String,
      enum: ["monthly", "yearly"],
      default: "monthly",
    },

    amount: { type: Number, default: 0 }, // store numeric amount (INR)
    currency: { type: String, default: "INR", maxlength: 3 },

    addOns: { type: mongoose.Schema.Types.Mixed, default: [] }, // array of add-on objects

    // Razorpay (or other gateway) identifiers
    razorpayOrderId: { type: String, default: null, index: true },
    razorpayPaymentId: { type: String, default: null, index: true },
    razorpaySignature: { type: String, default: null },

    // generic payment tracking
    paymentMethod: {
      type: String,
      enum: ["Stripe", "PayPal", "Crypto", "Razorpay", "Other"],
      default: "Razorpay",
    },
    paymentStatus: {
      type: String,
      enum: [
        "pending",
        "processing",
        "completed",
        "failed",
        "cancelled",
        "refunded",
        "not_required"
      ],
      default: "pending",
      index: true,
    },

    // subscription / validity (if applicable)
    subscriptionStartDate: { type: Date, default: null },
    subscriptionEndDate: { type: Date, default: null },
    autoRenew: { type: Boolean, default: false },
    trialUsed: { type: Boolean, default: false },

    // customer / invoice / metadata
    customerDetails: { type: mongoose.Schema.Types.Mixed, default: {} },
    invoiceNumber: { type: String, default: null, sparse: true },
    notes: { type: String, default: null },

    // refund info
    failureReason: { type: String, default: null },
    refundAmount: { type: Number, default: null },
    refundReason: { type: String, default: null },

    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  {
    timestamps: true, // createdAt, updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Optional indexes for faster lookups on common fields
CareerSchema.index({ email: 1 });
CareerSchema.index({ phone: 1 });

module.exports = mongoose.model("Career", CareerSchema);
