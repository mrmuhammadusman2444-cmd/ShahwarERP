import express from 'express'
import TaskModel from '../Models/TaskModel.js'
const router = express.Router()

// 1. Task banao (admin)
router.post('/add/task', async function (req, res) {
    try {
        let newTask = await TaskModel.create({
            title: req.body.title,
            description: req.body.description,
            assignedTo: req.body.assignedTo,
            assignedBy: req.body.assignedBy,
            dueDate: req.body.dueDate,
            priority: req.body.priority,
        })
        res.json(newTask)
    } catch (err) {
        res.status(500).json({ message: "Task create failed", error: err.message })
    }
})

// 2. Saare tasks (admin ke liye — sab dikhें)
router.get('/find/tasks', async function (req, res) {
    try {
        let tasks = await TaskModel.find().sort({ createdAt: -1 })
        res.json(tasks)
    } catch (err) {
        res.status(500).json({ message: "Fetch failed", error: err.message })
    }
})

// 3. Ek user ke tasks (worker ke liye — sirf uske)
router.get('/find/tasks/:assignedTo', async function (req, res) {
    try {
        let tasks = await TaskModel.find({ assignedTo: req.params.assignedTo }).sort({ createdAt: -1 })
        res.json(tasks)
    } catch (err) {
        res.status(500).json({ message: "Fetch failed", error: err.message })
    }
})

// 4. Task status update (worker — pending/in-progress/done)
router.put('/update/task/status/:id', async function (req, res) {
    try {
        let updated = await TaskModel.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        )
        res.json(updated)
    } catch (err) {
        res.status(500).json({ message: "Update failed", error: err.message })
    }
})

// 5. Task delete (admin)
router.delete('/delete/task/:id', async function (req, res) {
    try {
        await TaskModel.findByIdAndDelete(req.params.id)
        res.json({ message: "Task deleted" })
    } catch (err) {
        res.status(500).json({ message: "Delete failed", error: err.message })
    }
})

export default router