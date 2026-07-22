import mongoose from "mongoose";

const UnitSchema = new mongoose.Schema({
    unitName: { type: String },
    shortCode: { type: String },
    Description: { type: String },

})

const UnitModel = mongoose.model('unit', UnitSchema)
export default UnitModel