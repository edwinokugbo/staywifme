import formidable from "formidable";
import dbConnect from "libs/dbConnect";
import User from "models/User";
import bcrypt from "bcrypt";
import isSamePass from "libs/checkPass";
const saltRounds = 10;

export const config = {
  api: {
    bodyParser: false,
  },
};

const post = async (req, res) => {
  const form = new formidable.IncomingForm();
  const realPath = process.env.PROFILE_IMAGE_PATH;
  form.uploadDir = realPath;
  form.keepExtensions = true;
  const imgPrefix = process.env.PROFILE_IMAGE_PREFIX;

  form.parse(req, async function (err, fields, files) {
    const { credentials } = fields;
    const user = await checkUnamePassword(credentials);

    if (user === null) {
      return res.status(201).json({ status: "failed", user: {} });
    } else {
      const user0 = {
        id: user._id,
        firstname: user.firstname,
        middlename: user.middlename,
        lastname: user.lastname,
        name: user.firstname + " " + user.lastname,
        email: user.email,
        phone: user.phone,
        usertype: user.usertype,
        nickname: user.nickname,
        profile_img: user.profileImage,
        payment_status: user.paymentStatus,
        csrfToken: credentials.csrfToken,
      };
      return res.status(201).json({ status: "success", user: user0 });
    }
  });
};

const checkUnamePassword = async (credentials) => {
  await dbConnect();
  var passed;
  try {
    let uname = credentials.username;
    let passw = credentials.password;

    const user = await User.findOne({
      email: credentials.username,
    });

    if (user === null) {
      return null;
    } else {
      let hash_pass = user.password;

      const same_pass = await isSamePass(passw, hash_pass);
      console.log(same_pass);
      if (same_pass) {
        return user;
      } else {
        return null;
      }
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

const checkUnamePassw = async function (credentials) {
  // Check for username and password match
  let user;
  var passed;
  try {
    let uname = credentials.username;
    let passw = credentials.password;

    user = await User.findOne({
      email: uname,
    });
    console.log("User is: " + "000");
    if (user === null) {
      return null;
    }

    await bcrypt.compare(passw, user.password, function (err, result) {
      if (result) {
        this.passed = true;
      } else {
        this.passed = false;
      }
      const user0 = { ...user, csrfToken: req.body.credentials.csrfToken };
      if (this.passed) {
        res.user = user;
      } else {
        res.user = null;
      }
      return { status: "success", user: user };
    });
  } catch (err) {
    return { status: "failed", message: err.message };
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
    ? console.log("GET")
    : res.status(404).send("");
};
