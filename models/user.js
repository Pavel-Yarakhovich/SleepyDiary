import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please, provide a name for a user"],
    maxlength: [30, "Provided name is too long"],
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
    unique: true,
  },
  babyName: {
    type: String,
    required: [true, "Please, provide a name for a baby"],
    maxlength: [30, "Provided name is too long"],
  },
  // babyDOB: {
  //   type: BigInt,
  //   required: [true, "Please, provide a birth date"],
  // },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
