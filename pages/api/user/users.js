import formidable from "formidable";
import dbConnect from "libs/dbConnect";
import User from "models/User";

export const config = {
  api: {
    bodyParser: false,
  },
};

const get = async (req, res) => {
  await dbConnect();
  try {
    const users = await User.find().limit(200);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default (req, res) => {
  req.method === "POST"
    ? post(req, res)
    : req.method === "PUT"
    ? console.log("PUT")
    : req.method === "DELETE"
    ? console.log("DELETE")
    : req.method === "GET"
    ? get(req, res)
    : res.status(404).send("");
};
