import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Package, Users, Award, RefreshCcw, Clock, Percent, Calendar } from 'lucide-react';


const monthlySalesFull = [
    { month: 'Jan', sales: 1250000 },
    { month: 'Feb', sales: 1380000 },
    { month: 'Mar', sales: 1190000 },
    { month: 'Apr', sales: 1540000 },
    { month: 'May', sales: 1620000 },
    { month: 'Jun', sales: 1780000 },
];

const topProducts = [
    { name: 'Cooking Oil 5L', revenue: 890000 },
    { name: 'Basmati Rice 40kg', revenue: 760000 },
    { name: 'Chai Patti 1kg', revenue: 690000 },
    { name: 'Ghee 1kg', revenue: 640000 },
    { name: 'Sugar 50kg', revenue: 590000 },
    { name: 'Flour (Atta) 20kg', revenue: 520000 },
    { name: 'Pulses Mix 10kg', revenue: 470000 },
    { name: 'Spices Pack', revenue: 410000 },
    { name: 'Biscuits Carton', revenue: 380000 },
    { name: 'Juice Pack (24pc)', revenue: 340000 },
].sort((a, b) => b.revenue - a.revenue);

const customerRevenue = [
    { name: 'Al Madina Store', value: 32 },
    { name: 'Bannu Traders', value: 24 },
    { name: 'KPK Wholesale Mart', value: 18 },
    { name: 'DI Khan General Store', value: 14 },
    { name: 'Others', value: 12 },
];

const salesmen = [
    { name: 'Ali Raza', target: 500000, achieved: 460000 },
    { name: 'Usman Khan', target: 450000, achieved: 480000 },
    { name: 'Bilal Ahmed', target: 400000, achieved: 310000 },
    { name: 'Hamza Tariq', target: 380000, achieved: 355000 },
];

const stockTurnover = [
    { name: 'Oil', turnover: 8.2 },
    { name: 'Rice', turnover: 6.5 },
    { name: 'Tea', turnover: 5.9 },
    { name: 'Ghee', turnover: 4.1 },
    { name: 'Sugar', turnover: 3.4 },
    { name: 'Spices', turnover: 1.2 },
];

const agingData = [
    { range: '0-30', amount: 620000 },
    { range: '31-60', amount: 340000 },
    { range: '61-90', amount: 180000 },
    { range: '90+', amount: 95000 },
];

const profitMargin = [
    { category: 'Oil', margin: 18 },
    { category: 'Rice', margin: 22 },
    { category: 'Tea', margin: 27 },
    { category: 'Ghee', margin: 15 },
    { category: 'Sugar', margin: 9 },
    { category: 'Spices', margin: 31 },
];

const PIE_COLORS = ['#2563EB', '#0EA5E9', '#8B5CF6', '#F59E0B', '#94A3B8'];

const formatRs = (val) => `Rs. ${Number(val).toLocaleString('en-PK')}`;


function ChartCard({ icon: Icon, title, subtitle, children, className = '', headerExtra }) {
    return (
        <div className={`bg-white rounded-xl border border-slate-100 shadow-sm p-3 ${className}`}>
            <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 rounded-md bg-blue-50 flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-[12px] font-semibold text-slate-900 leading-tight truncate">{title}</p>
                        {subtitle && <p className="text-[10px] text-slate-400 leading-tight truncate">{subtitle}</p>}
                    </div>
                </div>
                {headerExtra}
            </div>
            {children}
        </div>
    );
}

function CustomTooltip({ active, payload, label, formatter }) {
    if (!active || !payload || !payload.length) return null;
    return (
        <div className="bg-white border border-slate-200 rounded-lg shadow-md px-2.5 py-1.5 text-[11px]">
            {label && <p className="text-slate-500 mb-0.5">{label}</p>}
            {payload.map((p, i) => (
                <p key={i} className="text-slate-800 font-medium">
                    {p.name}: {formatter ? formatter(p.value) : p.value}
                </p>
            ))}
        </div>
    );
}


export default function AnalyticsPage() {
    const [range, setRange] = useState('6M');

    const monthlySales = range === '3M' ? monthlySalesFull.slice(-3) : monthlySalesFull;

    return (
        <div className="p-4 bg-slate-50 h-screen overflow-hidden flex flex-col">

            {/* Header */}
            <div className="flex items-center justify-between mb-3 shrink-0">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <h1 className="text-[16px] font-semibold text-slate-900 leading-tight">Analytics</h1>
                        <p className="text-[11px] text-slate-400 leading-tight">Business trends aur performance insights</p>
                    </div>
                </div>

                <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1">
                    {['Today', 'Week', 'Month', 'Custom'].map((r) => (
                        <button
                            key={r}
                            className="text-[11px] px-2.5 py-1 rounded-md text-slate-500 hover:bg-slate-50 transition-colors flex items-center gap-1"
                        >
                            {r === 'Custom' && <Calendar className="w-3 h-3" />}
                            {r}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 grid grid-cols-4 grid-rows-2 gap-3 min-h-0">

                <ChartCard
                    icon={TrendingUp}
                    title="Monthly sale trend"
                    subtitle={`Last ${range === '3M' ? '3' : '6'} months`}
                    className="col-span-2 flex flex-col"
                    headerExtra={
                        <div className="flex items-center gap-0.5 bg-slate-50 border border-slate-200 rounded-md p-0.5 shrink-0">
                            {['3M', '6M'].map((r) => (
                                <button
                                    key={r}
                                    onClick={() => setRange(r)}
                                    className={`text-[10px] px-2 py-0.5 rounded transition-colors ${range === r ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-white'
                                        }`}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>
                    }
                >
                    <ResponsiveContainer width="100%" height="100%" className="flex-1">
                        <LineChart data={monthlySales} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                            <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                            <YAxis
                                tick={{ fontSize: 10, fill: '#94A3B8' }}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(v) => `${(v / 100000).toFixed(0)}L`}
                                width={28}
                            />
                            <Tooltip content={<CustomTooltip formatter={formatRs} />} />
                            <Line
                                type="monotone"
                                dataKey="sales"
                                name="Sale"
                                stroke="#2563EB"
                                strokeWidth={2}
                                dot={{ r: 3, fill: '#2563EB' }}
                                activeDot={{ r: 5 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard icon={Users} title="Customer revenue" subtitle="% share" className="flex flex-col">
                    <ResponsiveContainer width="100%" height="100%" className="flex-1">
                        <PieChart>
                            <Pie
                                data={customerRevenue}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="42%"
                                innerRadius={30}
                                outerRadius={48}
                                paddingAngle={2}
                                labelLine={false}
                                label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                                    const RADIAN = Math.PI / 180;
                                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                                    return (
                                        <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={8.5} fontWeight={600}>
                                            {`${Math.round(percent * 100)}%`}
                                        </text>
                                    );
                                }}
                            >
                                {customerRevenue.map((entry, i) => (
                                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip formatter={(v) => `${v}%`} />} />
                            <Legend
                                verticalAlign="bottom"
                                iconType="circle"
                                iconSize={5}
                                wrapperStyle={{ fontSize: 9, color: '#64748B', lineHeight: '12px' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard
                    icon={Package}
                    title="Top 10 products"
                    subtitle="By revenue"
                    className="row-span-2 flex flex-col"
                >
                    <ResponsiveContainer width="100%" height="100%" className="flex-1">
                        <BarChart
                            data={topProducts}
                            layout="vertical"
                            margin={{ top: 0, right: 15, left: 0, bottom: 0 }}
                            barCategoryGap={6}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
                            <XAxis
                                type="number"
                                tick={{ fontSize: 9, fill: '#94A3B8' }}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(v) => `${(v / 100000).toFixed(0)}L`}
                            />
                            <YAxis
                                type="category"
                                dataKey="name"
                                tick={{ fontSize: 9.5, fill: '#475569' }}
                                axisLine={false}
                                tickLine={false}
                                width={95}
                            />
                            <Tooltip content={<CustomTooltip formatter={formatRs} />} />
                            <Bar dataKey="revenue" name="Revenue" fill="#2563EB" radius={[0, 4, 4, 0]} barSize={9} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard icon={Award} title="Salesman performance" subtitle="Target vs achieved" className="flex flex-col">
                    <ResponsiveContainer width="100%" height="100%" className="flex-1">
                        <BarChart data={salesmen} margin={{ top: 5, right: 5, left: 0, bottom: 0 }} barGap={3}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                            <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#64748B' }} axisLine={false} tickLine={false} interval={0} />
                            <YAxis
                                tick={{ fontSize: 9, fill: '#94A3B8' }}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(v) => `${(v / 100000).toFixed(0)}L`}
                                width={24}
                            />
                            <Tooltip content={<CustomTooltip formatter={formatRs} />} />
                            <Bar dataKey="target" name="Target" fill="#CBD5E1" radius={[3, 3, 0, 0]} barSize={10} />
                            <Bar dataKey="achieved" name="Achieved" fill="#2563EB" radius={[3, 3, 0, 0]} barSize={10} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard icon={RefreshCcw} title="Stock turnover" subtitle="Fast vs slow moving" className="flex flex-col">
                    <ResponsiveContainer width="100%" height="100%" className="flex-1">
                        <BarChart data={stockTurnover} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                            <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#64748B' }} axisLine={false} tickLine={false} interval={0} />
                            <YAxis tick={{ fontSize: 9, fill: '#94A3B8' }} axisLine={false} tickLine={false} width={20} />
                            <Tooltip content={<CustomTooltip formatter={(v) => `${v}x/month`} />} />
                            <Bar dataKey="turnover" name="Turnover" radius={[3, 3, 0, 0]} barSize={16}>
                                {stockTurnover.map((entry, i) => (
                                    <Cell key={i} fill={entry.turnover < 2 ? '#EF4444' : entry.turnover < 5 ? '#F59E0B' : '#10B981'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard icon={Clock} title="Receivable aging" subtitle="Pending payments (din)" className="flex flex-col">
                    <ResponsiveContainer width="100%" height="100%" className="flex-1">
                        <BarChart data={agingData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                            <XAxis dataKey="range" tick={{ fontSize: 9, fill: '#64748B' }} axisLine={false} tickLine={false} />
                            <YAxis
                                tick={{ fontSize: 9, fill: '#94A3B8' }}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(v) => `${(v / 100000).toFixed(0)}L`}
                                width={24}
                            />
                            <Tooltip content={<CustomTooltip formatter={formatRs} />} />
                            <Bar dataKey="amount" name="Pending" radius={[3, 3, 0, 0]} barSize={22}>
                                {agingData.map((entry, i) => (
                                    <Cell key={i} fill={['#10B981', '#F59E0B', '#F97316', '#EF4444'][i]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

            </div>

            <ChartCard icon={Percent} title="Profit margin" subtitle="Category wise, percentage" className="mt-3 shrink-0">
                <ResponsiveContainer width="100%" height={90}>
                    <BarChart data={profitMargin} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }} barCategoryGap={6}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
                        <XAxis type="number" tick={{ fontSize: 9, fill: '#94A3B8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                        <YAxis type="category" dataKey="category" tick={{ fontSize: 9.5, fill: '#475569' }} axisLine={false} tickLine={false} width={45} />
                        <Tooltip content={<CustomTooltip formatter={(v) => `${v}%`} />} />
                        <Bar dataKey="margin" name="Margin" fill="#8B5CF6" radius={[0, 3, 3, 0]} barSize={8} />
                    </BarChart>
                </ResponsiveContainer>
            </ChartCard>

        </div>
    );
}