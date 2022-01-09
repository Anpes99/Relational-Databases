const { Blog } = require("./models/Blog");
const express = require("express");
const app = express();
const { Model, DataTypes, Sequelize, QueryTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (e) {
    res.json(e);
  }
});

app.post("/api/blogs", async (req, res) => {
  console.log(req.body);
  try {
    const blog = await Blog.create(req.body);
    return res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

app.get("/api/blogs/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

app.put("/api/blogs/:id", async (req, res) => {
  const { author, url, title, likes } = req.body;
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    //console.log(JSON.stringify(notes))
    //console.log(JSON.stringify(notes, null, 2))
    // blog.toJSON()
    if (author) blog.author = author;
    if (url) blog.url = url;
    if (title) blog.title = title;
    if (likes) blog.likes = likes;
    await blog.save();
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/blogs/:id", async (req, res) => {
  try {
    const result = await sequelize.query(
      `DELETE FROM blogs WHERE id=${req.params.id}`,
      {
        type: QueryTypes.DELETE,
      }
    );
    res.json(result);
  } catch (e) {
    console.log(e);
  }
});

/*
const note = Note.build(req.body)
await note.save()
*/

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
