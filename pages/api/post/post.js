import dbConnect from "libs/dbConnect";
import Posts from "models/Post";
import Category from "models/Category";

export default async function handler(req, res) {
  await dbConnect();

  req.method === "POST"
    ? post(req, res)
    : req.method === "PATCH"
    ? patch(req, res)
    : req.method === "PUT"
    ? console.log("PUT")
    : req.method === "DELETE"
    ? delete_post(req, res)
    : req.method === "GET"
    ? get(req, res)
    : res.status(404).send("");
}

const get = async (req, res) => {
  const { pid } = req.query;
  let post;
  try {
    post = await Posts.findById(pid);
    if (post == null) {
      return res.status(404).json({ message: "Cannot find user" });
    } else {
      const cats = await Category.find().limit(20);
      res.status(200).json({ post: post, categories: cats });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message, post: {} });
  }

  return post;
};

const post = async (req, res) => {
  console.log(req.body);
  const post = new Posts({
    title: req.body.title,
    subtitle: req.body.subtitle ? req.body.subtitle : "",
    author: req.body.author,
    category: req.body.category ? req.body.category : "",
    content: req.body.content,
    featuredImage: req.body.featuredImage ? req.body.featuredImage : "",
  });
  try {
    const newpost = await post.save();
    res.status(201).json({ message: "success" });
  } catch (err) {
    console.log(err.message);
    res.status(401).json({ message: err.message });
  }
};

const patch = async (req, res) => {
  try {
    await Posts.updateOne(
      {
        _id: req.body.id,
      },
      {
        title: req.body.title,
        subtitle: req.body.subtitle ? req.body.subtitle : "",
        author: req.body.author,
        category: req.body.category ? req.body.category : null,
        content: req.body.content,
        featuredImage: req.body.featuredImage ? req.body.featuredImage : "",
      }
    );
    res.status(200).json({ message: "Post Updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const delete_post = async (req, res) => {
  try {
    const dpost = await Posts.deleteOne({ _id: req.query.pid });
    res.status(200).json(dpost);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};
