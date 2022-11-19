import formidable from "formidable";
import dbConnect from "libs/dbConnect";
import Subscription from "models/Subscription";

export const config = {
  api: {
    bodyParser: false,
  },
};

const get = async (req, res) => {
  await dbConnect();
  try {
    const post = await Subscription.find()
      .populate("subscriber", "firstname lastname")
      .limit(200);

    res.status(200).json(post);
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
