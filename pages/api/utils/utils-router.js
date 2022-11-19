const express = require("express");
const router = express.Router();
const User = require("models/User");
const userWare = require("middleware/userware");
const emailWare = require("middleware/emailware");
const utilWare = require("middleware/utilware");
const { response } = require("express");
const formidable = require("formidable");
const { dirname } = require("path");
const randomString = require("randomstring");

router.post("/utils/save-profile-pic", async (req, res) => {
  const form = new formidable.IncomingForm();
  const realPath = process.env.PROFILE_IMAGE_PATH;
  form.uploadDir = realPath;
  const rootPath = dirname(require.main.filename);
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    const { imagename, id } = fields;
    const publicPath = process.env.PROFILE_IMAGE_PREFIX;
    const filename = publicPath + files.file.newFilename;

    utilWare.saveImageToDB(filename, id);
    res.status(200).json({ message: "image saved", filename: filename });
  });
});

router.post("/utils/save-post-pic", async (req, res) => {
  const form = new formidable.IncomingForm();
  const realPath = process.env.POST_IMAGE_PATH;
  form.uploadDir = realPath;
  const rootPath = dirname(require.main.filename);
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    const { imagename, id } = fields;
    const publicPath = process.env.POST_IMAGE_PREFIX;
    const filename = publicPath + files.file.newFilename;

    utilWare.savePostImageToDB(filename, id);
    res.status(200).json({ message: "image saved", filename: filename });
  });
});

router.post("/utils/save-product-pic", async (req, res) => {
  const form = new formidable.IncomingForm();
  const realPath = process.env.SHOP_IMAGE_PATH;
  form.uploadDir = realPath;
  const rootPath = dirname(require.main.filename);
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    const { imagename, id } = fields;
    const publicPath = process.env.SHOP_IMAGE_PREFIX;
    const filename = publicPath + files.file.newFilename;

    utilWare.saveProductImageToDB(filename, id);
    res.status(200).json({ message: "image saved", filename: filename });
  });
});

router.post("/utils/save-site-media", async (req, res) => {
  const form = new formidable.IncomingForm();
  const realPath = process.env.SITE_IMAGE_PATH;
  form.uploadDir = realPath;
  const rootPath = dirname(require.main.filename);
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    const { imagename, id, title } = fields;
    let publicPath = process.env.SITE_IMAGE_PREFIX;
    let filename = publicPath + files.file.newFilename;

    utilWare.saveSiteImageToDB(filename, id, title);
    res.status(200).json({ message: "image saved", filename: filename });
  });
});

router.post("/utils/save-test-pic", async (req, res) => {
  const form = new formidable.IncomingForm();
  const realPath = process.env.TEST_IMAGE_PATH;
  form.uploadDir = realPath;
  const rootPath = dirname(require.main.filename);
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    const { imagename, tid } = fields;
    const publicPath = process.env.TEST_IMAGE_PREFIX;
    const filename = publicPath + files.file.newFilename;
    utilWare.saveTestImageToDB(filename, tid);
    res.status(200).json({ message: "image saved", filename: filename });
  });
});

router.post("/utils/save-question-pic", async (req, res) => {
  const form = new formidable.IncomingForm();
  const realPath = process.env.QUESTION_IMAGE_PATH;
  form.uploadDir = realPath;
  const rootPath = dirname(require.main.filename);
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    const { imagename, tid, qid } = fields;
    const publicPath = process.env.QUESTION_IMAGE_PREFIX;
    const filename = publicPath + files.file.newFilename;

    utilWare.saveQuestionImageToDB(filename, tid, qid);
    res.status(200).json({ message: "image saved", filename: filename });
  });
});

router.post(
  "/util/request-password-change",
  userWare.getUserByEmailOrPhone,
  async (req, res) => {
    const resetCode = randomString.generate(70);
    try {
      await User.updateOne(
        {
          _id: res.user._id,
        },
        {
          resetString: resetCode,
        }
      );
      const content = `
    You have requested to change your password for DeCapitalist TV Show portal<br><br>
    Please click the link below to reset your password.<br><br>
    ${process.env.SITE_URL}resetpassword/${resetCode}
    <br><br>If you didn't request for this password reset or you have changed your mind, just ignore this email<br><br>Regards<br>Decapitalist Team
    `;
      emailWare.sendAnEmail(
        res.user.email,
        "Request to Reset Password",
        content
      );
      // return true;
    } catch (err) {
      res.status(200).json({ message: "Could not update reset string" });
      console.log(err);
      // return false;
    }
    res.status(200).json({ message: "Password Reset Email Sent" });
  }
);

// Check and verify the reset code from user link
router.get("/util/check-reset-code/:code", async (req, res) => {
  let user;
  try {
    user = await User.findOne({ resetString: req.params.code })
      .select("_id firstname lastname email phone resetString")
      .select("-password");
    if (user === null) {
      res.status(400).json({ message: "Link is invalid" });
    } else {
      res.status(200).json({
        id: user._id,
        email: user.email,
        message: "Success: Start reset password",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error encountered" });
  }
});

router.patch(
  "/util/reset-password-now",
  userWare.passwToHash,
  async (req, res) => {
    try {
      const user = await User.updateOne(
        { _id: req.body.id },
        { password: req.newPassword, resetString: "" }
      );
      res.status(200).json({ message: "password updated" });
    } catch (err) {
      res.status(500).json({ message: "There was an error on the server" });
    }
  }
);

router.post("/get-verify", async (req, res) => {
  let user;
  try {
    user = await User.findById(req.body.id).select("_id email status");

    if (user == null) {
      res.status(404).json({ message: "no such user" });
    } else {
      res.status(200).json({ user: user });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/resend-verify", async (req, res) => {
  let user;
  try {
    const content = `
    Thank you for registering with klazroom.com<br><br>
    We are pleased to have you. We encourage you  to login and fill out your full profile in the user profile page. 
    Before you get started, you need to verify your email address. This is to ensure you are a human and not a bot. To verify your email address, click the link below:<br><br>
    ${process.env.SITE_URL}security/verify-email/?em=${req.body.email}&sc=IEOOHNDKUE8821HE676712N,MAJUGAKJAJKKAJKLLdskjaasi9as98quiqw8qw289198a99y8112g12
    <br><br> We wish you good luck as you participate.<br><br> Regards <br> klazroom Team
    `;
    emailWare.sendAnEmail(
      req.body.email,
      "klazroom: Verify Your Email",
      content
    );

    res.status(200).json({ message: "Verify email has been sent" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
