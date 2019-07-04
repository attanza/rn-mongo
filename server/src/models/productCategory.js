import changeCase from "change-case";
import mongoose, { Schema } from "mongoose";
import mongooseAutopopulate from "mongoose-autopopulate";
import mongoosePaginate from "mongoose-paginate-v2";

const productCategorySchema = new Schema(
  {
    name: String,
    slug: String,
    description: String,
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      autopopulate: true
    }
  },
  {
    timestamps: true
  }
);

productCategorySchema.plugin(mongoosePaginate);
productCategorySchema.plugin(mongooseAutopopulate);

productCategorySchema.pre("save", async function(next) {
  this.slug = changeCase.paramCase(this.name);
});

const ProductCategory = mongoose.model(
  "ProductCategory",
  productCategorySchema
);
export default ProductCategory;
