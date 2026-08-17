import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    assignedTo: { type: String },      
    assignedBy: { type: String },      
    dueDate: { type: Date },
    priority: {
        type: String,
        enum: ["urgent", "high", "normal"],
        default: "normal"
    },
    status: {
        type: String,
        enum: ["pending", "in-progress", "done"],
        default: "pending"
    },
    comments: [
        {
            by: { type: String },       // kisne comment kiya
            text: { type: String },
            date: { type: Date, default: Date.now }
        }
    ],
}, { timestamps: true })

const TaskModel = mongoose.model('Task', TaskSchema)
export default TaskModel