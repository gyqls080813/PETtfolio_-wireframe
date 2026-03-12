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
    Package,
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
    const [supplyList, setSupplyList] = useState(supplies);


    const parseDate = (dateStr: string) => {
        const [y, m, d] = dateStr.split('-').map(Number);
        return new Date(y, m - 1, d);
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case "사료": return { bg: "#FFF3E0", text: "#E65100", dot: "#FF9800" };
            case "간식": return { bg: "#FFF8E1", text: "#F57F17", dot: "#FFC107" };
            case "약/영양제": return { bg: "#E8F5E9", text: "#2E7D32", dot: "#4CAF50" };
            case "위생/소모품": return { bg: "#E3F2FD", text: "#1565C0", dot: "#2196F3" };
            default: return { bg: "#F5F5F5", text: "#616161", dot: "#9E9E9E" };
        }
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

    const allTimelineItems = supplyList.map(s => {
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
            case "초코": return { color: "var(--app-primary)", bg: "#FDF8F3", border: "var(--app-border)" };
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
        <div className="flex flex-col gap-5" style={{ minHeight: 'calc(100vh - 170px)' }}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setViewDate(new Date(currentYear, currentMonth - 1, 1))}
                        className="p-1.5 rounded-lg hover:bg-[var(--app-border)]/30 text-[#A09080] transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <h2 className="text-[18px] font-bold text-[var(--app-text-main)]">
                        {currentYear}년 {currentMonth + 1}월
                    </h2>
                    <button
                        onClick={() => setViewDate(new Date(currentYear, currentMonth + 1, 1))}
                        className="p-1.5 rounded-lg hover:bg-[var(--app-border)]/30 text-[#A09080] transition-colors"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Supplies Timeline Container */}
            <div className="border border-[var(--app-border)] rounded-2xl bg-white overflow-hidden shadow-sm flex flex-col" style={{ height: "320px" }}>

                {/* Month/Day Headers — Notion-style compact */}
                <div className="h-[32px] border-b border-[var(--app-border)] bg-[#FAFAFA] flex w-full">
                    {dateHeaders.map((date, i) => {
                        const isToday = date.getTime() === today.getTime();
                        const isSunday = date.getDay() === 0;
                        return (
                            <div key={i} className="flex-1 flex flex-col items-center justify-center border-r border-[var(--app-border)]/30 relative min-w-[16px]">
                                <span className={`text-[9px] leading-none font-medium ${
                                    isToday ? 'bg-[var(--app-danger)] text-white w-4 h-4 rounded-full flex items-center justify-center font-bold' 
                                    : isSunday ? 'text-[var(--app-danger)]/60' 
                                    : 'text-[#AAA]'
                                }`}>
                                    {date.getDate()}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Scrollable Timeline Area */}
                <div className="flex-1 w-full relative overflow-hidden bg-white">
                    {/* Grid Lines — subtle Notion-style */}
                    <div className="absolute top-0 left-0 right-0 bottom-0 flex z-0 pointer-events-none">
                        {dateHeaders.map((_, i) => (
                            <div key={i} className="flex-1 border-r border-[var(--app-border)]/20" />
                        ))}
                    </div>

                    {/* Today Marker Line */}
                    {today >= minDate && today <= maxDate && (
                        <div
                            className="absolute top-0 bottom-0 w-[1.5px] bg-[var(--app-danger)] z-20 pointer-events-none"
                            style={{ left: `${getXPercent(today) + (100 / daysInMonth) / 2}%`, transform: 'translateX(-50%)' }}
                        >
                            <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[var(--app-danger)]" />
                        </div>
                    )}

                    {/* Timeline Bars Area (Scrollable Y) */}
                    <div className="absolute inset-0 overflow-y-auto custom-scrollbar z-10 w-full pt-2 pb-3">
                        <div className="relative w-full min-h-full">
                            {timelineItems.map((item, i) => {
                                const startX = getXPercent(item.startDate);
                                const endX = getXPercent(item.endDate);
                                const width = Math.max(endX - startX, 2);

                                const isCritical = item.daysLeft <= 7;
                                const isLapsed = item.daysLeft <= 0;

                                const catColor = getCategoryColor(item.category);
                                const petTheme = getPetTheme(item.pet);

                                return (
                                    <div key={item.id} className="relative h-[34px] flex items-center pointer-events-auto group/bar w-full">
                                        <div
                                            className={`absolute h-[26px] flex items-center cursor-pointer overflow-hidden rounded-md border transition-all hover:shadow-md hover:-translate-y-[1px] ${
                                                isLapsed ? 'border-[var(--app-danger)]/40 bg-[#FFF5F5]' : isCritical ? 'border-[var(--app-warning)]/40 bg-[#FFFCF5]' : 'border-[var(--app-border)]/60'
                                            }`}
                                            style={{
                                                left: `${startX}%`,
                                                width: `${width}%`,
                                                backgroundColor: isLapsed ? undefined : isCritical ? undefined : petTheme.bg,
                                            }}
                                        >
                                            {/* Progress fill */}
                                            {!isLapsed && !isCritical && (
                                                <div className="absolute inset-y-0 left-0 opacity-30 rounded-md" style={{ width: '100%', backgroundColor: petTheme.color }} />
                                            )}

                                            {/* Content: tags + name */}
                                            <div className="relative z-10 flex items-center gap-1.5 px-2 w-full min-w-0 h-full">
                                                {/* Category tag */}
                                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 leading-none" style={{ backgroundColor: catColor.bg, color: catColor.text }}>
                                                    {item.category}
                                                </span>
                                                {/* Pet tag */}
                                                <span className="text-[9px] font-semibold px-1 py-0.5 rounded flex-shrink-0 leading-none" style={{ backgroundColor: petTheme.bg, color: petTheme.color, border: `1px solid ${petTheme.border}` }}>
                                                    {item.pet}
                                                </span>
                                                {/* Item name */}
                                                <span className="text-[10px] font-medium truncate text-[#555] flex-1 min-w-0">
                                                    {item.name}
                                                </span>
                                                {/* Status badge */}
                                                {isLapsed && (
                                                    <span className="text-[8px] font-bold text-[var(--app-danger)] bg-[var(--app-danger)]/10 px-1 py-0.5 rounded flex-shrink-0">소진</span>
                                                )}
                                                {isCritical && !isLapsed && (
                                                    <span className="text-[8px] font-bold text-[var(--app-warning)] bg-[var(--app-warning)]/10 px-1 py-0.5 rounded flex-shrink-0">{item.daysLeft}일</span>
                                                )}
                                            </div>

                                            {/* Tooltip on hover */}
                                            <div className="absolute bottom-full left-2 mb-1 px-2.5 py-1.5 bg-[#333] text-white text-[10px] rounded-lg opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-lg font-medium flex flex-col gap-0.5">
                                                <span className="font-bold">{item.name}</span>
                                                <span className="text-white/70">{item.originalStart.toLocaleDateString('ko-KR')} ~ {item.originalEnd.toLocaleDateString('ko-KR')}</span>
                                                <span style={{ color: isLapsed ? '#FF8A8A' : isCritical ? '#FFB8A3' : '#AAA' }}>
                                                    {item.daysLeft > 0 ? `${item.daysLeft}일 후 소진 · 주기 ${item.cycle}일` : `${Math.abs(item.daysLeft)}일 지남 · 주기 ${item.cycle}일`}
                                                </span>
                                                <div className="absolute top-full left-3 border-[4px] border-transparent border-t-[#333]" />
                                            </div>

                                            {/* Actions on hover */}
                                            <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm rounded-md px-1 py-0.5 z-20 shadow-sm border border-black/5">
                                                {item.daysLeft <= 7 && (
                                                    <button className="w-5 h-5 flex items-center justify-center text-[var(--app-danger)] hover:bg-[#FFF0F0] rounded transition-colors" title="구매">
                                                        <ShoppingCart className="w-3 h-3" />
                                                    </button>
                                                )}
                                                <button className="w-5 h-5 flex items-center justify-center text-[#A09080] hover:bg-[#F5F0E6] rounded transition-colors" title="수정">
                                                    <Edit3 className="w-2.5 h-2.5" />
                                                </button>
                                                <button className="w-5 h-5 flex items-center justify-center text-[var(--app-danger)] hover:bg-[#FFF0F0] rounded transition-colors" title="삭제">
                                                    <Trash2 className="w-2.5 h-2.5" />
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

            {/* ═══ 소모품 관리 섹션 ═══ */}
            <div className="bg-white rounded-2xl border border-[var(--app-border)] shadow-sm overflow-hidden flex flex-col flex-1">
                <div className="px-5 py-4 border-b border-[var(--app-border)] flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2">
                        <Package className="w-5 h-5 text-[var(--app-primary)]" strokeWidth={1.5} />
                        <h3 className="text-[16px] font-bold text-[var(--app-text-main)]">소모품 관리</h3>
                        <span className="text-[11px] text-[var(--app-text-tertiary)] bg-[var(--app-bg-tertiary)] px-2 py-0.5 rounded-full font-medium">{supplyList.length}개</span>
                    </div>
                    <button
                        className="flex items-center gap-1.5 px-3 py-2 text-white rounded-xl text-[13px] hover:opacity-90 transition-opacity active:scale-95"
                        style={{ background: "linear-gradient(135deg, var(--app-primary), var(--app-primary-dark))", fontWeight: 600 }}
                        onClick={() => setShowAdd(true)}
                    >
                        <Plus className="w-4 h-4" />
                        품목 추가
                    </button>
                </div>

                {/* 품목 리스트 (스크롤) */}
                <div className="flex-1 overflow-y-auto min-h-0">
                    <div className="divide-y divide-[var(--app-border)]/60">
                        {supplyList.map((item) => {
                            const daysLeft = Math.ceil((parseDate(item.lastPurchase).getTime() + item.cycle * 86400000 - today.getTime()) / 86400000);
                            const isUrgent = daysLeft <= 7;
                            const isExpired = daysLeft <= 0;
                            const catColor = getCategoryColor(item.category);

                            return (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between px-5 py-3.5 hover:bg-[var(--app-bg-main)] transition-colors cursor-pointer group"
                                    onClick={() => setShowAdd(true)}
                                >
                                    {/* 좌측: 반려동물 · 품목명 */}
                                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0" style={{ backgroundColor: catColor.bg, color: catColor.text }}>
                                            {item.category}
                                        </span>
                                        <span className="text-[13px] text-[var(--app-text-main)] font-medium truncate">
                                            {item.pet} · {item.name}
                                        </span>
                                    </div>

                                    {/* 우측: 남은 날짜 + 액션 */}
                                    <div className="flex items-center gap-2 shrink-0 ml-3">
                                        <span className={`text-[12px] font-bold whitespace-nowrap ${
                                            isExpired ? 'text-[var(--app-danger)]' : isUrgent ? 'text-[var(--app-warning)]' : 'text-[var(--app-text-tertiary)]'
                                        }`}>
                                            {isExpired ? '소진됨' : `${daysLeft}일 남음`}
                                        </span>
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                className="w-6 h-6 rounded-full bg-white border border-[var(--app-border)] flex items-center justify-center hover:bg-[#F5F0E6] transition-colors"
                                                onClick={(e) => { e.stopPropagation(); setShowAdd(true); }}
                                                title="수정"
                                            >
                                                <Edit3 className="w-3 h-3 text-[#A09080]" />
                                            </button>
                                            <button
                                                className="w-6 h-6 rounded-full bg-white border border-[var(--app-border)] flex items-center justify-center hover:bg-[#FFF0F0] transition-colors"
                                                onClick={(e) => { e.stopPropagation(); setSupplyList(prev => prev.filter(s => s.id !== item.id)); }}
                                                title="삭제"
                                            >
                                                <Trash2 className="w-3 h-3 text-[var(--app-danger)]" />
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
    );
}
