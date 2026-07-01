import { useEffect, useRef, useState } from "react";
import { Sun, Sunset, Moon } from "lucide-react";
import Setting from '../Setting.jsx'
import UserSelectMenu from "../UserAccount/UserSelectMenu.jsx";
import { BarChart, Bar, PieChart, Pie, Cell, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const monthlySales = [
    { month: "Jan", sales: 125000, orders: 142500 },
    { month: "Feb", sales: 89000, orders: 104000 },
    { month: "Mar", sales: 198000, orders: 221000 },
    { month: "Apr", sales: 156000, orders: 178000 },
    { month: "May", sales: 172000, orders: 195000 },
    { month: "Jun", sales: 143000, orders: 161000 },
    { month: "Jul", sales: 210000, orders: 234000 },
    { month: "Aug", sales: 167000, orders: 189000 },
    { month: "Sep", sales: 195000, orders: 218000 },
    { month: "Oct", sales: 138000, orders: 157000 },
    { month: "Nov", sales: 182000, orders: 204000 },
    { month: "Dec", sales: 159000, orders: 176000 },
];

const weeklyRevenue = [
    { week: "W1", revenue: 524000 },
    { week: "W2", revenue: 381000 },
    { week: "W3", revenue: 692000 },
    { week: "W4", revenue: 445000 },
    { week: "W5", revenue: 578000 },
    { week: "W6", revenue: 312000 },
    { week: "W7", revenue: 741000 },
    { week: "W8", revenue: 489000 },
];

const customerPie = [
    { name: "New", value: 224444 },
    { name: "Returning", value: 1000000 },
    { name: "Inactive", value: 500000 },
];

const revenueSplit = [
    { name: "Bombay Biryani", value: 19 },
    { name: "Kabuli Pulao", value: 30 },
    { name: "Bannu Beef", value: 20 },
    { name: "Achar Gosht", value: 53 },
];

const payBand = [
    { label: "Total Revenue", value: 1850000, prefix: "Rs. ", color: ["#2563eb", "#1d4ed8"], icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { label: "Total Sales", value: 1240000, prefix: "Rs. ", color: ["#7c3aed", "#6d28d9"], icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
    { label: "Total Orders", value: 3240, prefix: "", color: ["#f59e0b", "#ea580c"], icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
    { label: "Total Customers", value: 870, prefix: "", color: ["#0d9488", "#0f766e"], icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
    { label: "Total Products", value: 142, prefix: "", color: ["#e11d48", "#be185d"], icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
    { label: "Pending Payments", value: 320000, prefix: "Rs. ", color: ["#475569", "#334155"], icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
    { label: "New Customers", value: 215, prefix: "", color: ["#0891b2", "#0e7490"], icon: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" },
    { label: "Completed Orders", value: 2890, prefix: "", color: ["#16a34a", "#059669"], icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
];

const CUSTOMER_COLORS = ["#2563eb", "#60a5fa", "#bfdbfe"];
const REVENUE_COLORS = ["#2563eb", "#f97316", "#14b8a6", "#f59e0b"];

const tt = {
    contentStyle: { borderRadius: "10px", border: "1px solid #dbeafe", fontSize: "11px" },
};

const useCountUp = (target, duration = 1200) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        const start = performance.now();
        const tick = (now) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setCount(Math.round(eased * target));
            if (t < 1) requestAnimationFrame(tick);
        };
        const raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [target, duration]);
    return count;
};
const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: "Good Morning", Icon: Sun, color: "text-amber-500" };
    if (hour < 17) return { text: "Good Afternoon", Icon: Sunset, color: "text-orange-500" };
    return { text: "Good Evening", Icon: Moon, color: "text-indigo-400" };
};

const { text: greetingText, Icon: GreetingIcon, color: greetingColor } = getGreeting();
const useParticleCanvas = (canvasRef) => {
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let animId;
        let particles = [];

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        const makeParticle = () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 2.2 + 0.6,
            speedX: (Math.random() - 0.5) * 0.4,
            speedY: (Math.random() - 0.5) * 0.4,
            alpha: Math.random() * 0.55 + 0.15,
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: Math.random() * 0.03 + 0.01,
        });

        const init = () => {
            resize();
            particles = Array.from({ length: 22 }, makeParticle);
        };

        const loop = () => {
            animId = requestAnimationFrame(loop);
            const { width: w, height: h } = canvas;
            ctx.clearRect(0, 0, w, h);

            for (const p of particles) {
                p.x += p.speedX;
                p.y += p.speedY;
                p.pulse += p.pulseSpeed;
                if (p.x < -5) p.x = w + 5;
                if (p.x > w + 5) p.x = -5;
                if (p.y < -5) p.y = h + 5;
                if (p.y > h + 5) p.y = -5;

                const a = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${a})`;
                ctx.fill();
            }

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 48) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(255,255,255,${0.12 * (1 - dist / 48)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        };

        init();
        loop();

        const ro = new ResizeObserver(resize);
        ro.observe(canvas);

        return () => {
            cancelAnimationFrame(animId);
            ro.disconnect();
        };
    }, [canvasRef]);
};

const PayBandCard = ({ item }) => {
    const canvasRef = useRef(null);
    useParticleCanvas(canvasRef);

    const count = useCountUp(item.value);
    const formatted = count >= 1000
        ? count.toLocaleString("en-PK")
        : count.toString();

    return (
        <div
            className="relative rounded-[10px] px-3 py-7.5 flex flex-col gap-2.5 overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:-translate-y-1 group"
            style={{
                background: `linear-gradient(135deg, ${item.color[0]}, ${item.color[1]})`,
                boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
            }}
        >
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

            <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-white/10 transition-all duration-300 group-hover:scale-125 group-hover:bg-white/18 pointer-events-none" />
            <div className="absolute -bottom-5 -left-3 w-20 h-20 rounded-full bg-white/10 transition-all duration-300 group-hover:scale-125 group-hover:bg-white/18 pointer-events-none" />

            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)" }}
            />

            <svg
                className="absolute -right-2 -bottom-2 w-16 h-16 text-white/20 group-hover:text-white/30 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 group-hover:-translate-x-1 pointer-events-none"
                fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"
            >
                <path d={item.icon} />
            </svg>

            <div className="relative z-10 min-w-0">
                <p className="text-white/70 group-hover:text-white/90 text-[11px] font-medium leading-none mb-1 truncate transition-all duration-300">
                    {item.label}
                </p>
                <p className="text-white text-[15px] font-bold leading-none truncate">
                    {item.prefix}{formatted}
                </p>
            </div>
        </div>
    );
};

const ChartCard = ({ title, subtitle, children }) => (
    <div className="bg-white border border-blue-100 rounded-xl shadow-sm p-4">
        <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-linear-to-b from-blue-500 to-blue-700 rounded-full shrink-0" />
            <div>
                <h3 className="text-gray-700 text-xs font-bold">{title}</h3>
                {subtitle && <p className="text-gray-400 text-xs">{subtitle}</p>}
            </div>
        </div>
        {children}
    </div>
);

const renderPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (!percent) return null;
    const R = Math.PI / 180;
    const r = innerRadius + (outerRadius - innerRadius) * 0.5;
    return (
        <text x={cx + r * Math.cos(-midAngle * R)} y={cy + r * Math.sin(-midAngle * R)}
            fill="white" textAnchor="middle" dominantBaseline="central" fontSize={10} fontWeight={700}>
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};
import React from 'react'

const MainDashboard = () => {
    const [showSetting, setShowSetting] = useState(false);
    return (
        <div className="p-4 md:p-5">
            {
                showSetting == true ? <Setting setShowSetting={setShowSetting} /> : <UserSelectMenu setShowSetting={setShowSetting} />
            }

            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">

                    <div className="flex items-center gap-2.5">
                        <div className={`p-2 rounded-full bg-amber-100 ${greetingColor}`}>
                            <GreetingIcon size={22} className="animate-pulse" />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold text-slate-800">
                                {greetingText}, Muhammad Usman 👋
                            </h1>
                            <p className="text-[12.5px] text-slate-500">
                                Real-Time Insights. Real Growth
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
                    {payBand.map((item, i) => (
                        <PayBandCard key={i} item={item} />
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-4">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2">
                        <ChartCard title="Monthly Sales & Orders" subtitle="Jan – Dec">
                            <ResponsiveContainer width="100%" height={140}>
                                <BarChart data={monthlySales} margin={{ top: 2, right: 8, left: -20, bottom: 0 }} barSize={10}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f4ff" />
                                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                                    <Tooltip {...tt} />
                                    <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: "11px", paddingTop: "4px" }} />
                                    <Bar dataKey="sales" name="Sales" fill="#2563eb" />
                                    <Bar dataKey="orders" name="Orders" fill="#60a5fa" />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartCard>
                    </div>
                    <div className="lg:col-span-1">
                        <ChartCard title="Revenue Split" subtitle="By category">
                            <ResponsiveContainer width="100%" height={140}>
                                <PieChart>
                                    <Pie data={revenueSplit} cx="50%" cy="50%" innerRadius={35} outerRadius={58}
                                        paddingAngle={3} dataKey="value" labelLine={false} label={renderPieLabel}>
                                        {revenueSplit.map((_, i) => <Cell key={i} fill={REVENUE_COLORS[i]} />)}
                                    </Pie>
                                    <Tooltip {...tt} />
                                    <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: "10px" }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </ChartCard>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ChartCard title="Weekly Revenue" subtitle="Current month">
                        <ResponsiveContainer width="100%" height={140}>
                            <LineChart data={weeklyRevenue} margin={{ top: 2, right: 8, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f4ff" />
                                <XAxis dataKey="week" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                                <Tooltip {...tt} />
                                <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2}
                                    dot={{ fill: "#2563eb", r: 3, strokeWidth: 0 }} activeDot={{ r: 5 }} name="Revenue (Rs.)" />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard title="Customer Distribution" subtitle="New vs Returning vs Inactive">
                        <ResponsiveContainer width="100%" height={150}>
                            <PieChart>
                                <Pie data={customerPie} cx="50%" cy="50%" innerRadius={38} outerRadius={60}
                                    paddingAngle={3} dataKey="value" labelLine={false} label={renderPieLabel}>
                                    {customerPie.map((_, i) => <Cell key={i} fill={CUSTOMER_COLORS[i]} />)}
                                </Pie>
                                <Tooltip {...tt} />
                                <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: "10px" }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>

            </div>
        </div>
    )
}

export default MainDashboard

