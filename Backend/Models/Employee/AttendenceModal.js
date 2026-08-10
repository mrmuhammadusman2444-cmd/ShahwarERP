import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },
    employeeName: {
        type: String
    },
    date: {
        type: String
    },
    status: {
        type: String,
        enum: ["present", "absent", "leave"],
        default: "present"
    },
    halfDay: {
        type: Boolean,
        default: false
    },
    shortDay: {
        type: Boolean,
        default: false
    },
    overtime: {
        type: Number,
        default: 0
    },
    markedBy: {
        type: String
    },

}, { timestamps: true });

const AttendanceModel = mongoose.model("Attendance", AttendanceSchema);
export default AttendanceModel;