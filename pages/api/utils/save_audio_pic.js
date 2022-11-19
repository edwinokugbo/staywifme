import formidable from "formidable";
import { saveAudioImageToDB } from "middleware/utilware";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = process.env.AUDIO_IMAGE_PATH;
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    const { imagename, id } = fields;
    const publicPath = process.env.AUDIO_IMAGE_PREFIX;
    const filename = publicPath + files.file.newFilename;

    saveAudioImageToDB(filename, id);
    res.status(200).json({ message: "image saved", filename: filename });
  });
};
