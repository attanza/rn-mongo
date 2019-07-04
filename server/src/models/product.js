import mongoose, { Schema } from "mongoose";
import mongooseAutopopulate from "mongoose-autopopulate";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new Schema(
  {
    name: String,
    price: Number,
    description: String,
    mainImage: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
      autopopulate: true
    }
  },
  {
    timestamps: true
  }
);

productSchema.plugin(mongoosePaginate);
productSchema.plugin(mongooseAutopopulate);

const Product = mongoose.model("Product", productSchema);
export default Product;
