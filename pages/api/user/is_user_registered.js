import formidable from "formidable";
import dbConnect from "libs/dbConnect";
import User from "models/User";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

const post = async (req, res) => {
  const email = req.body.email;
  const phone = req.body.phone;
  console.log(email, phone);
  await dbConnect();
  try {
    const user = await User.findOne({
      $or: [{ email: email }, { phone: phone }],
    });

    if (user) {
      console.log(user);
      res.status(200).json({ status: "found" });
    } else {
      console.log("Not found");
      res.status(200).json({ status: "notfound" });
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
