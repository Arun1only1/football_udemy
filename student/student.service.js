import { Student } from "./student.model.js";

export const createStudent = async (req, res) => {
  const newStudent = req.body;

  // find student
  const user = await Student.findOne({ email: newStudent.email });

  // if student, throw error
  if (user) {
    return res.status(409).send({ message: "Email already exists." });
  }

  // create student
  await Student.create(newStudent);

  return res.status(200).send({ message: "Student added successfully." });
};
