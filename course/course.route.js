import express from "express";
import { Course } from "./course.model.js";
import { checkMongoIdValidity } from "../utils/check.mongo.id.validity.js";
import { validateReqBody } from "../middleware/validation.middleware.js";
import { addCourseSchema } from "./course.validation.js";
import { validateMongoIdMiddleware } from "../middleware/monog.id.validation.js";

const router = express.Router();

// add course
// router.post("/course/add", async (req, res) => {
//   const newCourse = req.body;

//   const requiredCourse = await Course.findOne({ name: newCourse.name });

//   if (requiredCourse) {
//     return res
//       .status(409)
//       .send({ message: "Course with this name already exists." });
//   }

//   await Course.create(newCourse);

//   return res.status(201).send({ message: "Course is added successfully." });
// });

// get course details
router.get("/course/details/:id", async (req, res) => {
  // extract id from req.params
  const courseId = req.params.id;

  // check for mongo id validity
  const isValidMongoId = checkMongoIdValidity(courseId);

  // if not valid mongo id, throw error
  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid mongo id." });
  }

  // find course
  const course = await Course.findOne({ _id: courseId });

  // if not course, throw error
  if (!course) {
    return res.status(404).send({ message: "Course does not exist." });
  }

  // return course as response
  return res.status(200).send(course);
});

// delete course
router.delete("/course/delete/:id", async (req, res) => {
  // extract id from req.params
  const courseId = req.params.id;

  // check for mongo id validity
  const isValidMongoId = checkMongoIdValidity(courseId);

  // if not valid mongo id, throw error
  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid mongo id." });
  }

  // find course
  const course = await Course.findOne({ _id: courseId });

  // if not course, throw error
  if (!course) {
    return res.status(404).send({ message: "Course does not exist." });
  }

  // delete course
  await Course.deleteOne({ _id: courseId });

  return res.status(200).send({ message: "Course is deleted successfully." });
});

// // edit course
// router.put("/course/edit/:id", async (req, res) => {
//   // extract id from req.params
//   const courseId = req.params.id;

//   // check for mongo id validity

//   const isValidMongoId = checkMongoIdValidity(courseId);

//   // if not valid mongo id, throw error
//   if (!isValidMongoId) {
//     return res.status(400).send({ message: "Invalid mongo id." });
//   }

//   // find course
//   const requiredCourse = await Course.findOne({ _id: courseId });

//   // if not course, throw error
//   if (!requiredCourse) {
//     return res.status(404).send({ message: "Course does not exist." });
//   }

//   // extract new values from req.body
//   const newValues = req.body;

//   // edit course
//   await Course.updateOne(
//     { _id: courseId },
//     {
//       $set: {
//         name: newValues.name,
//         price: newValues.price,
//         duration: newValues.duration,
//         tutorName: newValues.tutorName,
//       },
//     }
//   );

//   // send response
//   return res.status(200).send({ message: "Course is edited successfully." });
// });

// get course list
router.post("/course/list", async (req, res) => {
  const page = req.body.page;
  const limit = req.body.limit;

  // calculate skip
  const skip = (page - 1) * limit;

  const courseList = await Course.aggregate([
    { $match: {} },
    { $skip: skip },
    { $limit: limit },
  ]);

  return res.status(200).send({ message: "success", courses: courseList });
});

// add course v2
router.post(
  "/course/add",
  validateReqBody(addCourseSchema),
  async (req, res) => {
    const courseData = req.body;

    // find course with name
    const course = await Course.findOne({ name: courseData.name });

    // if course, throw error
    if (course) {
      return res.status(409).send({ message: "Course already exists." });
    }

    // create course
    await Course.create(courseData);

    // send res

    return res.status(201).send({ message: "Course added successfully." });
  }
);

// edit course v2
router.put(
  "/course/edit/:id",
  validateReqBody(addCourseSchema),
  validateMongoIdMiddleware(),
  async (req, res) => {
    const newCourse = req.body;

    // extract params from req.params
    const courseId = req.params.id;

    // find course

    const course = await Course.findOne({ _id: courseId });

    // if not course, throw error
    if (!course) {
      return res.status(404).send({ message: "Course does not exist." });
    }

    // edit course
    await Course.updateOne(
      { _id: courseId },
      {
        $set: {
          ...newCourse,
        },
      }
    );
    // send response

    return res.status(200).send({ message: "Course is updated successfully." });
  }
);

export default router;
