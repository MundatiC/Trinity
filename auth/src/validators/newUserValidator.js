const { new_user_Schema } = require("../schema/userSchema");

function newUserValidator(body) {
  let user = new_user_Schema.validate(body, { abortEarly: false });

  if (user.error?.details.length > 0) {
    let message = user.error.details.map((err) => err.message);

    throw new Error(message.join("\n"));
  } else {
    return user;
  }
}

module.exports = { newUserValidator };
