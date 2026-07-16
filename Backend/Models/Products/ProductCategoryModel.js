import mongoose from "mongoose";

const ProductCategorySchema = new mongoose.Schema({
    CategoryName: { type: String },
    Description: { type: String },
    Status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active",
    },
})

const ProductCategoryModel = mongoose.model('Category', ProductCategorySchema)
export default ProductCategoryModel