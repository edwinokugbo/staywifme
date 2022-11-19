import formidable from "formidable";
import dbConnect from "libs/dbConnect";
import User from "models/User";
import emailWare from "middleware/emailware";
import Randomstring from "randomstring";

const updateInitialReg = async (id, code) => {
  try {
    await User.updateOne(
      {
        _id: id,
      },
      {
        resetCode: code,
      }
    );
    return { status: "success" };
  } catch (err) {
    console.log(err);
  }
};

const post = async (req, res) => {
  const id = req.body.email;
  console.log(req.body);
  await dbConnect();
  try {
    const user = await User.findOne({
      email: id,
    });

    if (user) {
      const code = Randomstring.generate({
        length: 6,
        charset: "numeric",
      });
      const new_user = await updateInitialReg(user._id, code);

      const content = `
        This is your password reset code from StayWifMe. This code will expire in 10 minutes.<br><br> Verification Code: <strong>${code}</strong>
        <br><br> Regards <br><br> StayWifMe Team
        `;
      emailWare.sendAnEmail(id, "New Password Reset Code", content);

      res.status(200).json({
        status: "success",
        id: user._id,
        message: "New code has been sent to your registered phone/email",
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
