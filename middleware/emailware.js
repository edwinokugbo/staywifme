const nodemailer = require("nodemailer");

module.exports = {
  sendAnEmail: function (email, subject, content) {
    // Send an email
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    var mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: subject,
      html: content,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  },
  checkVerification: async function (req, res, next) {
    let user;
    try {
      let key = req.params.email;
      user = await User.findOne({ email: "eokugbo@gmail.com" });
      if (user === null) {
        return res.status(200).json({ message: "User not found", email: key });
      } else if (user.status === "verified") {
        return res
          .status(200)
          .json({ message: "User is already verified", email: key });
      }
    } catch (err) {
      return res.status(500).json({ status: "failed", message: err.message });
    }

    res.user = user;
    next();
  },
};
