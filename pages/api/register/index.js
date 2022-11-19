import formidable from "formidable";
import dbConnect from "libs/dbConnect";
import User from "models/User";
import userWare from "middleware/userware";
import emailWare from "middleware/emailware";
import encryptPass from "libs/encryptPass";

export default async function handler(req, res) {
  await dbConnect();

  req.method === "POST"
    ? post(req, res)
    : req.method === "PATCH"
    ? patch(req, res)
    : req.method === "PUT"
    ? console.log("PUT")
    : req.method === "DELETE"
    ? delete_audio(req, res)
    : req.method === "GET"
    ? get(req, res)
    : res.status(404).send("");
}

const post = async (req, res) => {
  //   const newPass = await userWare.passwordToHash(req.body.password);
  //   console.log(newPass);
  //   return;

  const new_pass = await encryptPass(req.body.password);

  const user = new User({
    firstname: req.body.firstname,
    middlename: req.body.middlename ? req.body.middlename : "",
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password ? new_pass : "0000000000",
    usertype: req.body.usertype ? req.body.usertype : "1",
    paymentStatus: req.body.paymentStatus ? req.body.paymentStatus : "free",
    iaccept: req.body.iaccept ? req.body.iaccept : "Yes",
    status: "pending",
  });
  try {
    const newUser = await user.save();
    const content = `
        Thank you for registering with Purpose Thought<br><br>
        We are pleased to have you. After you login, please verify your email address. This is to ensure you are a human and not a robot. To verify your email address, click the link below:<br><br>
        ${process.env.SITE_URL}auth/verify-email/?em=${req.body.email}&sc=IEOOHNDKUE8821HE676712N,MAJUGAKJAJKKAJKLLdskjaasi9as98quiqw8qw289198a99y8112g12
        <br><br> We wish you good luck as you participate.<br><br> Regards <br> Purpose Thought Team
        `;
    emailWare.sendAnEmail(
      req.body.email,
      "New User Registration Notification",
      content
    );
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
