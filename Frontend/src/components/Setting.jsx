import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Loader2, Search, ShieldCheck, ChevronDown, Users, Coins, Package, Receipt, Bell, Palette, Sun, Moon, Monitor, Download, Database, FileSpreadsheet, HardDriveDownload, Check, X, Crown, Calculator, Wallet, CalendarCheck, Boxes } from "lucide-react";


const NAV_ITEMS = [
  { id: "general", label: "General", icon: Building2 },
  { id: "users", label: "Users & Roles", icon: Users },
  { id: "finance", label: "Finance", icon: Coins },
  { id: "inventory", label: "Inventory", icon: Package },
  { id: "tax", label: "Tax", icon: Receipt },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "backup", label: "Backup", icon: Database },
];

const ACCENT_COLORS = [
  "#059669", // Emerald (default)
  "#0d9488", // Teal
  "#0891b2", // Cyan
  "#2563eb", // Blue
  "#4f46e5", // Indigo
  "#7c3aed", // Violet
  "#9333ea", // Purple
  "#db2777", // Pink
  "#e11d48", // Rose
  "#dc2626", // Red
  "#ea580c", // Orange
  "#d97706", // Amber
  "#475569", // Slate
];

function Card({ title, children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4">
      {title && (
        <p className="text-sm font-medium text-gray-800 mb-4">{title}</p>
      )}
      {children}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-gray-500">{label}</label>
      {children}
    </div>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
    />
  );
}

function Select({ children, ...props }) {
  return (
    <select
      {...props}
      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
    >
      {children}
    </select>
  );
}

function Checkbox({ label, defaultChecked }) {
  const [checked, setChecked] = useState(defaultChecked ?? false);
  return (
    <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
        className="w-4 h-4 accent-emerald-600 cursor-pointer"
      />
      {label}
    </label>
  );
}

function Radio({ label, name, defaultChecked }) {
  return (
    <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
      <input
        type="radio"
        name={name}
        defaultChecked={defaultChecked}
        className="w-4 h-4 accent-emerald-600 cursor-pointer"
      />
      {label}
    </label>
  );
}

function SaveButton() {
  const [saved, setSaved] = useState(false);
  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }
  return (
    <button
      onClick={handleSave}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 ${saved
        ? "bg-green-50 text-green-700 border border-green-200"
        : "bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95"
        }`}
    >
      {saved && <Check size={14} />}
      {saved ? "Saved!" : "Save changes"}
    </button>
  );
}


function GeneralSection() {
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-1">General settings</h2>
      <p className="text-sm text-gray-500 mb-5">Company info aur basic configuration</p>

      <Card title="Company information">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Company name">
            <Input type="text" defaultValue="Hafiz Foods Pvt. Ltd." />
          </Field>
          <Field label="Business type">
            <Select>
              <option>Food & Beverages</option>
              <option>Manufacturing</option>
              <option>Distribution</option>
            </Select>
          </Field>
          <Field label="Phone">
            <Input type="text" defaultValue="+92 300 0000000" />
          </Field>
          <Field label="Email">
            <Input type="email" defaultValue="info@hafizfoods.pk" />
          </Field>
          <div className="col-span-2">
            <Field label="Address">
              <textarea
                defaultValue="Lahore, Punjab, Pakistan"
                rows={2}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </Field>
          </div>
        </div>
      </Card>

      <Card title="Regional settings">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Currency">
            <Select>
              <option>PKR — Pakistani Rupee</option>
              <option>USD — US Dollar</option>
              <option>AED — UAE Dirham</option>
            </Select>
          </Field>
          <Field label="Date format">
            <Select>
              <option>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
              <option>YYYY-MM-DD</option>
            </Select>
          </Field>
          <Field label="Language">
            <Select>
              <option>English</option>
              <option>Urdu</option>
            </Select>
          </Field>
          <Field label="Time zone">
            <Select>
              <option>Asia/Karachi (UTC+5)</option>
              <option>Asia/Dubai (UTC+4)</option>
            </Select>
          </Field>
        </div>
      </Card>

      <SaveButton />
    </div>
  );
}

const MODULES = [
  { key: "dashboard", label: "Dashboard", subs: [] },
  { key: "analytics", label: "Analytics", subs: [] },
  {
    key: "customers", label: "Customers", actions: ["view", "update", "delete"], subs: [
      { key: "newCustomer", label: "New Customers" },
      { key: "manageCustomer", label: "Manage Customers" },
      { key: "manageFactoryCustomer", label: "Manage Factory Customers" },
      { key: "customerLedger", label: "Customers Ledger" },
      { key: "customerAdvance", label: "Customers Advance" },
    ]
  },
  {
    key: "orders", label: "Orders", subs: [
      { key: "newOrders", label: "New Orders" },
      { key: "manageOrders", label: "Manage Orders" },
      { key: "ordersReports", label: "Orders Reports" },
      { key: "dispatchOrders", label: "Dispatch Orders" },
    ]
  },
  {
    key: "sales", label: "Sales", actions: ["gatePass", "download", "update", "delete"], subs: [
      { key: "newSales", label: "New Sales" },
      { key: "manageSales", label: "Manage Sales" },
    ]
  },
  {
    key: "approval", label: "Approval", subs: [
      { key: "invoiceApproval", label: "Invoice Approval" },
      { key: "purchaseApproval", label: "Purchase Approval" },
      { key: "customerPaymentApproval", label: "Customer Payment Approval" },
      { key: "supplierPaymentApproval", label: "Supplier Payment Approval" },
    ]
  },
  {
    key: "products", label: "Products", actions: ["update", "delete"], subs: [
      { key: "newProducts", label: "New Products" },
      { key: "manageProducts", label: "Manage Products" },
      { key: "category", label: "Category" },
      { key: "unit", label: "Unit" },
      { key: "schemeProducts", label: "Scheme Products" },
      { key: "productsPriceList", label: "Products Price List" },
    ]
  },
  {
    key: "suppliers", label: "Suppliers", actions: ["view", "update", "delete"], subs: [
      { key: "addNewSuppliers", label: "Add New Suppliers" },
      { key: "manageSuppliers", label: "Manage Suppliers" },
      { key: "suppliersLedger", label: "Suppliers Ledger" },
      { key: "suppliersAdvance", label: "Suppliers Advance" },
    ]
  },
  {
    key: "purchase", label: "Purchase", actions: ["download", "update", "delete"], subs: [
      { key: "addPurchase", label: "Add Purchase" },
      { key: "managePurchase", label: "Manage Purchase" },
      { key: "addPurchaseOrder", label: "Add Purchase Order" },
      { key: "managePurchaseOrder", label: "Manage Purchase Order" },
    ]
  },
  {
    key: "warehouseFinishProduct", label: "Warehouse Finish Product", subs: [
      { key: "newFinishProduct", label: "New Finish Product" },
      { key: "manageFinishProduct", label: "Manage Finish Product" },
      { key: "finishProductStock", label: "Finish Product Stock" },
    ]
  },
  {
    key: "stock", label: "Stock", subs: [
      { key: "finishStock", label: "Finish Stock" },
      { key: "rawMaterialStock", label: "Raw Material Stock" },
      { key: "reelStock", label: "Reel Stock" },
      { key: "beverageStock", label: "Beverage Stock" },
      { key: "teaStock", label: "Tea Stock" },
      { key: "rawPackingStock", label: "Raw Packing Stock" },
      { key: "outOfStock", label: "Out of Stock" },
      { key: "assignUserToStock", label: "Assign User to Stock" },
    ]
  },
  {
    key: "warehouseWiseSale", label: "Warehouse Wise Sale", subs: [
      { key: "newStock", label: "New Stock" },
      { key: "manageStock", label: "Manage Stock" },
      { key: "newSale", label: "New Sale" },
      { key: "manageWarehouseSale", label: "Manage Warehouse Sale" },
      { key: "warehouseStock", label: "Warehouse Stock" },
    ]
  },
  {
    key: "schemeReport", label: "Scheme Report", subs: [
      { key: "schemeReport", label: "Scheme Report" },
      { key: "warehouseReport", label: "Warehouse Report" },
    ]
  },
  {
    key: "return", label: "Return", subs: [
      { key: "return", label: "Return" },
      { key: "manageReturn", label: "Manage Return" },
    ]
  },
  {
    key: "distributorOrder", label: "Distributor Order", subs: [
      { key: "manageHafizOrders", label: "Manage Hafiz Order" },
    ]
  },
  {
    key: "report", label: "Report", subs: [
      { key: "todayCustomerReport", label: "Today Customer Report" },
      { key: "userWiseReceiptReport", label: "User Wise Receipt Report" },
      { key: "supplierReceipt", label: "Supplier Receipt" },
      { key: "saleReport", label: "Sale Report" },
      { key: "saleReportProductWise", label: "Sale Report (Product Wise)" },
    ]
  },
  {
    key: "accounts", label: "Accounts", subs: [
      { key: "supplierPayment", label: "Supplier Payment" },
      { key: "supplierTallyLedger", label: "Supplier Tally Ledger" },
      { key: "customerTallyLedger", label: "Customer Tally Ledger" },
      { key: "customerRecieve", label: "Customer Receive" },
      { key: "assetsPayment", label: "Assets Payment" },
      { key: "fundTransfer", label: "Fund Transfer" },
      { key: "cashAdjustment", label: "Cash Adjustment" },
      { key: "reports", label: "Reports" },
    ]
  },
  {
    key: "bank", label: "Bank", subs: [
      { key: "addNew", label: "Add New" },
      { key: "addNewTransaction", label: "Add New Transaction" },
      { key: "manageBank", label: "Manage Bank" },
      { key: "bankLedger", label: "Bank Ledger" },
    ]
  },
  {
    key: "salary", label: "Salary", subs: [
      { key: "addEmployee", label: "Add Employee" },
      { key: "manageEmployee", label: "Manage Employee" },
      { key: "manageEmployeeSalary", label: "Manage Employee Salary" },
      { key: "attendance", label: "Attendance" },
      { key: "attendanceReport", label: "Attendance Report" },
      { key: "employeeSalary", label: "Employee Salary" },
    ]
  },
  {
    key: "assets", label: "Assets", subs: [
      { key: "addAssets", label: "Add Assets" },
      { key: "manageAssets", label: "Manage Assets" },
      { key: "assetsLedger", label: "Assets Ledger" },
    ]
  },
];

const ROLES = [
  { name: "Admin", icon: Crown },
  { name: "Accountant", icon: Calculator },
  { name: "Cash & Expense", icon: Wallet },
  { name: "Raw Material", icon: Package },
  { name: "Stock Manager", icon: Boxes },
];
const ACTIONS = ["view", "create", "update", "delete"];

// ---- Reusable toggle switch (advance) ----
function Toggle({ on, onChange, size = "md" }) {
  const isSm = size === "sm";
  return (
    <button
      type="button"
      onClick={onChange}
      style={{ backgroundColor: on ? "var(--accent)" : "#d1d5db" }}
      className={`relative rounded-full transition-colors duration-300 cursor-pointer shrink-0 ${isSm ? "w-9 h-5" : "w-11 h-6"}`}
    >
      <span
        className={`absolute top-1/2 bg-white rounded-full shadow-sm transition-all duration-300 ${isSm ? "w-3.5 h-3.5" : "w-4.5 h-4.5"}`}
        style={{
          left: on ? "calc(100% - 2px)" : "2px",
          transform: on ? "translate(-100%, -50%)" : "translate(0, -50%)",
        }}
      />
    </button>
  );
}

function UsersSection() {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [role, setRole] = useState("");
  const [permissions, setPermissions] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState("");
  const [dirty, setDirty] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [roleOpen, setRoleOpen] = useState(false);
  async function loadUsers() {
    try {
      let res = await axios.get("http://localhost:3000/all/users");
      setUsers(res.data);
    } catch (err) {
      console.log("LOAD USERS FAILED:", err.response?.data || err.message);
    }
  }

  useEffect(() => { loadUsers(); }, []);

  function openUser(user) {
    if (dirty) {
      setConfirmAction({
        message: "You have unsaved changes. Discard them and switch user?",
        onConfirm: () => {
          setSelected(user);
          setRole(user.role || "Stock Manager");
          setPermissions(user.permissions || {});
          setExpanded(null);
          setDirty(false);
          setConfirmAction(null);
        }
      });
      return;
    }
    setSelected(user);
    setRole(user.role || "Stock Manager");
    setPermissions(user.permissions || {});
    setExpanded(null);
    setDirty(false);
  }

  function toggleAction(mKey, action) {
    setDirty(true);
    setPermissions((prev) => {
      let mod = prev[mKey] || {};
      return { ...prev, [mKey]: { ...mod, [action]: !mod[action] } };
    });
  }

  function toggleSub(mKey, subKey) {
    setDirty(true);
    setPermissions((prev) => {
      let mod = prev[mKey] || {};
      let subs = mod.subMenus || {};
      return { ...prev, [mKey]: { ...mod, subMenus: { ...subs, [subKey]: !subs[subKey] } } };
    });
  }

  function toggleModule(mod, value) {
    setDirty(true);
    setPermissions((prev) => {
      let subMenus = {};
      mod.subs.forEach((s) => { subMenus[s.key] = value; });
      let actionsObj = {};
      (mod.actions || ACTIONS).forEach((a) => { actionsObj[a] = value; });
      return { ...prev, [mod.key]: { ...actionsObj, subMenus } };
    });
  }

  function isModuleAllOn(mod) {
    const mp = permissions[mod.key] || {};
    const acts = mod.actions || ACTIONS;
    const actionsOn = acts.every((a) => mp[a]);
    const subsOn = mod.subs.length === 0 || mod.subs.every((s) => mp.subMenus?.[s.key]);
    return actionsOn && subsOn;
  }

  async function handleSave() {
    if (!selected) return;
    setSaving(true);
    const minDelay = new Promise(r => setTimeout(r, 1500));
    try {
      await axios.put(`http://localhost:3000/update/user/permissions/${selected._id}`, { role, permissions });
      await loadUsers();
      await minDelay;
      setDirty(false);
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      console.log("SAVE FAILED:", err.response?.data || err.message);
      setSaving(false);
    }
  }

  const filteredModules = MODULES.filter((m) =>
    m.label.toLowerCase().includes(search.toLowerCase())
  );


  if (!selected) {
    return (
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-1">Users & Roles</h2>
        <p className="text-sm text-gray-500 mb-5">Access control aur permissions manage karo</p>

        <div
          style={document.documentElement.classList.contains('dark') ? { backgroundColor: '#161618', borderColor: '#2a2a2e' } : undefined}
          className="bg-white border border-gray-200 rounded-xl overflow-hidden"
        >
          <div
            style={document.documentElement.classList.contains('dark') ? { backgroundColor: '#19191a', borderColor: '#2a2a2e' } : undefined}
            className="px-4 py-3 bg-gray-50/60"
          >
            <p className="text-sm font-medium text-gray-700">All Users <span className="text-emerald-600">({users.length})</span></p>
          </div>
          <div className="max-h-100 overflow-y-auto">
            {users.length === 0 ? (
              <p className="text-center text-gray-400 text-sm py-8">No users found</p>
            ) : (
              users.map((u, idx) => (
                <button
                  key={u._id}
                  onClick={() => openUser(u)}
                  style={document.documentElement.classList.contains('dark') && idx !== 0 ? { borderTop: '1px solid #232327' } : (idx !== 0 ? { borderTop: '1px solid #f9fafb' } : undefined)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = document.documentElement.classList.contains('dark')
                      ? 'rgba(255,255,255,0.05)'
                      : 'rgba(16,185,129,0.08)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left cursor-pointer transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-linear-to-br from-emerald-400 to-emerald-600 text-white text-sm font-bold flex items-center justify-center shrink-0">
                    {(u.firstName || "?").charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-800 truncate">{u.firstName} {u.lastName}</p>
                    <p className="text-xs text-gray-400 truncate">{u.email}</p>
                  </div>
                  <span className={`text-[10px] font-semibold rounded-full px-2.5 py-1 shrink-0 ${u.role === "Admin" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
                    {u.role || "—"}
                  </span>
                  <ChevronDown size={15} className="text-gray-300 -rotate-90 shrink-0" />
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => {
          if (dirty) {
            setConfirmAction({
              message: "You have unsaved changes. Discard them?",
              onConfirm: () => { setSelected(null); setDirty(false); setConfirmAction(null); }
            });
            return;
          }
          setSelected(null);
          setDirty(false);
        }}
        className="text-xs text-gray-500 hover:text-emerald-600 cursor-pointer mb-3 flex items-center gap-1"
      >
        ← Back to all users
      </button>

      <div className="bg-linear-to-r from-emerald-50 to-white border border-emerald-100 rounded-xl p-4 mb-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-linear-to-br from-emerald-500 to-emerald-700 text-white text-base font-bold flex items-center justify-center shrink-0">
            {(selected.firstName || "?").charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800">{selected.firstName} {selected.lastName}</p>
            <p className="text-xs text-gray-400">{selected.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Role</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setRoleOpen((o) => !o)}
              style={{
                backgroundColor: document.documentElement.classList.contains('dark') ? '#202024' : '#ffffff',
                borderColor: document.documentElement.classList.contains('dark') ? '#33333a' : '#a7f3d0'
              }}
              className="flex items-center gap-2 border hover:border-emerald-400 rounded-lg px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all min-w-44"
            >
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-emerald-100 text-emerald-600 shrink-0">
                {(() => {
                  const RoleIcon = ROLES.find((r) => r.name === role)?.icon || ShieldCheck;
                  return <RoleIcon size={13} />;
                })()}
              </span>
              <span className="flex-1 text-left text-sm font-semibold text-gray-700">{role}</span>
              <ChevronDown size={15} className={`text-emerald-400 shrink-0 transition-transform duration-300 ${roleOpen ? "rotate-180" : ""}`} />
            </button>

            {roleOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setRoleOpen(false)} />
                <div
                  style={document.documentElement.classList.contains('dark') ? { backgroundColor: '#161618', borderColor: '#2a2a2e' } : undefined}
                  className="absolute top-full mt-1.5 right-0 z-50 w-56 bg-white border border-emerald-100 rounded-xl shadow-lg shadow-emerald-100/50 p-1.5 animate-[roleDrop_0.2s_ease-out]"
                >
                  {ROLES.map((r) => {
                    const active = role === r.name;
                    const RoleIcon = r.icon;
                    const isDark = document.documentElement.classList.contains('dark');
                    return (
                      <button
                        key={r.name}
                        type="button"
                        onClick={() => { setRole(r.name); setDirty(true); setRoleOpen(false); }}
                        style={
                          !active && document.documentElement.classList.contains('dark')
                            ? { backgroundColor: 'transparent' }
                            : undefined
                        }
                        onMouseEnter={(e) => {
                          if (!active && document.documentElement.classList.contains('dark')) {
                            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!active && document.documentElement.classList.contains('dark')) {
                            e.currentTarget.style.backgroundColor = 'transparent'
                          }
                        }}
                        className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm cursor-pointer transition-colors ${active ? "bg-emerald-50 text-emerald-700 font-semibold" : "text-gray-600 hover:text-emerald-600"}`}
                      >
                        <span className={`flex items-center justify-center w-7 h-5 rounded-lg shrink-0 ${active ? "bg-emerald-600 text-white" : "text-gray-400"}`}>
                          <RoleIcon size={14} />
                        </span>
                        <span className="flex-1 text-left">{r.name}</span>
                        {active && <Check size={15} className="text-emerald-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {role === "Admin" ? (
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-8 flex flex-col items-center gap-2 text-center">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center">
            <ShieldCheck size={22} className="text-emerald-600" />
          </div>
          <p className="text-sm font-semibold text-emerald-800">Full Access</p>
          <p className="text-xs text-emerald-600 max-w-xs">Admin role has complete access to every module and sub-menu. Individual permissions are not required.</p>
        </div>
      ) : (
        <>
          <div
            style={document.documentElement.classList.contains('dark') ? { backgroundColor: '#202024', borderColor: '#33333a' } : undefined}
            className="module-search flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 mb-3"
          >
            <Search size={15} className="text-gray-400 shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search module..."
              style={document.documentElement.classList.contains('dark') ? { backgroundColor: 'transparent' } : undefined}
              className="w-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
            />
          </div>

          {/* Module cards */}
          <div className="flex flex-col gap-2">
            {filteredModules.map((mod) => {
              const mp = permissions[mod.key] || {};
              const isOpen = expanded === mod.key;
              const allOn = isModuleAllOn(mod);
              const anyOn = ACTIONS.some((a) => mp[a]) || mod.subs.some((s) => mp.subMenus?.[s.key]);

              return (
                <div key={mod.key} className={`border rounded-xl overflow-hidden transition-colors ${anyOn ? "border-emerald-200 bg-emerald-50/20" : "border-gray-200 bg-white"}`}>
                  {/* Card header */}
                  <div className="flex items-center gap-3 px-4 py-3">
                    <button
                      onClick={() => setExpanded(isOpen ? null : mod.key)}
                      className="flex items-center gap-2 flex-1 text-left cursor-pointer"
                    >
                      <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-0" : "-rotate-90"}`} />
                      <span className="text-sm font-semibold text-gray-800">{mod.label}</span>
                      {anyOn && !allOn && (
                        <span className="text-[9px] font-bold text-amber-600 bg-amber-100 rounded-full px-1.5 py-0.5">PARTIAL</span>
                      )}
                      {allOn && (
                        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 rounded-full px-1.5 py-0.5">FULL</span>
                      )}
                    </button>
                    {/* Master toggle — poora module on/off */}
                    <Toggle on={allOn} onChange={() => toggleModule(mod, !allOn)} />
                  </div>

                  {/* Expanded content */}
                  <div
                    style={{ maxHeight: isOpen ? "600px" : "0px", opacity: isOpen ? 1 : 0 }}
                    className="transition-all duration-400 ease-out overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-1 border-t border-emerald-50">
                      {/* Actions row */}
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mt-2 mb-2">Permissions</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">

                        {(mod.actions || ACTIONS).map((a) => (
                          <div key={a} className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2 border ${mp[a] ? "border-emerald-200 bg-emerald-50" : "border-gray-100 bg-gray-50"}`}>
                            <span className="text-xs font-medium text-gray-600 capitalize">{a}</span>
                            <Toggle size="sm" on={!!mp[a]} onChange={() => toggleAction(mod.key, a)} />
                          </div>
                        ))}
                      </div>

                      {/* Sub-menus */}
                      {mod.subs.length > 0 && (
                        <>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-2">Sub-menus</p>
                          <div className="flex flex-col gap-1.5">
                            {mod.subs.map((s) => {
                              const on = !!mp.subMenus?.[s.key];
                              return (
                                <div key={s.key} className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2 border ${on ? "border-emerald-200 bg-emerald-50/60" : "border-gray-100 bg-white"}`}>
                                  <span className="text-[13px] text-gray-700">{s.label}</span>
                                  <Toggle size="sm" on={on} onChange={() => toggleSub(mod.key, s.key)} />
                                </div>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {confirmAction && (
            <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4" onClick={() => setConfirmAction(null)}>
              <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
                <div className="p-5">
                  <div className="w-11 h-11 rounded-full bg-amber-50 flex items-center justify-center mb-3">
                    <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-gray-800 mb-1">Unsaved changes</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{confirmAction.message}</p>
                </div>
                <div className="flex items-center justify-end gap-2 px-5 py-3 bg-gray-50 border-t border-gray-100">
                  <button
                    onClick={() => setConfirmAction(null)}
                    className="px-3.5 py-2 text-xs font-semibold text-gray-600 hover:text-gray-800 cursor-pointer">
                    Cancel
                  </button>
                  <button
                    onClick={confirmAction.onConfirm}
                    className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg cursor-pointer transition-colors">
                    Discard
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Save */}
      <div className="flex justify-end mt-5">
        <motion.button
          onClick={handleSave}
          disabled={saving || saved}
          whileTap={(!saving && !saved) ? { scale: 0.97 } : {}}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          style={{ boxShadow: 'none', backgroundColor: '#059669' }}
          className="relative flex w-48 h-11 items-center justify-center gap-2 rounded-lg text-sm font-semibold cursor-pointer overflow-hidden transition-colors text-white disabled:cursor-not-allowed"
        >
          <AnimatePresence mode="wait">
            {saving && (
              <motion.span key="saving"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2 whitespace-nowrap">
                <Loader2 size={15} className="animate-spin [animation-duration:1s]" />
                Saving...
              </motion.span>
            )}

            {saved && (
              <motion.span key="saved"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2 whitespace-nowrap">
                <motion.span
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15, delay: 0.05 }}
                  style={{ backgroundColor: '#ffffff' }}
                  className="flex h-4 w-4 items-center justify-center rounded-full">
                  <Check size={11} strokeWidth={4} style={{ color: '#059669' }} />
                </motion.span>
                Saved!
              </motion.span>
            )}

            {!saving && !saved && (
              <motion.span key="idle"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2 whitespace-nowrap">
                <Check size={15} />
                Save Permissions
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}

function FinanceSection() {
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-1">Finance settings</h2>
      <p className="text-sm text-gray-500 mb-5">Invoice, payment aur accounting preferences</p>

      <Card title="Invoice settings">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Invoice prefix">
            <Input type="text" defaultValue="HF-" />
          </Field>
          <Field label="Starting number">
            <Input type="number" defaultValue={1001} />
          </Field>
          <Field label="Payment terms (days)">
            <Input type="number" defaultValue={30} />
          </Field>
          <Field label="Fiscal year start">
            <Select>
              <option>January</option>
              <option>April</option>
              <option>July</option>
              <option>October</option>
            </Select>
          </Field>
        </div>
      </Card>

      <Card title="Payment methods">
        <div className="flex flex-col gap-3">
          <Checkbox label="Cash" defaultChecked />
          <Checkbox label="Bank transfer" defaultChecked />
          <Checkbox label="Cheque" defaultChecked />
          <Checkbox label="Credit card" />
          <Checkbox label="JazzCash / Easypaisa" defaultChecked />
        </div>
      </Card>

      <SaveButton />
    </div>
  );
}

function InventorySection() {
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-1">Inventory settings</h2>
      <p className="text-sm text-gray-500 mb-5">Stock management aur warehouse preferences</p>

      <Card title="Stock alerts">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Low stock threshold (units)">
            <Input type="number" defaultValue={10} />
          </Field>
          <Field label="Reorder point (units)">
            <Input type="number" defaultValue={50} />
          </Field>
        </div>
      </Card>

      <Card title="Costing method">
        <div className="flex flex-col gap-3">
          <Radio label="FIFO (First In, First Out)" name="cost" defaultChecked />
          <Radio label="LIFO (Last In, First Out)" name="cost" />
          <Radio label="Weighted average" name="cost" />
        </div>
      </Card>

      <Card title="Other options">
        <div className="flex flex-col gap-3">
          <Checkbox label="Track expiry dates" defaultChecked />
          <Checkbox label="Enable batch / lot tracking" defaultChecked />
          <Checkbox label="Allow negative stock" />
          <Checkbox label="Auto-generate purchase orders on low stock" defaultChecked />
        </div>
      </Card>

      <SaveButton />
    </div>
  );
}

function TaxSection() {
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-1">Tax settings</h2>
      <p className="text-sm text-gray-500 mb-5">GST, sales tax aur withholding tax configuration</p>

      <Card title="Sales tax">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Field label="Default tax rate (%)">
            <Input type="number" defaultValue={17} />
          </Field>
          <Field label="Tax label">
            <Input type="text" defaultValue="GST" />
          </Field>
          <Field label="NTN number">
            <Input type="text" placeholder="e.g. 1234567-8" />
          </Field>
          <Field label="STRN number">
            <Input type="text" placeholder="e.g. 03-01-9999-001-88" />
          </Field>
        </div>
        <div className="flex flex-col gap-3">
          <Checkbox label="Show tax on invoice" defaultChecked />
          <Checkbox label="Apply withholding tax (WHT)" />
          <Checkbox label="Prices include tax" defaultChecked />
        </div>
      </Card>

      <SaveButton />
    </div>
  );
}

function NotificationsSection() {
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-1">Notifications</h2>
      <p className="text-sm text-gray-500 mb-5">System alerts aur email notifications configure karo</p>

      <Card title="Email notifications">
        <div className="flex flex-col gap-3">
          <Checkbox label="New order received" defaultChecked />
          <Checkbox label="Low stock alert" defaultChecked />
          <Checkbox label="Payment received" defaultChecked />
          <Checkbox label="Overdue invoices" />
          <Checkbox label="Daily sales summary" defaultChecked />
          <Checkbox label="New user registered" />
        </div>
      </Card>

      <Card title="Notification email">
        <Field label="Send alerts to">
          <Input type="email" defaultValue="admin@hafizfoods.pk" />
        </Field>
      </Card>

      <SaveButton />
    </div>
  );
}

function AppearanceSection() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "system");
  const [accent, setAccent] = useState(
    () => localStorage.getItem("accent") || ACCENT_COLORS[0]
  );
  const [pattern, setPattern] = useState(() => localStorage.getItem("bgPattern") || "none");

  const themes = [
    { id: "light", label: "Light", icon: Sun },
    { id: "dark", label: "Dark", icon: Moon },
    { id: "system", label: "System", icon: Monitor },
  ];
  const BG_PATTERNS = [
    { id: "none", label: "None" },
    { id: "fastfood", label: "Fast Food" },
    { id: "sweets", label: "Sweets" },
    { id: "drinks", label: "Drinks" },
    { id: "fruits", label: "Fruits" },
    { id: "breakfast", label: "Breakfast" },
    { id: "food", label: "Mixed Food" },
  ];
  // theme apply + persist
  useEffect(() => {
    const root = document.documentElement;
    const applyResolved = (mode) => {
      const isDark = mode === "dark";
      root.classList.toggle("dark", isDark);
      root.setAttribute("data-theme", isDark ? "dark" : "light");
    };
    applyResolved(theme);
    localStorage.setItem("theme", theme);
    if (theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const onChange = () => applyResolved("system");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    }
  }, [theme]);

  useEffect(() => {
    document.body.setAttribute("data-pattern", pattern);
    localStorage.setItem("bgPattern", pattern);
  }, [pattern]);


  useEffect(() => {
    const root = document.documentElement;

    const getContrast = (hex) => {
      const c = hex.replace("#", "");
      const r = parseInt(c.substring(0, 2), 16);
      const g = parseInt(c.substring(2, 4), 16);
      const b = parseInt(c.substring(4, 6), 16);
      const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return lum > 0.6 ? "#111827" : "#ffffff"; // light accent -> dark text
    };

    root.style.setProperty("--accent", accent);
    root.style.setProperty("--accent-contrast", getContrast(accent));
    root.style.setProperty("--nav-active", `color-mix(in srgb, ${accent} 38%, #0f1729)`);
    root.style.setProperty("--nav-strip", accent);

    localStorage.setItem("accent", accent);
  }, [accent]);

  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-1">Appearance</h2>
      <p className="text-sm text-gray-500 mb-5">Theme aur UI preferences</p>

      <Card title="Theme">
        <div className="flex gap-3">
          {themes.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTheme(id)}
              className={`flex flex-col items-center cursor-pointer gap-2 px-6 py-3 rounded-lg border transition-all ${theme === id
                ? "border-[var(--accent)] border-2 text-[color:var(--accent)]"
                : "border-gray-200 text-gray-500 hover:border-gray-300"
                }`}
            >
              <Icon size={20} />
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </Card>

      <Card title="Accent color">
        <div className="flex gap-3 flex-wrap">
          {ACCENT_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => setAccent(color)}
              style={{
                backgroundColor: color,
                outline: accent === color ? `2px solid ${color}` : "none",
                outlineOffset: accent === color ? "2px" : undefined,
              }}
              className="w-7 h-7 rounded-full cursor-pointer transition-all"
            />
          ))}

          {/* Custom color */}
          <label
            title="Custom color"
            className="relative w-7 h-7 rounded-full cursor-pointer overflow-hidden"
            style={
              !ACCENT_COLORS.includes(accent)
                ? { outline: `2px solid ${accent}`, outlineOffset: "2px" }
                : undefined
            }
          >
            <span
              className="absolute inset-0"
              style={{
                background: ACCENT_COLORS.includes(accent)
                  ? "conic-gradient(red, orange, yellow, lime, cyan, blue, magenta, red)"
                  : accent,
              }}
            />
            <input
              type="color"
              value={ACCENT_COLORS.includes(accent) ? "#059669" : accent}
              onChange={(e) => setAccent(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </label>
        </div>

      </Card>

      <Card title="Background pattern">
        <div className="flex gap-3 flex-wrap">
          {BG_PATTERNS.map((p) => {

            const previews = {
              none: "none",
              fastfood: "url(\"data:image/svg+xml,%3Csvg width='110' height='110' viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23000' stroke-opacity='0.35' stroke-width='2.5'%3E%3Cpath d='M40 40q9-6 18 0 M39 44h20 M40 48q9 4 18 0 M39 52h20q0 4-9 4t-9-4'/%3E%3Cpath d='M110 60l9 16-18 0z'/%3E%3C/g%3E%3C/svg%3E\")",
              sweets: "url(\"data:image/svg+xml,%3Csvg width='110' height='110' viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23000' stroke-opacity='0.35' stroke-width='2.5'%3E%3Cpath d='M50 50m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0 M50 50m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0'/%3E%3Cpath d='M110 90l4 14 4-14'/%3E%3C/g%3E%3C/svg%3E\")",
              drinks: "url(\"data:image/svg+xml,%3Csvg width='110' height='110' viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23000' stroke-opacity='0.35' stroke-width='2.5'%3E%3Cpath d='M50 50h13l-2 13a4 4 0 01-9 0z M63 52c4 0 4 6 0 6'/%3E%3C/g%3E%3C/svg%3E\")",
              fruits: "url(\"data:image/svg+xml,%3Csvg width='110' height='110' viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23000' stroke-opacity='0.35' stroke-width='2.5'%3E%3Cpath d='M60 60q-7-3-7 4t7 7q7 0 7-7t-7-4z M60 60v-4'/%3E%3Cpath d='M110 110m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0'/%3E%3C/g%3E%3C/svg%3E\")",
              breakfast: "url(\"data:image/svg+xml,%3Csvg width='110' height='110' viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23000' stroke-opacity='0.35' stroke-width='2.5'%3E%3Cpath d='M60 60q-7 0-7 6t7 6 7-3 7-8-7-4-7-4z M60 60m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0'/%3E%3C/g%3E%3C/svg%3E\")",
              food: "url(\"data:image/svg+xml,%3Csvg width='110' height='110' viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23000' stroke-opacity='0.35' stroke-width='2.5'%3E%3Cpath d='M40 40q9-6 18 0 M39 44h20 M39 52h20q0 4-9 4t-9-4'/%3E%3Cpath d='M110 60m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0'/%3E%3C/g%3E%3C/svg%3E\")",
            };
            return (
              <button
                key={p.id}
                onClick={() => setPattern(p.id)}
                title={p.label}
                className={`relative w-14 h-14 rounded-lg cursor-pointer transition-all hover:scale-105 border-2 ${pattern === p.id ? "border-[var(--accent)]" : "border-gray-200"}`}
                style={{
                  backgroundColor: "#f8fafc",
                  backgroundImage: previews[p.id],
                }}
              >
                {pattern === p.id && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <Check size={16} className="text-[color:var(--accent)]" style={{ filter: "drop-shadow(0 0 2px white)" }} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-gray-400 mt-2">Choose a background pattern</p>
      </Card>

      <Card title="Sidebar color">
        <SidebarColorPicker />
      </Card>

      <Card title="Layout preferences">
        <div className="flex flex-col gap-3">
          <Checkbox label="Compact sidebar" defaultChecked />
          <Checkbox label="Show breadcrumbs" />
          <Checkbox label="Sticky header" defaultChecked />
        </div>
      </Card>

      <div className="flex items-center gap-3 mt-4">
        <SaveButton />
        <button
          onClick={() => {
            setTheme("light");
            setAccent(ACCENT_COLORS[0]); // default emerald
            setSidebarColor("bg-slate-900"); // default navy
          }}
          className="text-xs text-gray-500 hover:text-[color:var(--accent)] underline cursor-pointer"
        >
          Reset to default
        </button>
      </div>

    </div>

  );
}
// Sidebar Color swatches — Appearance section me add karo
function SidebarColorPicker() {
  const [selected, setSelected] = useState(localStorage.getItem("sidebarColorHex") || "#0f172a")

  const colors = [
    { name: "Navy", hex: "#0f172a" },
    { name: "Emerald", hex: "#022c22" },
    { name: "Black", hex: "#0a0a0a" },
    { name: "Indigo", hex: "#1e1b4b" },
    { name: "Blue", hex: "#172554" },
    { name: "Zinc", hex: "#18181b" },
  ]

  function pick(hex) {
    setSelected(hex)
    localStorage.setItem("sidebarColorHex", hex)
    window.dispatchEvent(new Event("sidebar-color-changed"))
  }

  const isCustom = !colors.some((c) => c.hex === selected)

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Sidebar Color</label>
      <div className="flex flex-wrap gap-2.5">
        {colors.map((c) => (
          <button
            key={c.hex}
            onClick={() => pick(c.hex)}
            title={c.name}
            className={`relative w-10 h-10 rounded-xl cursor-pointer transition-all hover:scale-110 ${selected === c.hex ? "ring-2 ring-offset-2 ring-emerald-500" : "ring-1 ring-gray-200"}`}
            style={{ backgroundColor: c.hex }}
          >
            {selected === c.hex && (
              <span className="absolute inset-0 flex items-center justify-center">
                <Check size={16} className="text-white" />
              </span>
            )}
          </button>
        ))}

        {/* Custom color picker */}
        <label
          title="Custom color"
          className={`relative w-10 h-10 rounded-xl cursor-pointer overflow-hidden transition-all hover:scale-110 ${isCustom ? "ring-2 ring-offset-2 ring-emerald-500" : "ring-1 ring-gray-200"}`}
        >
          <span
            className="absolute inset-0"
            style={{
              background: isCustom ? selected : "conic-gradient(red, orange, yellow, lime, cyan, blue, magenta, red)"
            }}
          />
          {isCustom && (
            <span className="absolute inset-0 flex items-center justify-center">
              <Check size={16} className="text-white" />
            </span>
          )}
          <input
            type="color"
            value={isCustom ? selected : "#0f172a"}
            onChange={(e) => pick(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </label>
      </div>
      <p className="text-xs text-gray-400 mt-2">Choose any sidebar background color</p>
    </div>
  )
}

function BackupSection() {
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-1">Backup & data</h2>
      <p className="text-sm text-gray-500 mb-5">Automatic backup aur data export options</p>

      <Card title="Auto backup">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Field label="Frequency">
            <Select>
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </Select>
          </Field>
          <Field label="Retention period">
            <Select>
              <option>7 days</option>
              <option>30 days</option>
              <option>90 days</option>
            </Select>
          </Field>
        </div>
        <Checkbox label="Enable auto backup" defaultChecked />
      </Card>

      <Card title="Export data">
        <div className="flex gap-3 flex-wrap">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            <Download size={15} />
            Export as CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            <FileSpreadsheet size={15} />
            Export as Excel
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            <HardDriveDownload size={15} />
            Export full backup
          </button>
        </div>
      </Card>

      <SaveButton />
    </div>
  );
}


const SECTIONS = {
  general: <GeneralSection />,
  users: <UsersSection />,
  finance: <FinanceSection />,
  inventory: <InventorySection />,
  tax: <TaxSection />,
  notifications: <NotificationsSection />,
  appearance: <AppearanceSection />,
  backup: <BackupSection />,
};


export default function Setting({ onClose, setShowSetting }) {
  const [active, setActive] = useState("general");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="relative bg-gray-50 rounded-2xl shadow-2xl flex overflow-hidden"
        style={{ width: "860px", height: "580px", maxWidth: "95vw", maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => { setShowSetting(false) }}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <X size={18} />
        </button>

        <aside className="w-52 shrink-0 bg-white dark:bg-neutral-900 border-r border-gray-200 dark:border-white/10 py-4 flex flex-col">
          <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest px-4 mb-2">
            Settings
          </p>
          <nav className="flex flex-col gap-0.5 px-2">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
              const isActive = active === id;
              return (
                <button
                  key={id}
                  onClick={() => setActive(id)}
                  style={
                    !isActive && document.documentElement.classList.contains('dark')
                      ? { backgroundColor: 'transparent', boxShadow: 'none', borderColor: 'transparent' }
                      : undefined
                  }
                  onMouseEnter={(e) => {
                    if (!isActive && document.documentElement.classList.contains('dark')) {
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive && document.documentElement.classList.contains('dark')) {
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }
                  }}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors w-full text-left ${isActive
                    ? "tab-active bg-emerald-50 text-emerald-600 font-medium"
                    : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  <Icon size={16} />
                  {label}
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-2xl">
            {SECTIONS[active]}
          </div>
        </main>
      </div>
    </div>
  );
}