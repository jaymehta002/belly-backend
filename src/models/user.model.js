import mongoose, { Schema } from "mongoose";
import {
  additionalLinkHost,
  accountType,
  category,
} from "../common/common_constants.js";
import bcrypt from "bcrypt";

const additionalLinkSchema = new Schema({
  host: {
    type: String,
    enum: Object.values(additionalLinkHost), // Use enum values directly
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    accountType: {
      type: Object.values(accountType),
      required: true,
    },
    categories: {
      type: [Object.values(category)],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowecase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    bio: {
      type: String,
    },
    avatar: {
      type: String, // cloudinary url
    },
    coverImage: {
      type: String, // cloudinary url
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    refreshToken: {
      type: String,
      select: false,
    },
    additionalLinks: {
      type: additionalLinkSchema,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);
const AdditionalLink = mongoose.model("AdditionalLink", additionalLinkSchema);

export { User, AdditionalLink };
