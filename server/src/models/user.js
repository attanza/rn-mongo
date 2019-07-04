import { hash } from "bcryptjs";
import mongoose, { Schema } from "mongoose";
import mongooseAutopopulate from "mongoose-autopopulate";
import mongoosePaginate from "mongoose-paginate-v2";
const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      autopopulate: true
    }
  },
  {
    timestamps: true
  }
);

userSchema.plugin(mongoosePaginate);
userSchema.plugin(mongooseAutopopulate);

userSchema.pre("save", async function(next) {
  try {
    if (this.isModified(this.password)) {
      this.password = await hash(this.password, 12);
    }
  } catch (e) {
    console.error(e);
  }
});

const User = mongoose.model("User", userSchema);
export default User;
