import express from 'express'
import CustomerModel from '../Models/CustomerModels/CustomerModel.js'
import { verifyToken, checkPermission } from '../Middleware/auth.js'
import SaleModel from '../Models/Sale Models/SalesModel.js'
import SupplierPaymentsModel from '../Models/Accounts/SupplierPaymentsModel.js'

const router = express.Router()

router.post('/newCustomer', async function (req, res) {
    let data = req.body
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

router.get('/find', async function (req, res) {
    let findCustomer = await CustomerModel.find()
    res.json(findCustomer)
})

router.post('/delete/customer', verifyToken, checkPermission('customers', 'delete'), async (req, res) => {
    let deleteCustomer = await CustomerModel.findByIdAndDelete(req.body._id)
    res.json({ message: 'Customer deleted', data: deleteCustomer })
})

router.post('/update/customer/:id', async function (req, res) {
    let updateCustomer = await CustomerModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.json(updateCustomer)
})
router.get('/customer/ledger/:customerName', async function (req, res) {
    let customerName = req.params.customerName

    // customer — opening balance
    let customer = await CustomerModel.findOne({ customerName: customerName })
    let openingBalance = Number(customer?.PreviouseCreditsBalance) || 0

    // approved sales (debit)
    let sales = await SaleModel.find({
        customerName: customerName,
        status: "approved"
    })

    let payments = await SupplierPaymentsModel.find({
        fromCustomer: customerName,
        status: "approved"
    })

    let combined = []

    sales.forEach((sale) => {
        combined.push({
            date: sale.Date,
            description: `Invoice ${sale.invoiceNo || "-"}`,
            invoiceId: sale.invoiceNo || "",
            depositId: "",
            debit: Number(sale.grandTotal) || 0,
            credit: 0,
        })
    })

    payments.forEach((pay) => {
        combined.push({
            date: pay.date,
            description: ` ${(pay.allocations && [0]?.supplierName) || ""}${pay.remark ? "  " + pay.remark : ""}`,
            invoiceId: "",
            depositId: pay.voucherNo || "",
            debit: 0,
            credit: Number(pay.totalAmount) || 0,
        })
    })

    combined.sort((a, b) => new Date(a.date) - new Date(b.date))

    let runningBalance = openingBalance
    let entries = combined.map((item) => {
        runningBalance = runningBalance + item.debit - item.credit
        return { ...item, balance: runningBalance }
    })

    res.json({
        openingBalance: openingBalance,
        entries: entries,
        closingBalance: runningBalance,
    })
})
export default router