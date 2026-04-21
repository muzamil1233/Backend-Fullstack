// Model/User.model.js
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  avatar: { type: String, default: "" },
  phone: { type: String, default: "" },
  bio: { type: String, default: "" },
  dateOfBirth: { type: Date, default: null },
  address: {
    city: { type: String, default: "" },
    state: { type: String, default: "" },
  }
}, { timestamps: true })

const user = mongoose.model("user", userSchema);
export default user;