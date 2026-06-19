const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "other"] },
    age: { type: Number, min: 0 },
    role: { type: String, enum: ["user", "admin"], default: "user" }

  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("user", userSchema);
