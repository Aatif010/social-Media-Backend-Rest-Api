import express, { Router } from "express";
import mongoose from "mongoose";
import router from "./routes/user.routes.js";
import blogRouter from "./routes/blog.routes.js";

const app = express();
app.use(express.json());

app.use("/api/user", router);
app.use("/api/blog", blogRouter);
mongoose
  .connect(
    `mongodb+srv://aatif:31Hwo6vIu6cb1BK9@cluster0.fevvxrb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => app.listen(4000))
  .then(() => console.log("connected to database and listening to port 5000"))
  .catch((err) => console.log(err));
