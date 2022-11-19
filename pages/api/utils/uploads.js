import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

const post = async (req, res) => {
  const form = new formidable.IncomingForm();
  const realPath =
    "/media/edwin/Projects/Web/Purpose Thoughts/frontend/public/img/test";
  form.uploadDir = realPath;
  form.keepExtensions = true;

  form.parse(req, async function (err, fields, files) {
    // console.log(err);
    await saveFile(files.file);
    return res
      .status(201)
      .json({ message: "image saved", filename: files.file.newFilename });
  });
};

const saveFile = async (file) => {
  // console.log(file);
  const data = fs.readFileSync(file.filepath);
  fs.writeFileSync(`public/img/test/${file.newFilename}`, data);
  // await fs.unlinkSync(file.filepath);
  return;
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
