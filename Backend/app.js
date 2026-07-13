import express from 'express'
import cors from 'cors'
import DbConnection from './DataBase/DbConnection.js'
import LoginModel from './Models/LoginModel.js'
import authRoute from './Routes/Auth.route.js'
import CustomerModel from './Models/CustomerModels/CustomerModel.js'
import AddProductModel from './Models/Products/AddProductModel.js'
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

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});