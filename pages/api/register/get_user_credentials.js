import formidable from "formidable";
import dbConnect from "libs/dbConnect";
import User from "models/User";
import emailWare from "middleware/emailware";
import Randomstring from "randomstring";

const post = async (req, res) => {
  const id = req.body.id;
  console.log(req.body);

  await dbConnect();
  try {
    const user = await User.findOne({
      _id: id,
    });

    if (user) {
        const user_data = {
            email: user.email,
            status: user.status,
            code: user.verificationCode
        }
      res.status(200).json({ user: user_data });
    } else {
      res.status(404).json({
        message: "No such user",
      });
    }
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
