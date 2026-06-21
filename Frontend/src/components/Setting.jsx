import { useState } from "react";
import { Building2, Users, Coins, Package, Receipt, Bell, Palette, Sun, Moon, Monitor, Download, Database, FileSpreadsheet, HardDriveDownload, Check, X, } from "lucide-react";

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
  "#1D4ED8",
  "#0F6E56",
  "#993556",
  "#854F0B",
  "#534AB7",
  "#5F5E5A",
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
      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  );
}

function Select({ children, ...props }) {
  return (
    <select
      {...props}
      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
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
        className="w-4 h-4 accent-blue-600 cursor-pointer"
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
        className="w-4 h-4 accent-blue-600 cursor-pointer"
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
          : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
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
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
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

function UsersSection() {
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-1">Users & Roles</h2>
      <p className="text-sm text-gray-500 mb-5">Access control aur permissions manage karo</p>

      <Card title="Default role for new users">
        <Select className="w-60">
          <option>Viewer</option>
          <option>Sales Staff</option>
          <option>Manager</option>
          <option>Admin</option>
        </Select>
      </Card>

      <Card title="Session & security">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Field label="Session timeout (minutes)">
            <Input type="number" defaultValue={30} />
          </Field>
          <Field label="Max login attempts">
            <Input type="number" defaultValue={5} />
          </Field>
        </div>
        <div className="flex flex-col gap-3">
          <Checkbox label="Require strong password" defaultChecked />
          <Checkbox label="Enable two-factor authentication (2FA)" />
          <Checkbox label="Log user activity" defaultChecked />
        </div>
      </Card>

      <SaveButton />
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
  const [theme, setTheme] = useState();
  const [accent, setAccent] = useState(ACCENT_COLORS[0]);

  const themes = [
    { id: "light", label: "Light", icon: Sun },
    { id: "dark", label: "Dark", icon: Moon },
    { id: "system", label: "System", icon: Monitor },
  ];

  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-1">Appearance</h2>
      <p className="text-sm text-gray-500 mb-5">Theme aur UI preferences</p>

      <Card title="Theme">
        <div className="flex  gap-3">
          {themes.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTheme(id)}
              className={`flex flex-col items-center  cursor-pointer gap-2 px-6 py-3 rounded-lg border transition-all ${theme === id
                  ? "border-blue-500 border-2 text-blue-600"
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
        </div>
      </Card>

      <Card title="Layout preferences">
        <div className="flex flex-col gap-3">
          <Checkbox label="Compact sidebar" defaultChecked />
          <Checkbox label="Show breadcrumbs" />
          <Checkbox label="Sticky header" defaultChecked />
        </div>
      </Card>

      <SaveButton />
    </div>
  );
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

        <aside className="w-52 shrink-0 bg-white border-r border-gray-200 py-4 flex flex-col">
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
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all w-full text-left ${isActive
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
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