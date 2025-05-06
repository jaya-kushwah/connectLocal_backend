const mongoose = require("mongoose");
const { createHmac } = require("crypto");
const jwt = require("jsonwebtoken");
const S_key = "vaish";
const salt = "password"
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    isDelete: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
    interests: [{ type: String, required: true }],
    otp: {
      type: Number,
    },
    auth: {
      type: String,
      default: "user"
    },
    isVerified: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);


userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    const hashPassword = createHmac("sha256", salt)
      .update(this.password)
      .digest("hex");
    this.password = hashPassword;
  }
  next();
});

// ✅ Static method for login (password match + token)
userSchema.static("matchPassword", async function (email, plainPassword) {
  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const hashedInput = createHmac("sha256", salt)
    .update(plainPassword)
    .digest("hex");

  if (user.password !== hashedInput) {
    throw new Error("Incorrect password");
  }

  const token = jwt.sign({ userid: user._id }, S_key, { expiresIn: "1h" });
  return token;
});


const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
