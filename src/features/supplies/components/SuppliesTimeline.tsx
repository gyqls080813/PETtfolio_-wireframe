"use client";
import { useState } from "react";
import {
    Plus,
    Edit3,
    Trash2,
    ShoppingCart,
    Dog,
    Cat,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { useSetAtom } from "jotai";
import { showAddSupplyModalAtom } from "../store";

const supplies = [
    {
        id: 1,
        name: "오리젠 퍼피 사료 11.4kg",
        category: "사료",
        price: 89000,
        pet: "초코",
        petIcon: Dog,
        url: "https://example.com",
        lastPurchase: "2026-03-13",
        cycle: 61,
    },
    {
        id: 2,
        name: "져키 간식 (소고기)",
        category: "간식",
        price: 12500,
        pet: "초코",
        petIcon: Dog,
        url: "https://example.com",
        lastPurchase: "2026-03-02",
        cycle: 15,
    },
    {
        id: 3,
        name: "로얄캐닌 인도어 4kg",
        category: "사료",
        price: 45000,
        pet: "나비",
        petIcon: Cat,
        url: "https://example.com",
        lastPurchase: "2026-03-03",
        cycle: 31,
    },
    {
        id: 4,
        name: "관절 영양제 (조인트에이드)",
        category: "약/영양제",
        price: 35000,
        pet: "나비",
        petIcon: Cat,
        url: "https://example.com",
        lastPurchase: "2026-03-20",
        cycle: 13,
    },
    {
        id: 5,
        name: "모래 (후드형)",
        category: "위생/소모품",
        price: 15000,
        pet: "나비",
        petIcon: Cat,
        url: "https://example.com",
        lastPurchase: "2026-03-19",
        cycle: 75,
    },
    {
        id: 6,
        name: "넥스가드 스펙트라 (예방약)",
        category: "약/영양제",
        price: 24000,
        pet: "초코",
        petIcon: Dog,
        url: "https://example.com",
        lastPurchase: "2026-03-02",
        cycle: 100,
    },
];

export function SuppliesTimeline() {
    const setShowAdd = useSetAtom(showAddSupplyModalAtom);
    const today = new Date(2026, 2, 5); // 2026-03-05
    const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

    const parseDate = (dateStr: string) => {
        const [y, m, d] = dateStr.split('-').map(Number);
        return new Date(y, m - 1, d);
    };

    const getPetSticker = (pet: string, category: string) => {
        const isHappy = category === "사료" || category === "간식";
        const petEn = pet === "초코" ? "choco" : pet === "나비" ? "nabi" : "choco";
        return `/pets/${petEn}${isHappy ? "_happy" : ""}.png`;
    };

    // Configure timeline for the current month window
    const currentYear = viewDate.getFullYear();
    const currentMonth = viewDate.getMonth();
    const minDate = new Date(currentYear, currentMonth, 1);
    const maxDate = new Date(currentYear, currentMonth + 1, 0); // Last day of the current month

    const totalDays = Math.ceil((maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
    const dateHeaders = [];
    for (let i = 0; i <= totalDays; i++) {
        const d = new Date(minDate);
        d.setDate(minDate.getDate() + i);
        dateHeaders.push(d);
    }

    const allTimelineItems = supplies.map(s => {
        const startDate = parseDate(s.lastPurchase);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + s.cycle);
        const daysLeft = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return { ...s, startDate, endDate, daysLeft, originalStart: startDate, originalEnd: endDate };
    });

    const timelineItems = allTimelineItems
        .filter(item => item.originalStart <= maxDate && item.originalEnd >= minDate)
        .sort((a, b) => a.originalEnd.getTime() - b.originalEnd.getTime())
        .map(item => {
            // Bound visually to maxDate + 1 day to cover the last block fully
            const boundMaxDate = new Date(currentYear, currentMonth + 1, 1);
            return {
                ...item,
                startDate: item.originalStart < minDate ? minDate : item.originalStart,
                endDate: item.originalEnd > boundMaxDate ? boundMaxDate : item.originalEnd
            };
        });

    const getPetTheme = (pet: string) => {
        switch (pet) {
            case "초코": return { color: "#D4A574", bg: "#FDF8F3", border: "#E8D5C0" };
            case "나비": return { color: "#8B9BB4", bg: "#F4F6F9", border: "#DDE3ED" };
            default: return { color: "#A8A8A8", bg: "#F8F8F8", border: "#E0E0E0" };
        }
    };

    const daysInMonth = dateHeaders.length;

    const getXPercent = (date: Date) => {
        const diffDays = (date.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24);
        return Math.max(0, Math.min(100, (diffDays / daysInMonth) * 100));
    };

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setViewDate(new Date(currentYear, currentMonth - 1, 1))}
                        className="p-1.5 rounded-lg hover:bg-[#E8D5C0]/30 text-[#A09080] transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <h2 className="text-[18px] font-bold text-[#3D3229]">
                        {currentYear}년 {currentMonth + 1}월
                    </h2>
                    <button
                        onClick={() => setViewDate(new Date(currentYear, currentMonth + 1, 1))}
                        className="p-1.5 rounded-lg hover:bg-[#E8D5C0]/30 text-[#A09080] transition-colors"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
                <button
                    className="flex items-center gap-1.5 px-3 py-2 text-white rounded-xl text-[13px] hover:opacity-90 transition-opacity active:scale-95"
                    style={{ background: "linear-gradient(135deg, #D4A574, #C4956A)", fontWeight: 600 }}
                    onClick={() => setShowAdd(true)}
                >
                    <Plus className="w-4 h-4" />
                    품목 추가
                </button>
            </div>

            {/* Supplies Timeline Container */}
            <div className="border border-[#E8D5C0] rounded-2xl bg-[#FAFAFA] overflow-hidden shadow-sm flex flex-col" style={{ height: "460px" }}>

                {/* Month/Day Headers (Fixed width) */}
                <div className="h-[48px] border-b border-[#E8D5C0] bg-[#FFF8EE] flex w-full">
                    {dateHeaders.map((date, i) => {
                        const isFirstDay = date.getDate() === 1 || i === 0;
                        const isToday = date.getTime() === today.getTime();
                        return (
                            <div key={i} className="flex-1 flex flex-col items-center justify-end pb-1.5 border-r border-[#E8D5C0]/50 relative min-w-[20px]">
                                {isFirstDay && (
                                    <span className="absolute top-1 left-1.5 text-[10px] font-bold text-[#D4A574] z-10 hidden sm:block">{date.getMonth() + 1}월</span>
                                )}
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] mt-auto font-medium transition-colors ${isToday ? 'bg-[#FF6B6B] text-white shadow-sm font-bold' : 'text-[#888]'}`}>
                                    {date.getDate()}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Scrollable Timeline Area */}
                <div className="flex-1 w-full relative overflow-hidden bg-[#FAFAFA]">
                    {/* Grid Lines (Background) */}
                    <div className="absolute top-0 left-0 right-0 bottom-0 flex z-0 pointer-events-none">
                        {dateHeaders.map((date, i) => {
                            const isOdd = date.getDate() % 2 !== 0; // Alternating even/odd day styling
                            return (
                                <div key={i} className={`flex-1 border-r border-[#E8D5C0]/40 transition-colors ${isOdd ? 'bg-[#FFF8EE]/40' : 'bg-white'}`} />
                            );
                        })}
                    </div>

                    {/* Today Marker Line */}
                    {today >= minDate && today <= maxDate && (
                        <div
                            className="absolute top-0 bottom-0 w-[2px] bg-[#FF6B6B]/40 z-20 pointer-events-none"
                            style={{ left: `${getXPercent(today) + (100 / daysInMonth) / 2}%`, transform: 'translateX(-50%)' }}
                        >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FF6B6B]" />
                        </div>
                    )}

                    {/* Timeline Bars Area (Scrollable Y) */}
                    <div className="absolute inset-0 overflow-y-auto custom-scrollbar z-10 w-full pt-3 pb-4">
                        <div className="relative w-full min-h-full">
                            {timelineItems.map((item, i) => {
                                const startX = getXPercent(item.startDate);
                                const endX = getXPercent(item.endDate);
                                const width = Math.max(endX - startX, 1);

                                const isCritical = item.daysLeft <= 7;
                                const isLapsed = item.daysLeft <= 0;

                                // Use pet-based colors
                                const petTheme = getPetTheme(item.pet);
                                const barColor = petTheme.color;
                                const barBg = petTheme.bg;
                                const barBorder = petTheme.border;

                                // Indicates if the bar is cut off at the ends based on real ranges
                                const isCutStart = item.originalStart < item.startDate;
                                const isCutEnd = item.originalEnd > item.endDate;

                                return (
                                    <div key={item.id} className="relative h-[68px] flex items-center pointer-events-auto group/bar mb-2.5 w-full">
                                        <div
                                            className="absolute h-[52px] shadow-[0_2px_4px_rgba(0,0,0,0.02)] flex items-center relative transition-transform hover:-translate-y-[1px] cursor-pointer overflow-hidden rounded-full border"
                                            style={{
                                                left: `${startX}%`,
                                                width: `${width}%`,
                                                backgroundColor: barBg,
                                                borderColor: barBorder,
                                            }}
                                        >
                                            {/* Status indicators for lapse/critical */}
                                            {(isLapsed || isCritical) && (
                                                <div className={`absolute inset-y-0 left-0 opacity-15 transition-all pointer-events-none w-full ${isLapsed ? 'bg-[#FF6B6B]' : 'bg-[#E17055]'}`}></div>
                                            )}

                                            {/* Content inside bar */}
                                            <div
                                                className="relative z-10 flex items-center gap-2 pl-2 w-full min-w-0 pr-24 h-full"
                                            >
                                                <img
                                                    src={getPetSticker(item.pet, item.category)}
                                                    alt={item.pet}
                                                    className={`w-[38px] h-[38px] rounded-full object-cover bg-white/80 border shadow-sm flex-shrink-0 z-10 ${isLapsed ? 'border-[#FF6B6B]/40' : 'border-black/5'}`}
                                                />
                                                <div className="flex flex-col truncate flex-1 min-w-0 pointer-events-none z-10">
                                                    <span className="text-[12.5px] font-bold truncate drop-shadow-sm leading-tight text-[#333]">
                                                        {item.name}
                                                    </span>
                                                    <div className="flex gap-1.5 items-center mt-0.5" style={{ color: barColor }}>
                                                        <span className="text-[10px] font-semibold px-1.5 rounded-[4px] bg-black/5 mix-blend-multiply">
                                                            {item.category}
                                                        </span>
                                                        {isLapsed && (
                                                            <span className="text-[9.5px] font-bold text-[#FF6B6B] flex items-center gap-0.5 bg-white/70 px-1 rounded">
                                                                소진됨
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Tooltip on hover (shows original real dates) */}
                                            <div className="absolute bottom-full left-[24px] mb-[4px] px-3 py-2 bg-[#4A3F35] text-white text-[11px] rounded-[10px] opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-lg font-medium flex flex-col items-center gap-1 w-max">
                                                <span>{item.originalStart.toLocaleDateString('ko-KR')} ~ {item.originalEnd.toLocaleDateString('ko-KR')}</span>
                                                <div className="w-full h-[0.5px] bg-white/20 my-px"></div>
                                                <span style={{ color: isLapsed ? '#FF8A8A' : isCritical ? '#FFB8A3' : '#E8D5C0' }}>
                                                    {item.daysLeft > 0 ? `${item.daysLeft}일 후 소진 (주기: ${item.cycle}일)` : `${Math.abs(item.daysLeft)}일 지남 (주기: ${item.cycle}일)`}
                                                </span>
                                                <div className="absolute top-full left-4 border-[5px] border-transparent border-t-[#4A3F35]"></div>
                                            </div>

                                            {/* Actions mapped directly on the bar (right-aligned) */}
                                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-white/80 backdrop-blur-[2px] rounded-full p-1.5 z-20 shadow-sm border border-black/5">
                                                {item.daysLeft <= 7 && (
                                                    <button className="flex items-center justify-center w-[26px] h-[26px] bg-[#FFF0F0] hover:bg-[#FFE5E5] text-[#FF6B6B] rounded-full transition-colors" title="바로 구매">
                                                        <ShoppingCart className="w-3.5 h-3.5" />
                                                    </button>
                                                )}
                                                <button className="flex items-center justify-center w-[26px] h-[26px] bg-white hover:bg-[#F5F0E6] text-[#A09080] rounded-full transition-colors border border-black/5" title="수정">
                                                    <Edit3 className="w-3 h-3" />
                                                </button>
                                                <button className="flex items-center justify-center w-[26px] h-[26px] bg-white hover:bg-[#FFF0F0] text-[#FF6B6B] rounded-full transition-colors border border-black/5" title="삭제">
                                                    <Trash2 className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
