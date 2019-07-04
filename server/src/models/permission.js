import changeCase from "change-case";
import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const permissionSchema = new Schema(
  {
    name: String,
    slug: String,
    description: String
  },
  {
    timestamps: true
  }
);

permissionSchema.plugin(mongoosePaginate);

permissionSchema.pre("save", async function(next) {
  this.slug = changeCase.paramCase(this.name);
});

const Permission = mongoose.model("Permission", permissionSchema);
export default Permission;
