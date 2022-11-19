import { Schema, models, model } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      required: false,
    },
    lastname: {
      type: String,
      required: false,
    },
    middlename: {
      type: String,
    },
    nickname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    password: {
      type: String,
    },
    paymentStatus: {
      type: String,
    },
    bio: {
      type: String,
      required: false,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    zipcode: {
      type: String,
    },
    nationality: {
      type: String,
    },
    state_origin: {
      type: String,
    },
    relationship: {
      type: String,
    },
    occupation: {
      type: String,
    },
    validid: {
      type: String,
    },
    languages: {
      type: String,
    },
    dob: {
      type: Date,
    },
    gender: {
      type: String,
    },
    height: {
      type: Number,
    },
    disabilities: {
      type: String,
    },
    website: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
    twitter: {
      type: String,
    },
    tiktok: {
      type: String,
    },
    how_you_heard: {
      type: String,
    },
    iaccept: {
      type: String,
    },
    dateRegistered: {
      type: Date,
      required: true,
      default: Date.now,
    },
    dateAdmitted: {
      type: Date,
    },
    dateEvicted: {
      type: Date,
    },
    usertype: {
      type: Number,
      min: 1,
      max: 10,
    },
    status: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    rating: {
      type: Number,
    },
    companyId: {
      type: String,
    },
    verificationCode: {
      type: String,
      required: false,
    },
    resetString: {
      type: String,
    },
    resetCode: {
      type: String,
    },
  },
  { timestamps: true }
);

export default models.Users || model("Users", UserSchema, "Users");
