import express from 'express'
import cors from 'cors'
import DbConnection from './DataBase/DbConnection.js'
import LoginModel from './Models/LoginModel.js'
import authRoute from './Routes/Auth.route.js'
DbConnection()

let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));





app.use('/', authRoute)






app.listen(3000, () => {
    console.log('Server is running on port 3000');
});