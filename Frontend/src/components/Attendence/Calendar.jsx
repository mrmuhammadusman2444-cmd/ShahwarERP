// import React, { useState } from 'react';
// import { Calendar, ChevronDown, ArrowUp, ArrowDown } from 'lucide-react';

// const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

// export default function AdvancedCalendarPicker() {
//     const [isOpen, setIsOpen] = useState(true);
//     const [viewDate, setViewDate] = useState(new Date(2026, 6, 1));
//     const [selectedDate, setSelectedDate] = useState(new Date(2026, 6, 8));

//     const year = viewDate.getFullYear();
//     const month = viewDate.getMonth();

//     const firstDayOfMonth = new Date(year, month, 1);
//     const startWeekday = (firstDayOfMonth.getDay() + 6) % 7;
//     const daysInMonth = new Date(year, month + 1, 0).getDate();
//     const daysInPrevMonth = new Date(year, month, 0).getDate();

//     const calendarDays = [];
//     for (let i = startWeekday - 1; i >= 0; i--) {
//         calendarDays.push({ day: daysInPrevMonth - i, currentMonth: false });
//     }
//     for (let d = 1; d <= daysInMonth; d++) {
//         calendarDays.push({ day: d, currentMonth: true });
//     }
//     let nextDay = 1;
//     while (calendarDays.length < 42) {
//         calendarDays.push({ day: nextDay, currentMonth: false });
//         nextDay++;
//     }

//     const goPrevMonth = () => setViewDate(new Date(year, month - 1, 1));
//     const goNextMonth = () => setViewDate(new Date(year, month + 1, 1));

//     const isSelected = (day, currentMonth) =>
//         currentMonth &&
//         selectedDate &&
//         day === selectedDate.getDate() &&
//         month === selectedDate.getMonth() &&
//         year === selectedDate.getFullYear();

//     const handleSelect = (day, currentMonth) => {
//         if (!currentMonth) return;
//         setSelectedDate(new Date(year, month, day));
//     };

//     const handleToday = () => {
//         const t = new Date();
//         setSelectedDate(t);
//         setViewDate(new Date(t.getFullYear(), t.getMonth(), 1));
//     };

//     const handleClear = () => {
//         setSelectedDate(null);
//     };

//     const formattedSelected = selectedDate
//         ? `${String(selectedDate.getDate()).padStart(2, '0')} ${MONTHS[selectedDate.getMonth()].slice(0, 3)} ${selectedDate.getFullYear()}`
//         : 'Select date';

//     return (
//         <div className="max-w-xs">

//             <div onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 cursor-pointer mb-2">
//                 <Calendar className="w-4 h-4 text-emerald-500" />
//                 <span className="text-[16px] font-bold text-slate-800">{formattedSelected}</span>
//             </div>

//             {isOpen && (
//                 <div className="bg-white border border-slate-200 rounded-xl shadow-xl p-4 w-72">

//                     <div className="flex items-center justify-between mb-3">
//                         <button type="button" className="flex items-center gap-1 text-[13px] font-bold text-slate-800 cursor-pointer hover:text-emerald-600 transition-colors">
//                             {MONTHS[month]} {year}
//                             <ChevronDown className="w-3.5 h-3.5" />
//                         </button>
//                         <div className="flex items-center gap-2">
//                             <button type="button" onClick={goPrevMonth} className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors cursor-pointer">
//                                 <ArrowUp className="w-4 h-4" />
//                             </button>
//                             <button type="button" onClick={goNextMonth} className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors cursor-pointer">
//                                 <ArrowDown className="w-4 h-4" />
//                             </button>
//                         </div>
//                     </div>

//                     <div className="grid grid-cols-7 gap-y-1 mb-1">
//                         {DAYS.map((d) => (
//                             <div key={d} className="text-[11px] font-semibold text-slate-400 text-center py-1">{d}</div>
//                         ))}
//                     </div>

//                     <div className="grid grid-cols-7 gap-y-1">
//                         {calendarDays.map((d, i) => {
//                             const selected = isSelected(d.day, d.currentMonth);
//                             return (
//                                 <button
//                                     key={i}
//                                     type="button"
//                                     onClick={() => handleSelect(d.day, d.currentMonth)}
//                                     className={`w-8 h-8 mx-auto flex items-center justify-center text-[12.5px] rounded-lg transition-colors cursor-pointer ${selected
//                                             ? 'bg-linear-to-br from-emerald-500 to-emerald-700 text-white font-bold shadow-sm'
//                                             : d.currentMonth
//                                                 ? 'text-slate-700 hover:bg-emerald-50'
//                                                 : 'text-slate-300'
//                                         }`}
//                                 >
//                                     {d.day}
//                                 </button>
//                             );
//                         })}
//                     </div>

//                     <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
//                         <button type="button" onClick={handleClear} className="text-[12.5px] font-semibold text-emerald-600 hover:text-emerald-700 cursor-pointer">
//                             Clear
//                         </button>
//                         <button type="button" onClick={handleToday} className="text-[12.5px] font-semibold text-emerald-600 hover:text-emerald-700 cursor-pointer">
//                             Today
//                         </button>
//                     </div>

//                 </div>
//             )}

//         </div>
//     );
// }