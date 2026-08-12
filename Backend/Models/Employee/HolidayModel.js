import mongoose from "mongoose";

const HolidaySchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
}, { timestamps: true });

const HolidayModel = mongoose.model("Holiday", HolidaySchema);
export default HolidayModel;