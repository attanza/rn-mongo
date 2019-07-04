import changeCase from "change-case";
import mongoose, { Schema } from "mongoose";
import mongooseAutopopulate from "mongoose-autopopulate";
import mongoosePaginate from "mongoose-paginate-v2";

const roleSchema = new Schema(
  {
    name: String,
    slug: String,
    description: String,
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
        autopopulate: true
      }
    ]
  },
  {
    timestamps: true
  }
);

roleSchema.plugin(mongoosePaginate);
roleSchema.plugin(mongooseAutopopulate);

roleSchema.pre("save", async function(next) {
  this.slug = changeCase.paramCase(this.name);
});

const Role = mongoose.model("Role", roleSchema);
export default Role;
