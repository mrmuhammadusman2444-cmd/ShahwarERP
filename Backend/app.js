import express from 'express'
import cors from 'cors'
import DbConnection from './DataBase/DbConnection.js'
import authRoute from './Routes/Auth.route.js'
import customerRoute from './Routes/Customer.route.js'
import productRoute from './Routes/Product.route.js'
import categoryRoute from './Routes/Category.route.js'
import saleRoute from './Routes/Sale.route.js'

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

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});