const express = require("express");
require("express-async-errors");
const app = express();
app.use(express.json());

const middleware = require("./utils/middleware");

const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");

const blogsRouter = require("./controllers/Blogs");

app.use("/api/blogs", blogsRouter);
app.use(middleware.errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
