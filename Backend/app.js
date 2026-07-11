import express from 'express'
import cors from 'cors'
import DbConnection from './DataBase/DbConnection.js'
import LoginModel from './Models/LoginModel.js'
import authRoute from './Routes/Auth.route.js'
import CustomerModel from './Models/CustomerModels/CustomerModel.js'
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
        amountLimit: data.amountLimit,
        CustomerProductRate: data.CustomerProductRate,
        scheme: data.scheme,
        customerCredits: data.customerCredits,
        PreviouseCreditsBalance: data.PreviouseCreditsBalance
    }

    let CreationCustomer= await CustomerModel.create(AddCustomerObject)
    res.json(CreationCustomer)
})

app.post('/newCustomer',async function (req,res) {
   let findCustomer = await CustomerModel.find() 
})






app.listen(3000, () => {
    console.log('Server is running on port 3000');
});