import formidable from "formidable";
import { saveBookPDFToDB } from "middleware/utilware";
var fs = require("fs");

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = process.env.BOOK_PDF_PATH;
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    const { imagename, id } = fields;
    const publicPath = process.env.BOOK_PDF_PREFIX;
    const filename = publicPath + files.file.newFilename;

    const dd = process.env.BOOK_PDF_PATH + "/";
    const fn = files.file.newFilename;

    console.log(dd);

    saveBookPDFToDB(filename + ".pdf", id);
    fs.rename(dd + fn, dd + fn + ".pdf", function (err) {
      if (err) throw err;
      console.log("File Renamed.");
    });
    res.status(200).json({ message: "image saved", filename: filename });
  });
};
