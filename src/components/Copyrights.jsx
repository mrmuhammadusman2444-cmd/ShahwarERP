import React from 'react'
import { Leaf, Copyright, Lock, Users, RefreshCw, Mail, X, Printer } from 'lucide-react'


const Copyrights = ({ setShowCopyright }) => {

    return (
        <div className="fixed inset-0 bg-black/45 flex items-center justify-center p-4 z-50">

            <style>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #copyright-print-area, #copyright-print-area * {
                        visibility: visible;
                    }
                    #copyright-print-area {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        padding: 0;
                    }
                    .copyright-print-header {
                        display: flex !important;
                    }
                    .no-print {
                        display: none !important;
                    }
                }
                .copyright-print-header {
                    display: none;
                }
            `}</style>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden max-w-xl w-full max-h-[80vh] flex flex-col">

                <div className="px-7 pt-6 pb-4.5 flex items-center gap-3.5 border-b border-slate-100 no-print">
                    <div className="w-11 h-11 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                        <Leaf className="w-5.5 h-5.5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                        <p className="text-[15px] font-medium text-slate-800">Shahwar Foods ERP</p>
                        <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">

                            <Copyright className="w-3 h-3" />
                            2026 Shahwar Foods. All rights reserved.
                        </p>
                    </div>
                    <button

                        aria-label="Close"
                        className="w-8 h-8 rounded-md flex items-center justify-center cursor-pointer text-slate-400 hover:bg-slate-50 transition-colors shrink-0"
                        onClick={() => setShowCopyright(false)}
                    >
                        <X className="w-4.5 h-4.5" />
                    </button>
                </div>

                <div className="overflow-y-auto flex-1">

                    <div id="copyright-print-area">

                        <div className="px-7 pt-5 pb-2">
                            <div className="copyright-print-header items-center gap-2.5 mb-4 px-7 pt-5">
                                <div>
                                    <p className="text-base font-medium text-slate-800">
                                        Shahwar Foods ERP
                                    </p>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        &copy; 2026 Shahwar Foods. All rights reserved.
                                    </p>
                                </div>
                            </div>
                            <p className="text-[13px] text-slate-500 leading-relaxed text-left">
                                Shahwar Foods is a leading name in the food production and
                                distribution industry, committed to delivering quality products
                                that reach every corner of the market through a strong network of
                                distributors, salesmen, and retail partners. This ERP system,
                                developed exclusively for Shahwar Foods, is designed to streamline
                                operations across sales, order management, warehouse handling,
                                distributor coordination, expense tracking, and stock monitoring,
                                enabling the company to run its business efficiently from a
                                single, centralized platform.
                            </p>
                        </div>

                        <div className="px-7 pt-4 pb-6">
                            <div className="bg-slate-50 rounded-lg p-4 flex flex-col gap-2.5">

                                <div className="flex gap-2.5 items-start">
                                    <Lock className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                                    <p className="text-[12.5px] text-slate-500 leading-relaxed">
                                        All software, source code, designs, logos, workflows, and
                                        content within this application are the intellectual property
                                        of Shahwar Foods and are protected under applicable copyright
                                        and intellectual property laws. Unauthorized reproduction,
                                        distribution, modification, reverse engineering, or commercial
                                        resale, in whole or in part, is strictly prohibited and may
                                        result in legal action.
                                    </p>
                                </div>

                                <div className="flex gap-2.5 items-start">
                                    <Users className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                                    <p className="text-[12.5px] text-slate-500 leading-relaxed">
                                        Access to this system is granted solely to authorized
                                        employees, distributors, and partners of Shahwar Foods for
                                        legitimate business purposes. Any data, reports, or analytics
                                        generated through this platform remain the exclusive property
                                        of Shahwar Foods and must not be shared with third parties
                                        without written consent.
                                    </p>
                                </div>

                                <div className="flex gap-2.5 items-start">
                                    <RefreshCw className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                                    <p className="text-[12.5px] text-slate-500 leading-relaxed">
                                        This software is provided as is, and while every effort has
                                        been made to ensure accuracy and reliability, Shahwar Foods
                                        reserves the right to update, modify, or discontinue any
                                        feature of this system at its discretion without prior notice.
                                    </p>

                                </div>

                            </div>
                        </div>

                        <div className="px-7 pb-5 pt-4 border-t border-slate-100 flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5 text-slate-400" />
                            <p className="text-xs text-slate-400">
                                For support, licensing, or permission requests, contact the
                                Shahwar Foods administration team.
                            </p>
                        </div>

                    </div>

                    <div className="px-7 pb-6 no-print">
                        <div onClick={() => window.print()} className='bg-slate-200 flex justify-center items-center cursor-pointer mt-2 ml-110 h-8 w-8 rounded-full'>
                            <Printer className='text-slate-600 ' />
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Copyrights