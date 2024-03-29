import express from "express";
import { connectDB } from "./db.connect.js";
import courseRoutes from "./course/course.route.js";
import studentRoutes from "./student/student.route.js";

const app = express();
// to make app understand json
app.use(express.json());

// database connect
await connectDB();

// register routes
app.use(courseRoutes);
app.use(studentRoutes);

// port
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
