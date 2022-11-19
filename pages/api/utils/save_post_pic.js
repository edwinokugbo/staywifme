import formidable from "formidable";
import { savePostImageToDB } from "middleware/utilware";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = process.env.POST_IMAGE_PATH;
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    const { imagename, id } = fields;
    const publicPath = process.env.POST_IMAGE_PREFIX;
    const filename = publicPath + files.file.newFilename;

    savePostImageToDB(filename, id);
    res.status(200).json({ message: "image saved", filename: filename });
  });
};
