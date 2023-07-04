const joi = require("joi");

const new_user_Schema = joi
  .object({
    Username: joi.string().min(3).required(),
    ProfilePicture: joi.string().min(5).max(30),
    Password: joi
      .string()
      .required()
      .pattern(new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
      )),
    c_password: joi.ref("Password"),
    Email: joi
      .string()
      .email({ tlds: { allow: false } }),
  })
  .with("Password", "c_password");


module.exports = { new_user_Schema }
