const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const Company = require("../models/Company.model");
const CompanyUser = require("../models/CompanyUser.model");
const logger = require("../config/logger");

/**
 * SIGNUP (Atomic: Company + Admin User)
 */
exports.signup = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { companyName, email, password, name } = req.body;

    // Check duplicate email
    const existing = await CompanyUser.findOne({ email }).session(session);
    if (existing) {
      await session.abortTransaction();
      return res.status(409).json({
        success: false,
        message: "Email already exists",
        requestId: req.id,
      });
    }

    // Create company
    const [company] = await Company.create(
      [{ companyName }],
      { session }
    );

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const [user] = await CompanyUser.create(
      [
        {
          companyId: company._id,
          name: name || "Admin",
          email,
          password: hashedPassword,
        },
      ],
      { session }
    );

    await session.commitTransaction();

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      token: jwt.sign(
        { userId: user._id, companyId: user.companyId, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      ),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        companyId: company._id
      }
    });
  } catch (err) {
    await session.abortTransaction();

    logger.error("Signup transaction failed", {
      requestId: req.id,
      error: err.message,
      stack: err.stack,
      email: req.body?.email,
    });

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred. Please try again later.",
      requestId: req.id,
    });
  } finally {
    session.endSession();
  }
};

/**
 * LOGIN
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await CompanyUser.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { userId: user._id, companyId: user.companyId, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      success: true,
      token,
    });
  } catch (err) {
    logger.error("Login failed", {
      requestId: req.id,
      error: err.message,
      stack: err.stack,
      email: req.body?.email,
    });

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred. Please try again later.",
      requestId: req.id,
    });
  }
};

/**
 * GET CURRENT USER
 */
exports.getMe = async (req, res) => {
  try {
    const user = await CompanyUser.findById(req.user.userId)
      .select('-password')
      .populate('companyId', 'companyName');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyId: user.companyId._id,
        companyName: user.companyId.companyName
      }
    });
  } catch (err) {
    logger.error("Get user failed", {
      requestId: req.id,
      error: err.message,
      userId: req.user?.userId
    });

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred",
      requestId: req.id
    });
  }
};

/**
 * CHANGE PASSWORD
 */
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.userId;

    // Get user with password
    const user = await CompanyUser.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect"
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    user.password = hashedPassword;
    await user.save();

    logger.info("Password changed successfully", {
      requestId: req.id,
      userId: user._id
    });

    return res.json({
      success: true,
      message: "Password changed successfully"
    });
  } catch (err) {
    logger.error("Change password failed", {
      requestId: req.id,
      error: err.message,
      userId: req.user?.userId
    });

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred",
      requestId: req.id
    });
  }
};

/**
 * UPDATE PROFILE
 */
exports.updateProfile = async (req, res) => {
  try {
    const { name, companyName } = req.body;
    const userId = req.user.userId;

    const user = await CompanyUser.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Update user name if provided
    if (name) {
      user.name = name;
      await user.save();
    }

    // Update company name if provided
    if (companyName) {
      await Company.findByIdAndUpdate(user.companyId, { companyName });
    }

    // Get updated user data
    const updatedUser = await CompanyUser.findById(userId)
      .select('-password')
      .populate('companyId', 'companyName');

    logger.info("Profile updated successfully", {
      requestId: req.id,
      userId: user._id
    });

    return res.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        companyId: updatedUser.companyId._id,
        companyName: updatedUser.companyId.companyName
      }
    });
  } catch (err) {
    logger.error("Update profile failed", {
      requestId: req.id,
      error: err.message,
      userId: req.user?.userId
    });

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred",
      requestId: req.id
    });
  }
};


