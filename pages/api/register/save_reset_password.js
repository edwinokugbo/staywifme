import dbConnect from "libs/dbConnect";
import User from "models/User";
import encryptPass from "libs/encryptPass";

const patch = async (req, res) => {
  const id = req.body.id;
  console.log(req.body);

  await dbConnect();

  const new_pass = await encryptPass(req.body.password);

  try {
    await User.updateOne(
      {
        _id: id,
      },
      {
        password: req.body.password ? new_pass : "",
        resetCode: "",
      }
    );
    res.status(201).json({ status: "success", message: "success" });
  } catch (err) {
    console.log(err.message);
    res.status(401).json({ message: err.message });
  }
};

export default (req, res) => {
  req.method === "POST"
    ? console.log("POST")
    : req.method === "PATCH"
    ? patch(req, res)
    : req.method === "DELETE"
    ? console.log("DELETE")
    : req.method === "GET"
    ? get(req, res)
    : res.status(404).send("");
};
