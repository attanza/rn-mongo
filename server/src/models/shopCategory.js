import changeCase from "change-case";
import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const shopCategorySchema = new Schema(
  {
    name: String,
    slug: String,
    description: String
  },
  {
    timestamps: true
  }
);

shopCategorySchema.plugin(mongoosePaginate);
shopCategorySchema.pre("save", async function() {
  this.slug = changeCase.paramCase(this.name);
});
const ShopCategory = mongoose.model("ShopCategory", shopCategorySchema);
export default ShopCategory;
