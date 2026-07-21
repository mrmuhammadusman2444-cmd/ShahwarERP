import mongoose from "mongoose";

const ProductCategorySchema = new mongoose.Schema({
    CategoryName: { type: String },
    Description: { type: String },
    Status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active",
    },
    order: { type: Number, default: 0 },
})

const ProductCategoryModel = mongoose.model('Category', ProductCategorySchema)
export default ProductCategoryModel