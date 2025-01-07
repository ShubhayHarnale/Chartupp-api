import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";

// Get current user profile
export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return next(createError(404, "User not found!"));
    
    const { password, ...info } = user._doc;
    res.status(200).send(info);
  } catch (err) {
    next(err);
  }
};

// Get any user by ID
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError(404, "User not found!"));

    const { password, ...info } = user._doc;
    res.status(200).send(info);
  } catch (err) {
    next(err);
  }
};

// Update user profile
export const updateUser = async (req, res, next) => {
  try {
    if (req.userId !== req.params.id) {
      return next(createError(403, "You can update only your account!"));
    }

    if (req.body.password) {
      // If updating password, hash it
      const hash = bcrypt.hashSync(req.body.password, 5);
      req.body.password = hash;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    );

    const { password, ...info } = updatedUser._doc;
    res.status(200).send(info);
  } catch (err) {
    next(err);
  }
};

// Delete user
export const deleteUser = async (req, res, next) => {
  try {
    if (req.userId !== req.params.id) {
      return next(createError(403, "You can delete only your account!"));
    }

    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("Account has been deleted successfully.");
  } catch (err) {
    next(err);
  }
};

// Get seller profile
export const getSellerProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError(404, "User not found!"));
    if (!user.isSeller) return next(createError(403, "This user is not a seller!"));

    const { password, ...info } = user._doc;
    res.status(200).send(info);
  } catch (err) {
    next(err);
  }
};