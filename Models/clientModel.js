import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Define User Schema
const UserSchema = new Schema({
  userName: { type: String, required: true, unique: true }, // Fixed duplicate and capitalization
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password is too short"],
  },
  confirmPassword: {
    type: String,
    required: true,
    minlength: [6, "Confirm password is too short"],
  },
});

// Create User Model
const User = model("User", UserSchema);

export default User; // Use ES Modules export
