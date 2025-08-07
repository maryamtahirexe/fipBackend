// import mongoose from "mongoose";

// const ownerSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String
//   },
// });

// const Owner = mongoose.model("Owner", ownerSchema);

// export default Owner;

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["owner", "cashier"], // Roles can be extended as needed
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
export default User;

