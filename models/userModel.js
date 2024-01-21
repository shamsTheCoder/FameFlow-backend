const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Invalid email format"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
    profilePicture: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Hash the password before saving to the database
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    try {
      const hashedPassword = await bcrypt.hash(this.password, 12);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

module.exports = mongoose.model("User", userSchema);
