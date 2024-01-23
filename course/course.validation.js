import * as Yup from "yup";

export let addCourseSchema = Yup.object({
  name: Yup.string()
    .required("Name is required.")
    .max(55, "Name must be at max 55 characters."),
  price: Yup.number().min(0).required("Price is required."),
  duration: Yup.number().min(0).required("Duration is required."),
  tutorName: Yup.string().max(55, "Tutor name must be at max 55 characters."),
});
