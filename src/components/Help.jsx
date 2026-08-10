import { useState } from "react";
import {
    X, Search, BookOpen, MessageCircle, Mail, Phone, FileText, ChevronRight, LifeBuoy, Send, ExternalLink, Clock,
} from "lucide-react";

const faqs = [
    {
        q: "How do I update an invoice's payment status?",
        a: "Go to Sales > Invoices, open the invoice, click 'Mark as paid', select a payment method, and confirm.",
    },
    {
        q: "How do I make a stock adjustment?",
        a: "Go to Inventory > Stock adjustments, click 'New adjustment', select the item and quantity, enter a reason, and save.",
    },
    {
        q: "How do I manage user roles and permissions?",
        a: "Go to Settings > Users & roles to create a new role or edit the permissions of an existing role.",
    },
    {
        q: "How do I export reports (PDF / Excel)?",
        a: "On any report screen, use the 'Export' button in the top-right corner to choose PDF or Excel format.",
    },
];

const quickLinks = [
    { label: "Getting started guide", icon: BookOpen },
    { label: "Keyboard shortcuts", icon: FileText },
    { label: "Release notes", icon: ExternalLink },
];

export default function HelpSupportModal({ open = true, setShowHelp }) {
    const [query, setQuery] = useState("");
    const [openFaq, setOpenFaq] = useState(0);
    const [tab, setTab] = useState("help");

    if (!open) return null;

    const filteredFaqs = faqs.filter((f) =>
        f.q.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm p-4">
            <div className="w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200 flex flex-col">
                {/* Header */}
                <div className="relative bg-linear-to-br from-indigo-600 via-indigo-600 to-violet-600 px-6 pt-6 pb-8 text-white">
                    <button
                        onClick={() => { setShowHelp(false) }}
                        aria-label="Close"
                        className="absolute right-4 top-4 cursor-pointer rounded-full p-1.5 text-white/80 transition hover:bg-white/10 hover:text-white"
                    >
                        <X size={18} />
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                            <LifeBuoy size={22} />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold leading-tight">
                                Help &amp; support
                            </h2>
                            <p className="text-sm text-indigo-100">
                                We're here to help you
                            </p>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="mt-5 relative">
                        <Search
                            size={18}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-200"
                        />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search for your question..."
                            className="w-full rounded-xl bg-white/10 py-3 pl-11 pr-4 text-sm text-white placeholder-indigo-200 outline-none ring-1 ring-white/20 transition focus:bg-white/20 focus:ring-white/40"
                        />
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 border-b border-slate-100 px-6 pt-3">
                    {[
                        { id: "help", label: "Help center" },
                        { id: "contact", label: "Contact us" },
                    ].map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setTab(t.id)}
                            className={`relative px-3 pb-3  text-sm cursor-pointer font-medium transition ${tab === t.id
                                ? "text-indigo-600"
                                : "text-slate-500 hover:text-slate-700"
                                }`}
                        >
                            {t.label}
                            {tab === t.id && (
                                <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-indigo-600" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-6 py-5">
                    {tab === "help" ? (
                        <div className="space-y-6">
                            {/* Quick links */}
                            <div>
                                <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Quick links
                                </h3>
                                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                                    {quickLinks.map(({ label, icon: Icon }) => (
                                        <button
                                            key={label}
                                            className="flex items-center gap-2.5 cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-left text-sm text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                                        >
                                            <Icon size={17} className="shrink-0 text-indigo-500" />
                                            <span className="font-medium">{label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* FAQs */}
                            <div>
                                <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Frequently asked questions
                                </h3>
                                <div className="space-y-2">
                                    {filteredFaqs.length === 0 && (
                                        <p className="rounded-xl bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
                                            No results found. Contact us below.
                                        </p>
                                    )}
                                    {filteredFaqs.map((faq, i) => {
                                        const isOpen = openFaq === i;
                                        return (
                                            <div
                                                key={faq.q}
                                                className="overflow-hidden  rounded-xl border border-slate-200"
                                            >
                                                <button
                                                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                                                    className="flex w-full items-center cursor-pointer  justify-between gap-3 px-4 py-3 text-left text-sm font-medium text-slate-800 transition hover:bg-slate-50"
                                                >
                                                    {faq.q}
                                                    <ChevronRight
                                                        size={16}
                                                        className={`shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-90" : ""
                                                            }`}
                                                    />
                                                </button>
                                                {isOpen && (
                                                    <div className="px-4 pb-4 text-sm leading-relaxed text-slate-600">
                                                        {faq.a}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* Status banner */}
                            <div className="flex items-center gap-2.5 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700 ring-1 ring-emerald-100">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                                </span>
                                Support team is online &mdash; average reply time 5 minutes
                            </div>

                            {/* Contact options */}
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                <a className="group flex flex-col gap-2 rounded-xl border border-slate-200 p-4 transition hover:border-indigo-200 hover:bg-indigo-50/50">
                                    <MessageCircle size={20} className="text-indigo-500" />
                                    <div>
                                        <p className="text-sm font-medium text-slate-800">
                                            Live chat
                                        </p>
                                        <p className="text-xs text-slate-500">Chat with us instantly</p>
                                    </div>
                                </a>
                                <a className="group flex flex-col gap-2 rounded-xl border border-slate-200 p-4 transition hover:border-indigo-200 hover:bg-indigo-50/50">
                                    <Mail size={20} className="text-indigo-500" />
                                    <div>
                                        <p className="text-sm font-medium text-slate-800">Email</p>
                                        <p className="text-xs text-slate-500">support@example.com</p>
                                    </div>
                                </a>
                                <a className="group flex flex-col gap-2 rounded-xl border border-slate-200 p-4 transition hover:border-indigo-200 hover:bg-indigo-50/50">
                                    <Phone size={20} className="text-indigo-500" />
                                    <div>
                                        <p className="text-sm font-medium text-slate-800">Phone</p>
                                        <p className="text-xs text-slate-500">+92 51 1234 5678</p>
                                    </div>
                                </a>
                            </div>

                            {/* Ticket form */}
                            <div className="rounded-xl border border-slate-200 p-4">
                                <p className="mb-3 text-sm font-medium text-slate-800">
                                    Create a new ticket
                                </p>
                                <div className="space-y-3">
                                    <select className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100">
                                        <option>Select a category</option>
                                        <option>Billing &amp; invoices</option>
                                        <option>Inventory</option>
                                        <option>User access</option>
                                        <option>Reports</option>
                                        <option>Other</option>
                                    </select>
                                    <textarea
                                        rows={3}
                                        placeholder="Describe your issue in detail..."
                                        className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none placeholder-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                    />
                                    <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700">
                                        <Send size={15} />
                                        Submit ticket
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-slate-100 px-6 py-3.5 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                        <Clock size={13} />
                        Office hours: Mon&ndash;Sat, 9am&ndash;6pm PKT
                    </span>
                </div>
            </div>
        </div>
    );
}