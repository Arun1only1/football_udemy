import { Schema, model } from "mongoose";

// set rule/schema
const studentSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 55,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 55,
  },
  dob: {
    type: Date,
    required: false,
    default: null,
  },
  gender: {
    type: String,
    required: false,
    default: null,
    enum: ["male", "female", "other"],
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
});

// create table/model
export const Student = model("Student", studentSchema);
