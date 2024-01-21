import * as Yup from "yup";

export let addStudentSchema = Yup.object({
  firstName: Yup.string()
    .required("First name is required.")
    .trim()
    .max(55, "First name must be at max 55 characters."),
  lastName: Yup.string()
    .required("Last name is required.")
    .trim()
    .max(55, "Last name must be at max 55 characters."),
  dob: Yup.date(),
  gender: Yup.string().oneOf(["male", "female", "other"]),
  email: Yup.string()
    .email("Email must be valid email.")
    .required("Email is required.")
    .lowercase(),
});
