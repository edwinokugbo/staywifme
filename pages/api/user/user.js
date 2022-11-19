import dbConnect from "libs/dbConnect";
import Users from "models/User";
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
    ? delete_user(req, res)
    : req.method === "GET"
    ? get(req, res)
    : res.status(404).send("");
}

const get = async (req, res) => {
  const { id } = req.query;
  console.log(req.query);
  let user;
  try {
    user = await Users.findById(id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message, user: {} });
  }

  return user;
};

const post = async (req, res) => {
  const user = new Users({
    firstname: req.body.firstname,
    middlename: req.body.middlename ? req.body.middlename : "",
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
    password: req.newPassword,
    usertype: req.body.usertype ? req.body.usertype : "1",
    paymentStatus: req.body.paymentStatus ? req.body.paymentStatus : "free",
    iaccept: req.body.iaccept ? req.body.iaccept : "Yes",
    status: "pending",
  });
  try {
    const newUser = await user.save();
    const content = `
        Thank you for registering with klazroom<br><br>
        We are pleased to have you. After you login, fill out your full profile in the user profile page. <br><br>
        Before you get started, please verify your email address. This is to ensure you are a human and not a robot. To verify your email address, click the link below:<br><br>
        ${process.env.SITE_URL}auth/verify-email/?em=${req.body.email}&sc=IEOOHNDKUE8821HE676712N,MAJUGAKJAJKKAJKLLdskjaasi9as98quiqw8qw289198a99y8112g12
        <br><br> We wish you good luck as you participate.<br><br> Regards <br> klazroom
        `;
    // emailWare.sendAnEmail(
    //   req.body.email,
    //   "New User Registration Notification",
    //   content
    // );
    console.log(newUser);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const patch = async (req, res) => {
  try {
    await Users.updateOne(
      {
        _id: req.body.id,
      },
      {
        profileImage: req.body.profileImage,
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        nickname: req.body.nickname ? req.body.nickname : "",
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        facebook: req.body.facebook,
        twitter: req.body.twitter,
        instagram: req.body.instagram,
        usertype: req.body.usertype,
        paymentStatus: req.body.paymentStatus,
      }
    );
    res.status(201).json({ message: "User Updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const delete_user = async (req, res) => {
  //   console.log(req.body);
  try {
    const duser = await Users.deleteOne({ _id: req.query.id });
    res.status(200).json(duser);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};
