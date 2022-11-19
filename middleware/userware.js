const User = require("models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  // Async functions for use with routers above
  getUserById: async function (req, res, next) {
    let user;
    try {
      user = await User.findById(req.params.id).select("-password");
      if (user == null) {
        return res.status(404).json({ message: "Cannot find user" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }

    res.user = user;
    next();
  },
  passwToHash: async function (req, res, next) {
    const passw = req.body.password;
    var newPassw = "";
    await bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(passw, salt, function (err, hash) {
        newPassw = hash;
        req.newPassword = newPassw;
        next();
      });
    });
  },
  passwordToHash: async function (pw) {
    var newPassw = "";
    await bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(pw, salt, function (err, hash) {
        newPassw = hash;
        return newPassw;
      });
    });
  },
  getUserByIdForDelete: async function (req, res, next) {
    // Async functions for use with routers above
    try {
      user = await User.findById(req.params.id).select("-password");
      if (user == null) {
        return res.status(200).json({ message: "Cannot find user" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }

    res.user = user;
    next();
  },
  getOneUser: async function (req, res, next) {
    let user;
    try {
      let key = req.params.key;
      user = await User.findOne({
        $or: [{ email: key }, { phone: key }],
      }).select("-password");
      if (user === null) {
        return res
          .status(200)
          .json({ status: "notfound", message: "Cannot find user" });
      }
    } catch (err) {
      return res.status(500).json({ status: "failed", message: err.message });
    }

    res.user = user;
    next();
  },
  getUserByEmailOrPhone: async function (req, res, next) {
    let user;
    try {
      let key = req.body.email;
      user = await User.findOne({
        $or: [{ email: key }, { phone: key }],
      }).select("_id firstname lastname email phone status resetString");
      if (user === null) {
        return res
          .status(200)
          .json({ status: "notfound", message: "Cannot find user" });
      }
    } catch (err) {
      return res.status(500).json({ status: "failed", message: err.message });
    }

    res.user = user;
    next();
  },
  getUserByAnyKey: async function (req, res, next) {
    let user;
    try {
      let key = req.body.searchkey;
      user = await User.find({
        $or: [
          { email: key },
          { phone: key },
          { lastname: new RegExp(`^${key}$`, "i") },
          { firstname: new RegExp(`^${key}$`, "i") },
        ],
      }).select("-password");
      if (user == null) {
        return res.status(401).json({ message: "Cannot find user" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }

    res.user = user;
    next();
  },
  checkUnamePassw: async function (req, res, next) {
    // Check for username and password match
    let user;
    var passed;
    try {
      let uname = req.body.credentials.username;
      let passw = req.body.credentials.password;

      user = await User.findOne({
        email: uname,
      });
      if (user === null) {
        return res.status(200).json(null);
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
        next();
      });
    } catch (err) {
      return res.status(500).json({ status: "failed", message: err.message });
    }
  },
};
