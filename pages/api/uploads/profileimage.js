import formidable from "formidable";
import fs from "fs";
import dbConnect from "libs/dbConnect";
import User from "models/User";

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
    const { imagename, uid } = fields;
    await saveProfileImageToDB(imgPrefix + files.file.newFilename, uid);
    return res
      .status(201)
      .json({ message: "image saved", filename: files.file.newFilename });
  });
};

const saveFile = async (file) => {
  const data = fs.readFileSync(file.filepath);
  fs.writeFileSync(`public/img/profile/${file.newFilename}`, data);
  return;
};

const saveProfileImageToDB = async (filename, uid) => {
  await dbConnect();

  try {
    await User.updateOne(
      {
        _id: uid,
      },
      {
        $set: {
          profileImage: filename,
        },
      }
    );
    return true;
  } catch (err) {
    console.log(err);
    console.log("09097558551");
    return false;
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
