import bcrypt from "bcrypt";

export default function isSamePass(unHashPass, hashPass) {
  return bcrypt.compare(unHashPass, hashPass).then(function (result) {
    return result;
  });
}
