import { useEffect, useState, Fragment } from 'react'
import axios from 'axios'
import { ClipboardList, Printer, ChevronDown, Hash, Tag, Layers, Truck, Store, ShoppingBag, CreditCard, Package } from "lucide-react"

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
        <div className="min-h-screen bg-emerald-50/40 p-3 md:p-5 bg-[radial-gradient(circle,#05966915_1px,transparent_1px)] bg-size-[18px_18px]">

            <div className="bg-white rounded-xl border border-emerald-100 shadow-sm shadow-emerald-900/5 px-4 py-3 mb-4 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2.5">
                    <div className="relative w-9 h-9 rounded-lg bg-linear-to-br from-emerald-500 to-emerald-800 flex items-center justify-center text-white shadow-sm shadow-emerald-300 shrink-0 ring-1 ring-white/20">
                        <ClipboardList size={17} />
                    </div>
                    <div>
                        <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-[0.18em] leading-none mb-0.5">Price List</p>
                        <h1 className="text-[15px] font-bold text-zinc-800 leading-tight font-serif ">Shahwar Foods</h1>
                    </div>
                </div>
                <button
                    onClick={handlePrint}
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-linear-to-br from-emerald-500 to-emerald-700 shadow-sm shadow-emerald-200 hover:shadow-md hover:shadow-emerald-300/60 active:scale-[0.98] transition-all cursor-pointer"
                >
                    <Printer size={13} /> Print
                </button>
            </div>

            {/* Table Card */}
            <div className="bg-white rounded-xl border border-emerald-100 shadow-sm shadow-emerald-900/5 overflow-hidden">

                <div className="text-center pt-4 pb-2">
                    <h2 className="text-base md:text-lg font-bold text-emerald-800 tracking-tight font-serif">
                        Shahwar Foods <span className=" font-normal text-emerald-600">Product Price List</span>
                    </h2>
                    <p className="text-[10px] text-zinc-400 tracking-wide mt-0.5">Distribution &middot; Wholesale &middot; Retail &middot; COD Rates</p>
                </div>

                {/* Perforated ticket divider */}
                <div className="relative flex items-center justify-center py-2">
                    <div className="absolute inset-x-6 border-t border-dashed border-emerald-200"></div>
                    <span className="relative bg-white px-3 text-[9px] tracking-[0.25em] text-emerald-400 font-bold uppercase">&#9670; Rate Card &#9670;</span>
                </div>

                <div className="overflow-x-auto overflow-y-auto max-h-117.5 custom-table-scroll">
                    <table className="w-full text-sm border-collapse">
                        <thead className="sticky top-0 z-10 bg-linear-to-br from-emerald-600 to-emerald-800 shadow-[0_2px_6px_rgba(4,120,87,0.25)] backdrop-blur">
                            <tr>
                                <th className="text-left text-[10.5px] font-bold text-white px-3 py-2.5 whitespace-nowrap"><span className="inline-flex items-center gap-1"><Hash size={11} /> S.No</span></th>
                                <th className="text-left text-[10.5px] font-bold text-white px-3 py-2.5 whitespace-nowrap"><span className="inline-flex items-center gap-1"><Tag size={11} /> Code</span></th>
                                <th className="text-left text-[10.5px] font-bold text-white px-3 py-2.5">Product Name</th>
                                <th className="text-center text-[10.5px] font-bold text-white px-3 py-2.5 whitespace-nowrap"><span className="inline-flex items-center gap-1"><Layers size={11} /> Pack</span></th>
                                <th className="text-right text-[10.5px] font-bold text-white px-3 py-2.5 whitespace-nowrap"><span className="inline-flex items-center justify-end gap-1"><Truck size={11} /> Distribution</span></th>
                                <th className="text-right text-[10.5px] font-bold text-white px-3 py-2.5 whitespace-nowrap"><span className="inline-flex items-center justify-end gap-1"><Store size={11} /> Wholesale</span></th>
                                <th className="text-right text-[10.5px] font-bold text-white px-3 py-2.5 whitespace-nowrap"><span className="inline-flex items-center justify-end gap-1"><ShoppingBag size={11} /> Retail</span></th>
                                <th className="text-right text-[10.5px] font-bold text-white px-3 py-2.5 whitespace-nowrap"><span className="inline-flex items-center justify-end gap-1"><CreditCard size={11} /> COD / Online</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleProducts.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="text-center py-12">
                                        <div className="flex flex-col items-center gap-1.5">
                                            <div className="w-12 h-12 rounded-xl bg-emerald-50 ring-1 ring-emerald-100 border border-dashed border-emerald-200 flex items-center justify-center mb-1">
                                                <ClipboardList size={20} className="text-emerald-400" />
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
                                        <tr className="bg-emerald-50 border-y border-emerald-100">
                                            <td colSpan={8} className="px-3 py-1.5">
                                                <span className="inline-flex items-center gap-1.5 text-[10.5px] font-bold text-emerald-800 uppercase tracking-wide">
                                                    <Package size={11} className="text-emerald-500" /> {cat}
                                                    <span className="text-emerald-400 font-medium normal-case tracking-normal">&middot; {grouped[cat].length} items</span>
                                                </span>
                                            </td>
                                        </tr>
                                        {grouped[cat].map((p) => {
                                            serial += 1
                                            const rowNum = serial
                                            return (
                                                <tr
                                                    key={p._id || rowNum}
                                                    className={`group border-b border-zinc-100 border-l-2 border-l-transparent hover:border-l-emerald-400 transition-colors hover:bg-emerald-50/60 ${rowNum % 2 === 0 ? "bg-zinc-50/50" : "bg-white"}`}
                                                >
                                                    <td className="px-3 py-2">
                                                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold font-mono tabular-nums group-hover:bg-emerald-100 transition-colors">
                                                            {rowNum}
                                                        </span>
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        <span className="inline-block px-1.5 py-0.5 rounded-md bg-zinc-50 border border-zinc-200 text-zinc-500 text-[10px] font-mono">
                                                            {p.productCode || "—"}
                                                        </span>
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        <p className="text-zinc-800 text-[12.5px] font-semibold leading-tight">{p.productName || "—"}</p>
                                                        {p.productCategory && (
                                                            <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[9px] font-medium">
                                                                {p.productCategory}
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-3 py-2 text-center">
                                                        <span className="inline-block px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 text-[11px] font-semibold font-mono tabular-nums">
                                                            {p.cartonSize || "—"}
                                                        </span>
                                                    </td>
                                                    <td className="px-3 py-2 text-right border-l border-zinc-50 text-zinc-600 text-[11px] font-medium font-mono tabular-nums">
                                                        {p.distributorPrice ? `Rs ${Number(p.distributorPrice).toLocaleString()}` : "—"}
                                                    </td>
                                                    <td className="px-3 py-2 text-right border-l border-zinc-50 text-zinc-600 text-[11px] font-medium font-mono tabular-nums">
                                                        {p.wholesaleRate ? `Rs ${Number(p.wholesaleRate).toLocaleString()}` : "—"}
                                                    </td>
                                                    <td className="px-3 py-2 text-right border-l border-zinc-50">
                                                        <span className="text-zinc-800 text-[12.5px] font-bold font-mono tabular-nums border-b-2 border-amber-400/70 pb-0.5">
                                                            {p.retailPrice ? `Rs ${Number(p.retailPrice).toLocaleString()}` : "—"}
                                                        </span>
                                                    </td>
                                                    <td className="px-3 py-2 text-right border-l border-zinc-50">
                                                        <span className="inline-block px-2 py-0.5 rounded-lg bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-[11px] font-bold font-mono tabular-nums">
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
    .custom-table-scroll tbody tr { animation: rowFadeIn 0.35s ease both; }
    @keyframes rowFadeIn { from { opacity: 0; transform: translateY(3px); } to { opacity: 1; transform: translateY(0); } }
    @media (prefers-reduced-motion: reduce) {
        .custom-table-scroll tbody tr { animation: none; }
    }
`}</style>
                </div>

                <div className="px-4 py-2.5 border-t border-emerald-50 bg-emerald-50/30 flex items-center justify-between">
                    <p className="text-[11px] text-zinc-400 flex items-center gap-1.5">
                        <Package size={12} className="text-emerald-500" />
                        Total Products: <span className="font-semibold text-zinc-600 font-mono">{fethProducts.length}</span>
                    </p>
                    <p className="text-[11px] text-zinc-400 flex items-center gap-1.5">
                        <Layers size={12} className="text-emerald-500" />
                        Categories: <span className="font-semibold text-zinc-600 font-mono">0</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ProductPriceList