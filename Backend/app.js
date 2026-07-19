import express from 'express'
import cors from 'cors'
import DbConnection from './DataBase/DbConnection.js'
import LoginModel from './Models/LoginModel.js'
import authRoute from './Routes/Auth.route.js'
import CustomerModel from './Models/CustomerModels/CustomerModel.js'
import AddProductModel from './Models/Products/AddProductModel.js'
import ProductCategoryModel from './Models/Products/ProductCategoryModel.js'
import SaleModel from './Models/Sale Models/SalesModel.js'
DbConnection()

let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', authRoute)

app.post('/newCustomer', async function (req, res) {
    let data = req.body
    console.log(data)
    let AddCustomerObject = {
        customerName: data.customerName,
        email: data.email,
        phoneNo: data.phoneNo,
        wareHouse: data.wareHouse,
        amountLimit: data.amountLimit,
        CustomerProductRate: data.CustomerProductRate,
        scheme: data.scheme,
        customerCredits: data.customerCredits,
        PreviouseCreditsBalance: data.PreviouseCreditsBalance
    }

    let CreationCustomer = await CustomerModel.create(AddCustomerObject)
    res.json(CreationCustomer)
})

app.get('/find', async function (req, res) {
    let findCustomer = await CustomerModel.find()
    res.json(findCustomer)
})

app.post('/delete/customer', async (req, res) => {
    let deleteCustomer = await CustomerModel.findByIdAndDelete(req.body._id)
    res.json({ message: 'Customer deleted', data: deleteCustomer })
})

app.post('/update/customer/:id', async function (req, res) {
    let updateCustomer = await CustomerModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )

    res.json(updateCustomer)
})

app.post('/add/new/product', async (req, res) => {

    let data = req.body
    console.log(data)
    let AddProductObject = {
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
    }

    let CreationProduct = await AddProductModel.create(AddProductObject)
    res.json({ success: true, data: CreationProduct })


})
app.get('/find/product', async function (req, res) {
    let findProduct = await AddProductModel.find()
    res.json(findProduct)
})

app.post('/delete/product', async (req, res) => {

    let deleted = await AddProductModel.findByIdAndDelete(req.body._id)
    res.json({ success: true, data: deleted })

})


app.post('/update/product/:id', async function (req, res) {
    let updateProduct = await AddProductModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.json(updateProduct)


})


app.post('/product/category', async function (req, res) {
    let data = req.body
    console.log(data)
    let Category = {
        CategoryName: data.CategoryName,
        Description: data.Description,
        Status: data.Status,
    }
    let CreateCategory = await ProductCategoryModel.create(Category)
    res.json(CreateCategory)

})
app.get('/find/category', async function (req, res) {
    const findCategory = await ProductCategoryModel.find()
    res.json(findCategory)

})

app.post('/delete/category', async function (req, res) {
    let deleteCategory = await ProductCategoryModel.findByIdAndDelete(req.body._id)
    if (!deleteCategory) {
        return res.json({ success: false, message: "Category not found" })
    }
    res.json({ success: true, data: deleteCategory })
})


app.post('/new/sale', async function (req, res) {
    try {
        let data = req.body
        console.log(data)

        let count = await SaleModel.countDocuments()
        let invoiceNo = "INV-" + String(count + 1).padStart(4, "0")

        const object = {
            invoiceNo: invoiceNo,
            customerName: data.customerName,
            Date: data.Date,
            showRate: data.showRate,
            freightCharges: data.freightCharges,
            previouseAmount: data.previouseAmount,
            items: data.items,
            grandTotal: data.grandTotal,
            totalCartons: data.totalCartons,
        }

        let createNewSale = await SaleModel.create(object)
        res.json(createNewSale)

    } catch (err) {
        console.log("SALE ERROR:", err.message)
        res.status(500).json({ message: err.message })
    }
})

// Pending sales fetch karne ke liye
app.get('/find/pending/sale', async function (req, res) {
    let pendingSales = await SaleModel.find({ status: "pending" })
    res.json(pendingSales)
})

// Sale approve karne ke liye
app.put('/approve/sale/:id', async function (req, res) {
    let approvedSale = await SaleModel.findByIdAndUpdate(
        req.params.id,
        { status: "approved" },
        { new: true }
    )
    res.json(approvedSale)
})
app.put('/reject/sale/:id', async function (req, res) {
    let rejectedSale = await SaleModel.findByIdAndUpdate(
        req.params.id,
        { status: "rejected" },
        { new: true }
    )
    res.json(rejectedSale)
})


app.get('/find/new/sale', async function (req, res) {
    try {
        let sales = await SaleModel.find()
        res.json(sales)
    } catch (err) {
        console.log("FIND ERROR:", err.message)
        res.status(500).json({ message: err.message })
    }
})

app.post('/delete/sale', async function (req, res) {
    try {
        let deleteSale = await SaleModel.findByIdAndDelete(req.body._id)

        if (!deleteSale) {
            return res.json({ success: false, msg: 'Sale not found' })
        }

        res.json({ success: true, data: deleteSale })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, msg: 'Server error while deleting sale' })
    }
})



























app.listen(3000, () => {
    console.log('Server is running on port 3000');
});