import mongoose from "mongoose";

// set schema(rules)
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 155,
  },

  price: {
    type: Number,
    required: true,
    min: 0,
  },

  duration: {
    type: Number,
    required: true,
    min: 0,
  },

  tutorName: {
    type: String,
    required: false,
    maxlength: 55,
  },
});

// create table
export const Course = mongoose.model("Course", courseSchema);
