import dbConnect from "libs/dbConnect";
import Posts from "models/Post";
import Category from "models/Category";

export default async function handler(req, res) {
  await dbConnect();

  req.method === "POST"
    ? console.log("POST")
    : req.method === "PATCH"
    ? patch(req, res)
    : req.method === "PUT"
    ? console.log("PUT")
    : req.method === "DELETE"
    ? console.log("DELETE")
    : req.method === "GET"
    ? get(req, res)
    : res.status(404).send("");
}

const get = async (req, res) => {
  const cats = await Category.find().limit(20);

  if (cats) {
    res.status(200).json(cats);
  } else {
    res.status(400).json({ message: "Could not find categories" });
  }
};
