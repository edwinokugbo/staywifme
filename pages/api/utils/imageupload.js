import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = "./public/uploads";
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    fs.rename("/" + files.path, "./public/uploads/1111.png");
  });
  // form.on("file", function (field, file) {
  //   // rename the incoming file to the file's name
  //   fs.rename(file.filepath, form.uploadDir + "/" + "1111.png");
  //   fs.rename(file.filepath, "./public/uploads/1111.png");
  //   fs.copyFile("./public/uploads/invalid-name", "./public/uploads/111.png");
  //   console.log(err);
  // });
};
