import changeCase from "change-case";
import mongoose, { Schema } from "mongoose";
import mongooseAutopopulate from "mongoose-autopopulate";
import mongoosePaginate from "mongoose-paginate-v2";

const shopSchema = new Schema(
  {
    name: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShopCategory",
      autopopulate: true
    },
    email: String,
    phone: String,
    address: {
      street: String,
      state: String,
      city: String,
      province: String,
      country: String,
      postCode: String
    },
    location: {
      type: { type: String, default: "Point" },
      coordinates: {
        type: [Number]
      }
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);
shopSchema.plugin(mongoosePaginate);
shopSchema.plugin(mongooseAutopopulate);

shopSchema.pre("save", async function(next) {
  this.slug = changeCase.paramCase(this.name);
});

const Shop = mongoose.model("Shop", shopSchema);
export default Shop;
