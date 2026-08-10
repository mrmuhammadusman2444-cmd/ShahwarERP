import { ClipboardList, Printer, ChevronDown } from 'lucide-react'
import { useEffect, useState, Fragment } from 'react'
import axios from 'axios'

const ProductPriceList = () => {
    const [fethProducts, setFetchProducts] = useState([])
    const [categoryFilter, setCategoryFilter] = useState('All')
    const [categoryOrder, setCategoryOrder] = useState([])

    useEffect(() => {
        async function handlFetchProducts() {
            let res = await axios.get('http://localhost:3000/find/product')
            console.log(res.data);
            setFetchProducts(res.data)

        }
        handlFetchProducts()
    }, [])
    useEffect(() => {
        async function fetchCategoryOrder() {
            let res = await axios.get('http://localhost:3000/find/category')
            setCategoryOrder(res.data.map(c => c.CategoryName))
        }
        fetchCategoryOrder()
    }, [])
    const categories = ['All', ...new Set(fethProducts.map((p) => p.productCategory || p.mainCategory).filter(Boolean))]

    const visibleProducts = categoryFilter === 'All'
        ? fethProducts
        : fethProducts.filter((p) => (p.productCategory || p.mainCategory) === categoryFilter)

    const grouped = visibleProducts.reduce((acc, p) => {
        const cat = p.mainCategory || 'Others'
        if (!acc[cat]) acc[cat] = []
        acc[cat].push(p)
        return acc
    }, {})
    function handlePrint() {
        const printContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Product Price List — Shahwar Foods</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Segoe UI', Arial, sans-serif; color: #1f2937; font-size: 12px; }

            .header {
                background: linear-gradient(135deg, #059669, #047857);
                color: white;
                padding: 20px 24px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .header h1 { font-size: 22px; font-weight: 800; letter-spacing: 0.5px; }
            .header p { font-size: 11px; opacity: 0.8; margin-top: 2px; }
            .header .meta { text-align: right; font-size: 11px; opacity: 0.85; }

            .title-bar {
                text-align: center;
                padding: 12px;
                background: #f0fdf4;
                border-bottom: 2px solid #bbf7d0;
                font-size: 16px;
                font-weight: 700;
                color: #065f46;
                letter-spacing: 0.3px;
            }

            table { width: 100%; border-collapse: collapse; }

            thead tr {
                background: linear-gradient(135deg, #059669, #047857);
                color: white;
            }
            thead th {
                padding: 9px 10px;
                font-size: 11px;
                font-weight: 700;
                text-align: left;
                white-space: nowrap;
                letter-spacing: 0.3px;
            }
            thead th:not(:first-child):not(:nth-child(2)):not(:nth-child(3)):not(:nth-child(4)) {
                text-align: right;
            }
            thead th:nth-child(4) { text-align: center; }

            .cat-row td {
                background: #d1fae5;
                color: #065f46;
                font-size: 11px;
                font-weight: 800;
                padding: 6px 10px;
                text-transform: uppercase;
                letter-spacing: 0.8px;
                border-top: 1px solid #a7f3d0;
                border-bottom: 1px solid #a7f3d0;
            }

            tbody tr { border-bottom: 1px solid #f0fdf4; }
            tbody tr:nth-child(even) { background: #f9fafb; }
            tbody tr:hover { background: #ecfdf5; }

            td { padding: 7px 10px; font-size: 11.5px; color: #374151; vertical-align: middle; }
            td:not(:first-child):not(:nth-child(2)):not(:nth-child(3)):not(:nth-child(4)) {
                text-align: right;
            }
            td:nth-child(4) { text-align: center; }

            .sno {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 22px;
                height: 22px;
                border-radius: 50%;
                background: #d1fae5;
                color: #065f46;
                font-size: 10px;
                font-weight: 700;
            }
            .code {
                font-family: monospace;
                background: #f3f4f6;
                border: 1px solid #e5e7eb;
                padding: 2px 6px;
                border-radius: 4px;
                font-size: 10px;
                color: #6b7280;
            }
            .product-name { font-weight: 600; color: #111827; }
            .cat-badge {
                display: inline-block;
                background: #d1fae5;
                color: #065f46;
                padding: 1px 6px;
                border-radius: 99px;
                font-size: 9.5px;
                font-weight: 500;
                margin-top: 2px;
            }
            .pack-badge {
                display: inline-block;
                background: #f3f4f6;
                color: #4b5563;
                padding: 2px 8px;
                border-radius: 99px;
                font-size: 10.5px;
                font-weight: 600;
            }
            .price-bold { font-weight: 700; color: #111827; font-size: 12px; }
            .cod-price {
                display: inline-block;
                background: #d1fae5;
                color: #065f46;
                padding: 2px 8px;
                border-radius: 6px;
                font-weight: 700;
                font-size: 11px;
            }

            .footer {
                margin-top: 16px;
                border-top: 2px solid #d1fae5;
                padding: 10px 16px;
                display: flex;
                justify-content: space-between;
                font-size: 10.5px;
                color: #6b7280;
                background: #f0fdf4;
            }
            .footer span { font-weight: 700; color: #374151; }

            @media print {
                body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                @page { margin: 10mm; size: A4 landscape; }
            }
        </style>
    </head>
    <body>
        <div class="header">
            <div>
                <h1>SHAHWAR FOODS</h1>
                <p>Distribution Management System • info@shahwarfoods.com</p>
            </div>
            <div class="meta">
                <div style="font-size:13px;font-weight:700;">PRODUCT PRICE LIST</div>
                <div>Date: ${new Date().toLocaleDateString('en-PK', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
                <div>Total Products: ${fethProducts.length}</div>
            </div>
        </div>

        <div class="title-bar">Shahwar Foods — Official Product Price List</div>

        <table>
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Code</th>
                    <th>Product Name</th>
                    <th>Pack</th>
                    <th>Distribution Price</th>
                    <th>Wholesale Price</th>
                    <th>Retail Price</th>
                    <th>COD / Online Price</th>
                </tr>
            </thead>
            <tbody>
                ${(() => {
                let rows = ''
                let sno = 0
                Object.keys(grouped).forEach((cat) => {
                    rows += `<tr class="cat-row"><td colspan="8">${cat}</td></tr>`
                    grouped[cat].forEach((p) => {
                        sno++
                        rows += `
                            <tr>
                                <td><span class="sno">${sno}</span></td>
                                <td><span class="code">${p.productCode || "—"}</span></td>
                                <td>
                                    <div class="product-name">${p.productName || '—'}</div>
                                    ${p.productCategory ? `<span class="cat-badge">${p.productCategory}</span>` : ''}
                                </td>
                                <td><span class="pack-badge">${p.cartonSize || '—'}</span></td>
                                <td>${p.distributorPrice ? `Rs ${Number(p.distributorPrice).toLocaleString()}` : '—'}</td>
                                <td>${p.wholesaleRate ? `Rs ${Number(p.wholesaleRate).toLocaleString()}` : '—'}</td>
                                <td class="price-bold">${p.retailPrice ? `Rs ${Number(p.retailPrice).toLocaleString()}` : '—'}</td>
                                <td><span class="cod-price">${p.codOnlinePrice ? `Rs ${Number(p.codOnlinePrice).toLocaleString()}` : '—'}</span></td>
                            </tr>`
                    })
                })
                return rows
            })()}
            </tbody>
        </table>

        <div class="footer">
            <div>Total Products: <span>${fethProducts.length}</span></div>
            <div>Printed: <span>${new Date().toLocaleString('en-PK')}</span></div>
            <div>www.shahwarfoods.com.pk</div>
        </div>
    </body>
    </html>`

        const win = window.open('', '_blank', 'width=1100,height=700')
        win.document.write(printContent)
        win.document.close()
        win.onload = () => {
            win.focus();
            win.print();

            setTimeout(() => {
                if (!win.closed) {
                    win.close();
                }
            }, 1000);
        };
    }
    let serial = 0
    return (
        <div className="min-h-screen bg-emerald-50/30 p-4 md:p-6">

            <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm px-5 py-4 mb-5 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-200 shrink-0">
                        <ClipboardList size={20} />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-zinc-800 leading-tight">Product Price List</h1>
                        <p className="text-xs text-zinc-400">Product Price List</p>
                    </div>
                </div>
                <button
                    onClick={handlePrint}
                    type="button"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-linear-to-br from-emerald-500 to-emerald-700 shadow-md shadow-emerald-200 hover:shadow-lg hover:shadow-emerald-300/60 active:scale-[0.98] transition-all cursor-pointer"
                >
                    <Printer size={15} /> Print
                </button>
            </div>

            {/* Table Card */}
            <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm overflow-hidden">

                <h2 className="text-center text-xl md:text-2xl font-bold text-emerald-700 py-5 border-b border-emerald-50">
                    Shahwar Foods Product Price List
                </h2>

                <div className="overflow-x-auto overflow-y-auto max-h-117.5 custom-table-scroll">
                    <table className="w-full text-sm border-collapse">
                        <thead className="sticky top-0 z-10 bg-linear-to-br from-emerald-500 to-emerald-700 shadow-[0_2px_6px_rgba(4,120,87,0.25)]">
                            <tr>
                                <th className="text-left text-[13px] font-bold text-white px-4 py-3.5 whitespace-nowrap">S.No</th>
                                <th className="text-left text-[13px] font-bold text-white px-4 py-3.5 whitespace-nowrap">Product Code</th>
                                <th className="text-left text-[13px] font-bold text-white px-4 py-3.5">Product Name</th>
                                <th className="text-center text-[13px] font-bold text-white px-4 py-3.5 whitespace-nowrap">Pack</th>
                                <th className="text-right text-[13px] font-bold text-white px-4 py-3.5 whitespace-nowrap">Distribution Price</th>
                                <th className="text-right text-[13px] font-bold text-white px-4 py-3.5 whitespace-nowrap">Whole Sale Price</th>
                                <th className="text-right text-[13px] font-bold text-white px-4 py-3.5 whitespace-nowrap">Retail Price</th>
                                <th className="text-right text-[13px] font-bold text-white px-4 py-3.5 whitespace-nowrap">COD Price/Online Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleProducts.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="text-center py-14">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-14 h-14 rounded-2xl bg-emerald-50 ring-1 ring-emerald-100 flex items-center justify-center mb-1">
                                                <ClipboardList size={24} className="text-emerald-400" />
                                            </div>
                                            <p className="text-zinc-500 text-sm font-medium">No products found</p>
                                            <p className="text-zinc-400 text-xs">Add products to see them here</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                Object.keys(grouped)
                                    .sort((a, b) => {
                                        let ia = categoryOrder.indexOf(a)
                                        let ib = categoryOrder.indexOf(b)
                                        if (ia === -1) return 1
                                        if (ib === -1) return -1
                                        return ia - ib
                                    })
                                    .map((cat) => (<Fragment key={cat}>
                                        <tr className="bg-emerald-100/70">
                                            <td colSpan={8} className="px-4 py-2 text-[12px] font-bold text-emerald-800 uppercase tracking-wide">
                                                {cat}
                                            </td>
                                        </tr>
                                        {grouped[cat].map((p) => {
                                            serial += 1
                                            const rowNum = serial
                                            return (
                                                <tr
                                                    key={p._id || rowNum}
                                                    className={`group border-b border-zinc-100 transition-colors hover:bg-emerald-50/60 ${rowNum % 2 === 0 ? "bg-zinc-50/50" : "bg-white"}`}
                                                >
                                                    <td className="px-4 py-3">
                                                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold tabular-nums group-hover:bg-emerald-100 transition-colors">
                                                            {rowNum}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <span className="inline-block px-2 py-1 rounded-md bg-zinc-50 border border-zinc-200 text-zinc-500 text-[11px] font-mono">
                                                            {p.productCode || "—"}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <p className="text-zinc-800 text-[13px] font-semibold leading-tight">{p.productName || "—"}</p>
                                                        {p.productCategory && (
                                                            <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-medium">
                                                                {p.productCategory}
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-3 text-center">
                                                        <span className="inline-block px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600 text-xs font-semibold tabular-nums">
                                                            {p.cartonSize || "—"}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 text-right text-zinc-600 text-xs font-medium tabular-nums">
                                                        {p.distributorPrice ? `Rs ${Number(p.distributorPrice).toLocaleString()}` : "—"}
                                                    </td>
                                                    <td className="px-4 py-3 text-right text-zinc-600 text-xs font-medium tabular-nums">
                                                        {p.wholesaleRate ? `Rs ${Number(p.wholesaleRate).toLocaleString()}` : "—"}
                                                    </td>
                                                    <td className="px-4 py-3 text-right text-zinc-800 text-[13px] font-bold tabular-nums">
                                                        {p.retailPrice ? `Rs ${Number(p.retailPrice).toLocaleString()}` : "—"}
                                                    </td>
                                                    <td className="px-4 py-3 text-right">
                                                        <span className="inline-block px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold tabular-nums">
                                                            {p.codOnlinePrice ? `Rs ${Number(p.codOnlinePrice).toLocaleString()}` : "—"}
                                                        </span>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </Fragment>
                                    ))
                            )}
                        </tbody>
                    </table>

                    <style>{`
        .custom-table-scroll::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-table-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-table-scroll::-webkit-scrollbar-thumb { background: #bbf7d0; border-radius: 99px; }
        .custom-table-scroll::-webkit-scrollbar-thumb:hover { background: #86efac; }
    `}</style>
                </div>

                <div className="px-5 py-3 border-t border-emerald-50 bg-emerald-50/30 flex items-center justify-between">
                    <p className="text-xs text-zinc-400">
                        Total Products: <span className="font-semibold text-zinc-600">{fethProducts.length}</span>
                    </p>
                    <p className="text-xs text-zinc-400">
                        Categories: <span className="font-semibold text-zinc-600">0</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ProductPriceList