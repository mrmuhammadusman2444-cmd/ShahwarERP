import mongoose from "mongoose";

const AddProductSchema = new mongoose.Schema({
    productName: { type: String, },
    cartonSize: { type: Number, },
    weight: { type: Number,  },
    weightUnit: { type: String, default: "g" },
    model: { type: String,  },
    mainCategory: { type: String },
    saleRawCategory: { type: String },
    productCategory: { type: String },
    costPrice: { type: Number,   },
    distributorPrice: { type: Number,   },
    retailPrice: { type: Number,   },
    wholesaleRate: { type: Number,  },
    codOnlinePrice: { type: Number,  },
    unitSchemePoint: { type: Number,  },
    storeLimit: { type: Number,  },
},)

const AddProductModel = mongoose.model('Products', AddProductSchema)
export default AddProductModel