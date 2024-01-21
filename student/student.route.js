import { Router } from "express";
import { Student } from "./student.model.js";
import { addStudentSchema } from "./student.validation.js";

const router = Router();

// add student route

router.post("/student/add", async (req, res) => {
  // extract new student from req.body
  const newStudent = req.body;

  let validatedStudentData;
  //   validate new student
  try {
    validatedStudentData = await addStudentSchema.validate(newStudent);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }

  // find user with provided email
  const student = await Student.findOne({ email: validatedStudentData.email });

  // if user, throw error
  if (student) {
    return res
      .status(409)
      .send({ message: "Student with this email already exists." });
  }

  // create user

  await Student.create(newStudent);

  // send response
  return res.status(201).send({ message: "Student is added successfully." });
});
export default router;
