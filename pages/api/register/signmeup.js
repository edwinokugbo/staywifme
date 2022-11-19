import formidable from "formidable";
import dbConnect from "libs/dbConnect";
import User from "models/User";
import emailWare from "middleware/emailware";
import Randomstring from "randomstring";

const saveInitialReg = async (id, code) => {
  const user = new User({
    email: id,
    verificationCode: code,
    status: "pending",
  });
  try {
    const newUser = await user.save();
    return { status: "success", user: newUser };
  } catch (err) {
    console.log(err);
  }
};

const post = async (req, res) => {
  const id = req.body.id;
  await dbConnect();
  try {
    const user = await User.findOne({
      email: id,
    });

    if (user) {
      res
        .status(200)
        .json({ status: "taken", message: "Phone or Email is aready taken" });
    } else {
      const code = Randomstring.generate({
        length: 6,
        charset: "numeric",
      });
      const new_user = await saveInitialReg(id, code);

      const content = `
        Thank you for registering with StayWifMe<br><br>
        We are pleased to have you. Please verify your phone/email by entering the code below. This is to ensure you are a human and not a robot.<br><br> Verification Code: <strong>${code}</strong>
        <br><br> Regards <br><br> StayWifMe Team
        `;
      emailWare.sendAnEmail(id, "New User Registration Notification", content);

      res.status(200).json({
        status: "available",
        message: "Phone or Email is available",
        uid: new_user.user._id,
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
