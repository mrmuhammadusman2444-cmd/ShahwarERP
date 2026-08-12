import express from 'express'
import cors from 'cors'
import DbConnection from './DataBase/DbConnection.js'
import authRoute from './Routes/Auth.route.js'
import customerRoute from './Routes/Customer.route.js'
import productRoute from './Routes/Product.route.js'
import categoryRoute from './Routes/Category.route.js'
import saleRoute from './Routes/Sale.route.js'
import UnitRoute from './Routes/Unit.route.js'
import PurchaseRoute from './Routes/Purchase.route.js'
import SupplierRoute from './Routes/Supplier.route.js'
import SupplierPaymentRoute from './Routes/SupplierPayment.route.js'
import AssetRoute from './Routes/Asset.route.js'
import BankRoute from './Routes/Bank.route.js'
import EmployeeRoute from './Routes/Employee.route.js'
import TaskRoute from './Routes/Task.route.js'
import AttendenceRoute from './Routes/Attendence.route.js'
import HolidayRoute from './Routes/Holiday.route.js'

DbConnection()

let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', authRoute)
app.use('/', customerRoute)
app.use('/', productRoute)
app.use('/', categoryRoute)
app.use('/', saleRoute)
app.use('/', UnitRoute)
app.use('/', PurchaseRoute)
app.use('/', SupplierRoute)
app.use('/', SupplierPaymentRoute)
app.use('/', AssetRoute)
app.use('/', BankRoute)
app.use('/', EmployeeRoute)
app.use('/', TaskRoute)
app.use('/', AttendenceRoute)
app.use('/', HolidayRoute)
app.use('/uploads', express.static('uploads'))




app.listen(3000, () => {
    console.log('Server is running on port 3000');
});