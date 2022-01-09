const blogsRouter = require("express").Router();
const { Blog } = require("../models");

const blogFinder = async (req, res, next) => {
  try {
    req.blog = await Blog.findByPk(req.params.id);
  } catch (error) {
    console.log("@@@@@@@6", error);
    next(error);
  }
  next();
};

blogsRouter.get("", async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (e) {
    res.json(e);
  }
});

blogsRouter.post("", async (req, res, next) => {
  console.log(req.body);
  try {
    /*
const note = Note.build(req.body)
await note.save()
*/

    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

blogsRouter.get("/:id", blogFinder, async (req, res) => {
  const blog = req.blog;
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

blogsRouter.put("/:id", blogFinder, async (req, res, next) => {
  try {
    const { like } = req.body;
    const blog = req.blog;

    if (!blog) {
      let noBlogError = new Error("blog does not exist");
      noBlogError.name = "TypeError";
      throw noBlogError;
    }
    //console.log(JSON.stringify(notes))
    //console.log(JSON.stringify(notes, null, 2))
    // blog.toJSON()
    blog.likes = blog.likes + 1;
    await blog.save();
    res.json(blog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
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
  } else res.status(404).end();
});

module.exports = blogsRouter;
