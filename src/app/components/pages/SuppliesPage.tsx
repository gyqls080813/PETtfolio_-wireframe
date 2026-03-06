import { useState } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  Bell,
  ShoppingCart,
  Dog,
  Cat,
  Package,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

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

export default function SuppliesPage() {
  const [showAdd, setShowAdd] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [filterCat, setFilterCat] = useState("전체");
  const [filterPet, setFilterPet] = useState("전체");
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

  const DAY_WIDTH = 56; // Pixels per day

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
    .filter(item => filterCat === "전체" || item.category === filterCat)
    .filter(item => filterPet === "전체" || item.pet === filterPet)
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

  const displayedItems = showAll ? timelineItems : timelineItems.slice(0, 5);

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

  const getWidthPercent = (start: Date, end: Date) => {
    return Math.max(1, getXPercent(end) - getXPercent(start));
  };

  return (
    <div className="space-y-5">
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

        <div className="flex items-center gap-2">
          {/* Filters */}
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            className="border border-[#E8E8E8] rounded-xl px-2 py-1.5 text-[12px] outline-none"
          >
            <option value="전체">카테고리: 전체</option>
            <option value="사료">사료</option>
            <option value="간식">간식</option>
            <option value="위생/소모품">위생/소모품</option>
            <option value="약/영양제">약/영양제</option>
            <option value="용품">용품</option>
          </select>
          <select
            value={filterPet}
            onChange={(e) => setFilterPet(e.target.value)}
            className="border border-[#E8E8E8] rounded-xl px-2 py-1.5 text-[12px] outline-none"
          >
            <option value="전체">펫: 전체</option>
            <option value="초코">초코</option>
            <option value="나비">나비</option>
          </select>

          <button
            className="flex items-center gap-1.5 px-3 py-2 text-white rounded-xl text-[13px] hover:opacity-90 transition-opacity active:scale-95 ml-2"
            style={{ background: "linear-gradient(135deg, var(--app-primary), var(--app-primary-dark))", fontWeight: 600 }}
            onClick={() => setShowAdd(true)}
          >
            <Plus className="w-4 h-4" />
            품목 추가
          </button>
        </div>
      </div>

      {/* Add Form Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-xl">
            <button
              className="absolute top-4 right-4 text-[#AAA] hover:text-[#333] transition-colors"
              onClick={() => setShowAdd(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </button>
            <h3 className="text-[18px] text-[var(--app-text-main)] mb-5" style={{ fontWeight: 700 }}>품목 추가</h3>
            <div className="space-y-4">
              <div>
                <label className="text-[13px] text-[#333] mb-1 block" style={{ fontWeight: 600 }}>품목 이름</label>
                <input placeholder="예: Royal Canin 사료" className="w-full border border-[#E8E8E8] rounded-xl px-3 py-2.5 bg-white text-[14px] outline-none placeholder:text-[#AAA] focus:border-[var(--app-primary)]" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[13px] text-[#333] mb-1 block" style={{ fontWeight: 600 }}>카테고리</label>
                  <select className="w-full border border-[#E8E8E8] rounded-xl px-3 py-2.5 bg-white text-[14px] outline-none focus:border-[var(--app-primary)]">
                    <option>사료</option>
                    <option>간식</option>
                    <option>위생/소모품</option>
                    <option>약/영양제</option>
                    <option>용품</option>
                    <option>기타</option>
                  </select>
                </div>
                <div>
                  <label className="text-[13px] text-[#333] mb-1 block" style={{ fontWeight: 600 }}>반려동물</label>
                  <select className="w-full border border-[#E8E8E8] rounded-xl px-3 py-2.5 bg-white text-[14px] outline-none focus:border-[var(--app-primary)]">
                    <option>초코</option>
                    <option>나비</option>
                    <option>전체</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[13px] text-[#333] mb-1 block" style={{ fontWeight: 600 }}>금액</label>
                <div className="relative">
                  <input placeholder="0" className="w-full border border-[#E8E8E8] rounded-xl px-3 py-2.5 bg-white text-[14px] outline-none placeholder:text-[#AAA] focus:border-[var(--app-primary)]" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] text-[14px]">원</span>
                </div>
              </div>
              <div>
                <label className="text-[13px] text-[#333] mb-1 block" style={{ fontWeight: 600 }}>구매 주기 (일)</label>
                <div className="relative">
                  <input type="number" placeholder="30" className="w-full border border-[#E8E8E8] rounded-xl px-3 py-2.5 bg-white text-[14px] outline-none placeholder:text-[#AAA] focus:border-[var(--app-primary)]" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] text-[14px]">일마다</span>
                </div>
              </div>
              <div>
                <label className="text-[13px] text-[#333] mb-1 block" style={{ fontWeight: 600 }}>구매 URL (선택)</label>
                <input placeholder="https://..." className="w-full border border-[#E8E8E8] rounded-xl px-3 py-2.5 bg-white text-[14px] outline-none placeholder:text-[#AAA] focus:border-[var(--app-primary)]" />
              </div>
            </div>
            <div className="mt-6">
              <button
                className="w-full py-3 text-white rounded-xl text-[14px] hover:opacity-90 active:scale-95 transition-all"
                style={{ background: "#E8A365", fontWeight: 600 }}
                onClick={() => { setShowAdd(false); alert("품목이 추가되었습니다."); }}
              >
                품목 추가하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Supplies Timeline Container */}
      <div className="border border-[var(--app-border)] rounded-2xl bg-[#FAFAFA] overflow-hidden shadow-sm flex flex-col" style={{ height: "460px" }}>

        {/* Month/Day Headers (Fixed width) */}
        <div className="h-[48px] border-b border-[var(--app-border)] bg-[var(--app-bg-main)] flex w-full">
          {dateHeaders.map((date, i) => {
            const isFirstDay = date.getDate() === 1 || i === 0;
            const isToday = date.getTime() === today.getTime();
            return (
              <div key={i} className="flex-1 flex flex-col items-center justify-end pb-1.5 border-r border-[var(--app-border)]/50 relative min-w-[20px]">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] mt-auto font-medium transition-colors ${isToday ? 'bg-[var(--app-danger)] text-white shadow-sm font-bold' : 'text-[#888]'}`}>
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
                <div key={i} className={`flex-1 border-r border-[var(--app-border)]/40 transition-colors ${isOdd ? 'bg-[var(--app-bg-main)]/40' : 'bg-white'}`} />
              );
            })}
          </div>

          {/* Today Marker Line */}
          {today >= minDate && today <= maxDate && (
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-[var(--app-danger)]/40 z-20 pointer-events-none"
              style={{ left: `${getXPercent(today) + (100 / daysInMonth) / 2}%`, transform: 'translateX(-50%)' }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--app-danger)]" />
            </div>
          )}

          {/* Timeline Bars Area (Scrollable Y) */}
          <div className="absolute inset-0 overflow-y-auto custom-scrollbar z-10 w-full pt-3 pb-4">
            <div className="relative w-full min-h-full">
              {displayedItems.map((item, i) => {
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
                        <div className={`absolute inset-y-0 left-0 opacity-15 transition-all pointer-events-none w-full ${isLapsed ? 'bg-[var(--app-danger)]' : 'bg-[var(--app-warning)]'}`}></div>
                      )}

                      {/* Content inside bar */}
                      <div
                        className="relative z-10 flex items-center gap-2 pl-2 w-full min-w-0 pr-24 h-full"
                      >
                        <img
                          src={getPetSticker(item.pet, item.category)}
                          alt={item.pet}
                          className={`w-[38px] h-[38px] rounded-full object-cover bg-white/80 border shadow-sm flex-shrink-0 z-10 ${isLapsed ? 'border-[var(--app-danger)]/40' : 'border-black/5'}`}
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
                              <span className="text-[9.5px] font-bold text-[var(--app-danger)] flex items-center gap-0.5 bg-white/70 px-1 rounded">
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
                        <span style={{ color: isLapsed ? '#FF8A8A' : isCritical ? '#FFB8A3' : 'var(--app-border)' }}>
                          {item.daysLeft > 0 ? `${item.daysLeft}일 후 소진 (주기: ${item.cycle}일)` : `${Math.abs(item.daysLeft)}일 지남 (주기: ${item.cycle}일)`}
                        </span>
                        <div className="absolute top-full left-4 border-[5px] border-transparent border-t-[#4A3F35]"></div>
                      </div>

                      {/* Actions mapped directly on the bar (right-aligned) */}
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-white/80 backdrop-blur-[2px] rounded-full p-1.5 z-20 shadow-sm border border-black/5">
                        {item.daysLeft <= 7 && (
                          <button className="flex items-center justify-center w-[26px] h-[26px] bg-[#FFF0F0] hover:bg-[#FFE5E5] text-[var(--app-danger)] rounded-full transition-colors" title="바로 구매">
                            <ShoppingCart className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          className="flex items-center justify-center w-[26px] h-[26px] bg-white hover:bg-[#F5F0E6] text-[#A09080] rounded-full transition-colors border border-black/5" title="수정"
                          onClick={() => { setShowAdd(true); alert("수정 모드로 엽니다."); }}
                        >
                          <Edit3 className="w-3 h-3" />
                        </button>
                        <button
                          className="flex items-center justify-center w-[26px] h-[26px] bg-white hover:bg-[#FFF0F0] text-[var(--app-danger)] rounded-full transition-colors border border-black/5" title="삭제"
                          onClick={() => alert("품목이 삭제되었습니다.")}
                        >
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

      {!showAll && timelineItems.length > 5 && (
        <div className="flex justify-center mt-3">
          <button
            className="text-[13px] text-[#A09080] border border-[var(--app-border)] rounded-lg px-4 py-2 hover:bg-[var(--app-bg-secondary)] transition-colors font-medium bg-white"
            onClick={() => setShowAll(true)}
          >
            더보기 ({timelineItems.length - 5}개 접힘)
          </button>
        </div>
      )}
      {showAll && timelineItems.length > 5 && (
        <div className="flex justify-center mt-3">
          <button
            className="text-[13px] text-[#A09080] border border-[var(--app-border)] rounded-lg px-4 py-2 hover:bg-[var(--app-bg-secondary)] transition-colors font-medium bg-white"
            onClick={() => setShowAll(false)}
          >
            접기
          </button>
        </div>
      )}
    </div>
  );
}