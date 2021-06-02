const bcrypt = require("bcrypt");
const generator = require("generate-password");

class GenerateServices {
  constructor() {
    this.password = "";
  }

  static async generatePassword() {
    var password = generator.generate({
      length: 8,
      numbers: true,
    });
    this.password = password;
    var salt = bcrypt.genSaltSync(5);
    var hashed_password = bcrypt.hashSync(password, salt);
    return hashed_password;
  }

  static async generateMessage(data) {
    var message = `Hello Mr/Mrs <b>${data.userName}</b>
                    <br/>Your userName Is :${data.userName}
                    <br/>Your Password Is :${this.password}`;
    return message;
  }
}

module.exports = GenerateServices;
