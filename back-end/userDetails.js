const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const UserDetailsScehma = new Schema(
  {
    firstNames: {type: String, require: true},
    lastName: {type: String, require: true},
    emailadress: { type: String, require: true, index:true, unique:true,sparse:true},
    passwords: {type: String, require: true},
    conform: {type: String, require: true},
  }
);
// module.exports = mongoose.model.Users || mongoose.model("Users", UserDetailsScehma);
// console.log("UserDetailsScehma", UserDetailsScehma);
 mongoose.model("UserInfo", UserDetailsScehma);
//  module.exports = user
// module.exports = mongoose.model.UserInfo || mongoose.model("UserInfo", UserDetailsScehma);


// const UserData =new mongoose.model("UserInfo", UserDetailsScehma)
// module.exports = UserData
