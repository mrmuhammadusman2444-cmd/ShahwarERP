import express from 'express'
import ProductCategoryModel from '../Models/Products/ProductCategoryModel.js'

const router = express.Router()

router.post('/product/category', async function (req, res) {
    let data = req.body
    let Category = {
        CategoryName: data.CategoryName,
        Description: data.Description,
        Status: data.Status,
    }
    let CreateCategory = await ProductCategoryModel.create(Category)
    res.json(CreateCategory)
})

router.get('/find/category', async function (req, res) {
    let findCategory = await ProductCategoryModel.find().sort({ order: 1 })
    res.json(findCategory)
})

router.put('/reorder/category', async function (req, res) {
    try {
        const { categories } = req.body
        for (let cat of categories) {
            await ProductCategoryModel.findByIdAndUpdate(cat._id, { order: cat.order })
        }
        res.json({ success: true })
    } catch (err) {
        res.json({ success: false, msg: err.message })
    }
})

router.post('/delete/category', async function (req, res) {
    let deleteCategory = await ProductCategoryModel.findByIdAndDelete(req.body._id)
    if (!deleteCategory) {
        return res.json({ success: false, message: "Category not found" })
    }
    res.json({ success: true, data: deleteCategory })
})

router.post('/update/category', async function (req, res) {
    let updatedCategory = await ProductCategoryModel.findByIdAndUpdate(
        req.body._id,
        req.body,
        { new: true }
    )
    res.json(updatedCategory)
})

export default router