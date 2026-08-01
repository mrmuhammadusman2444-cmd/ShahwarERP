import express from 'express'
import AddProductModel from '../Models/Products/AddProductModel.js'

const router = express.Router()

router.post('/add/new/product', async (req, res) => {
    try {

        let data = req.body;

        const lastProduct = await AddProductModel
            .findOne()
            .sort({ createdAt: -1 });

        let productCode = "PRD0001";

        if (lastProduct && lastProduct.productCode) {
            const lastNumber = parseInt(
                lastProduct.productCode.replace("PRD", "")
            );

            productCode = `PRD${String(lastNumber + 1).padStart(4, "0")}`;
        }

        const AddProductObject = {
            productCode: productCode,
            productName: data.productName,
            cartonSize: data.cartonSize,
            weight: data.weight,
            weightUnit: data.weightUnit,
            model: data.model,
            mainCategory: data.mainCategory,
            saleRawCategory: data.saleRawCategory,
            productCategory: data.productCategory,
            costPrice: data.costPrice,
            distributorPrice: data.distributorPrice,
            retailPrice: data.retailPrice,
            wholesaleRate: data.wholesaleRate,
            codOnlinePrice: data.codOnlinePrice,
            unitSchemePoint: data.unitSchemePoint,
            storeLimit: data.storeLimit
        };

        const CreationProduct = await AddProductModel.create(AddProductObject);
        console.log("Saved Product:", CreationProduct);

        res.json({
            success: true,
            data: CreationProduct
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
    console.log("Request Body:", data);
    console.log("Generated Code:", productCode);
});

router.get('/find/product', async function (req, res) {
    let findProduct = await AddProductModel.find()
    res.json(findProduct)
})
router.get('/find/raw/products', async function (req, res) {
    let rawProducts = await AddProductModel.find({ saleRawCategory: "Raw" })
    res.json(rawProducts)
})

router.post('/delete/product', async (req, res) => {
    let deleted = await AddProductModel.findByIdAndDelete(req.body._id)
    res.json({ success: true, data: deleted })
})

router.post('/update/product/:id', async function (req, res) {
    let updateProduct = await AddProductModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.json(updateProduct)
})

export default router