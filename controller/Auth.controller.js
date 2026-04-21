import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Model/user.model.js"; // ✅ FIXED (capital U)

/* ================= SIGNUP ================= */
export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashPass,
    });

    await newUser.save();

    res.status(200).json({ msg: "User registered successfully" });

  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    res.status(500).json({ msg: error.message });
  }
};


/* ================= LOGIN ================= */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ msg: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: existingUser._id, role: existingUser.role || "user" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      msg: "Login successful",
      token,
      userId: existingUser._id,
      role: existingUser.role || "user",
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role || "user",
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ msg: error.message });
  }
};


/* ================= GET PROFILE ================= */
export const getProfile = async (req, res) => {
  try {
    console.log("REQ.USER:", req.user);

    if (!req.user?.userId) {
      return res.status(401).json({ msg: "Invalid token" });
    }

    const userData = await User.findById(req.user.userId).select("-password");

    if (!userData) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(userData);

  } catch (error) {
    console.error("GET PROFILE ERROR:", error);
    res.status(500).json({ msg: error.message });
  }
};


/* ================= UPDATE PROFILE ================= */
export const updateProfile = async (req, res) => {
  try {
    console.log("REQ.USER:", req.user);
    console.log("BODY:", req.body);

    if (!req.user?.userId) {
      return res.status(401).json({ msg: "Invalid token" });
    }

    const { name, phone, bio, dateOfBirth, address, avatar } = req.body;

    const updateData = {};

    // ✅ Only update fields that are sent
    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (bio !== undefined) updateData.bio = bio;
    if (dateOfBirth !== undefined) updateData.dateOfBirth = dateOfBirth;
    if (avatar !== undefined) updateData.avatar = avatar;

    // ✅ Safe address update
    if (address !== undefined) {
      updateData.address = {
        city: address?.city || "",
        state: address?.state || "",
      };
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(updatedUser);

  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);
    res.status(500).json({ msg: error.message });
  }
};
