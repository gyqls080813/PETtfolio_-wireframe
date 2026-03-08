import { useState, useRef } from "react";
import { motion } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Camera,
  Filter,
  List,
  CalendarDays,
  Tag,
  ChevronDown,
  X,
  PlusCircle,
  Receipt,
  Pencil,
} from "lucide-react";
import SwipeCarousel from "../../shared/components/SwipeCarousel";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  Tooltip,
  LabelList,
} from "recharts";

// 펫 스티커 이미지
import stickerThumbsup from "../../assets/pome_thumbsup.png";
import stickerSad from "../../assets/pome_sad.png";
import stickerEating from "../../assets/pome_eating.png";
import stickerGrooming from "../../assets/pome_grooming.png";
import stickerHospital from "../../assets/pome_hospital.png";
import stickerSnack from "../../assets/pome_snack.png";
import stickerToys from "../../assets/pome_toys.png";

// 고양이 스티커 이미지
import catThumbsup from "../../assets/cat_thumbsup.png";
import catSad from "../../assets/cat_sad.png";
import catEating from "../../assets/cat_eating.png";
import catGrooming from "../../assets/cat_grooming.png";
import catHospital from "../../assets/cat_hospital.png";
import catSnack from "../../assets/cat_snack.png";
import catToys from "../../assets/cat_toys.png";

import PetAvatar from "../../shared/components/figma/PetAvatar";

const getImgSrc = (img: any) => typeof img === 'string' ? img : img?.src || img;

const categories = [
  { name: "사료", color: "var(--app-primary)" },
  { name: "간식", color: "var(--app-warning)" },
  { name: "위생/소모품", color: "var(--app-success)" },
  { name: "병원/의료", color: "#EF4444" },
  { name: "약/영양제", color: "#FDCB6E" },
  { name: "미용", color: "#FD79A8" },
  { name: "용품", color: "#74B9FF" },
  { name: "돌봄/서비스", color: "var(--app-primary-dark)" },
  { name: "보험/저축", color: "#8B5CF6" },
  { name: "기타", color: "#B2BEC3" },
];

const transactions = [
  { date: "03/04", cat: "사료", desc: "오리젠 퍼피", amount: "89,000", type: "auto", pet: "초코" },
  { date: "03/03", cat: "병원/의료", desc: "정기 검진", amount: "45,000", type: "manual", pet: "나비" },
  { date: "03/02", cat: "간식", desc: "져키 간식", amount: "12,500", type: "auto", pet: "초코" },
  { date: "03/01", cat: "미용", desc: "목욕 + 미용", amount: "50,000", type: "manual", pet: "초코" },
  { date: "02/28", cat: "약/영양제", desc: "관절 영양제", amount: "35,000", type: "auto", pet: "나비" },
  { date: "02/27", cat: "용품", desc: "신규 장난감", amount: "18,000", type: "manual", pet: "초코" },
];

const cashFlowData = [
  { date: "10/13", savings: 2500000, expense: 0, balance: 2500000 },
  { date: "10/15", savings: 2150000, expense: 0, balance: 2150000 },
  { date: "10/25", savings: 50000, expense: 0, balance: 50000 },
  { date: "10/28", savings: 0, expense: -160000, balance: -160000 },
  { date: "10/30", savings: 0, expense: -300000, balance: -300000 },
];

const daysInMonth = 31;
const startDay = 6;

export default function LedgerPage() {
  const [selectedPet, setSelectedPet] = useState<string>("전체");
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  
  // Modals state
  const [showAdd, setShowAdd] = useState(false);
  const [showPendingModal, setShowPendingModal] = useState(false);
  const [editTransaction, setEditTransaction] = useState<any>(null); // For Add/Edit Modal
  
  const isCat = selectedPet === "나비" || selectedPet === "고양이";

  // State for Calendar Data to allow dynamic updates
  const [calData, setCalData] = useState<Record<number, { exp?: number; inc?: number }>>({
    1: { exp: 1200 }, 2: { exp: 20000, inc: 2530688 }, 3: { exp: 100000, inc: 2 },
    5: { exp: 4999 }, 6: { exp: 102110 },
    8: { exp: 326000 }, 9: { inc: 10000 }, 10: { exp: 17000 }, 11: { exp: 2400 }, 12: { inc: 11000 }, 13: { exp: 6000 }, 14: { exp: 22000 },
    15: { exp: 14200 }, 16: { exp: 30000 }, 17: { inc: 103507 }, 18: { inc: 2 }, 19: { exp: 54842, inc: 5400 }, 20: { exp: 126484 }, 21: { exp: 10000 },
    22: { exp: 14000 }, 23: { exp: 14000 }, 24: { inc: 50460 }, 25: { exp: 6500 }, 26: { exp: 110000 }, 27: { exp: 49390, inc: 24500 }, 28: { inc: 9500 },
    29: { exp: 2900 }, 31: { exp: 5300, inc: 1000 },
  });

  // New Data: Recent Purchases (replaces category bubble chart)
  const [recentPurchases, setRecentPurchases] = useState([
    { id: 101, date: "2023-12-05", store: "펫프렌즈", amount: 45000, category: "사료" },
    { id: 102, date: "2023-12-10", store: "동물병원", amount: 150000, category: "병원/의료" },
    { id: 103, date: "2023-12-15", store: "쿠팡", amount: 12500, category: "간식" },
    { id: 104, date: "2023-12-22", store: "멍멍토이", amount: 32000, category: "용품" },
    { id: 105, date: "2023-12-28", store: "이마트", amount: 18000, category: "위생/소모품" },
  ]);

  // New Data: Pending Transactions (from the + button)
  const [pendingTransactions, setPendingTransactions] = useState([
    { id: 201, date: "2023-12-01", store: "네이버펫", amount: 28000, category: "사료" },
    { id: 202, date: "2023-12-08", store: "동물약국", amount: 35000, category: "약/영양제" },
    { id: 203, date: "2023-12-19", store: "바잇미", amount: 15000, category: "간식" },
  ]);

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < startDay; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  // 날짜별 펫 스티커 매핑 (활동 유형에 따라 다른 스티커)
  const calendarStickers: Record<number, { img: any; label: string }> = {
    1: { img: isCat ? catGrooming : stickerGrooming, label: "미용" },
    2: { img: isCat ? catThumbsup : stickerThumbsup, label: "저축" },
    3: { img: isCat ? catHospital : stickerHospital, label: "검진" },
    5: { img: isCat ? catEating : stickerEating, label: "간식" },
    6: { img: isCat ? catSad : stickerSad, label: "과소비" },
    8: { img: isCat ? catSad : stickerSad, label: "과소비" },
    9: { img: isCat ? catThumbsup : stickerThumbsup, label: "저축" },
    12: { img: isCat ? catThumbsup : stickerThumbsup, label: "저축" },
    14: { img: isCat ? catEating : stickerEating, label: "사료" },
    17: { img: isCat ? catThumbsup : stickerThumbsup, label: "저축" },
    20: { img: isCat ? catSad : stickerSad, label: "과소비" },
    24: { img: isCat ? catThumbsup : stickerThumbsup, label: "저축" },
    26: { img: isCat ? catHospital : stickerHospital, label: "병원" },
    27: { img: isCat ? catEating : stickerEating, label: "간식" },
    31: { img: isCat ? catGrooming : stickerGrooming, label: "미용" },
  };

  return (
    <div className="space-y-5">
      {/* Pet Selector */}
      <div className="flex gap-2">
        <div
          onClick={() => setSelectedPet("전체")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer transition-all ${selectedPet === "전체" ? "bg-gradient-to-r from-[var(--app-primary)] to-[var(--app-primary-dark)] text-white shadow-md" : "bg-[var(--app-bg-main)] border border-[var(--app-border)] text-[var(--app-text-sub)] hover:border-[var(--app-primary)]/40"}`}
        >
          <span className="text-[13px]" style={{ fontWeight: selectedPet === "전체" ? 600 : 500 }}>전체</span>
        </div>
        <div
          onClick={() => setSelectedPet("초코")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer transition-all ${selectedPet === "초코" || selectedPet === "강아지" ? "bg-[var(--app-primary-light)] border border-[var(--app-primary)]/50 text-[#6B4F3A]" : "bg-[var(--app-bg-main)] border border-[var(--app-border)] text-[var(--app-text-sub)] hover:border-[var(--app-primary)]/40"}`}
        >
          <PetAvatar pet="choco" size="xs" border={false} />
          <span className="text-[13px]" style={{ fontWeight: selectedPet === "초코" ? 600 : 500 }}>초코</span>
        </div>
        <div
          onClick={() => setSelectedPet("나비")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer transition-all ${selectedPet === "나비" || selectedPet === "고양이" ? "bg-[#E8DFD0] border border-[#C4A684]/50 text-[var(--app-text-secondary)]" : "bg-[var(--app-bg-main)] border border-[var(--app-border)] text-[var(--app-text-sub)] hover:border-[#C4A684]/40"}`}
        >
          <PetAvatar pet="nabi" size="xs" border={false} />
          <span className="text-[13px]" style={{ fontWeight: selectedPet === "나비" ? 600 : 500 }}>나비</span>
        </div>
      </div>
      <div className="hidden lg:grid grid-cols-[1.1fr_1fr] gap-5 items-stretch">
        {/* ═══ Left Column: Calendar Box ═══ */}
        <div className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col h-full relative">
          {/* Header */}
          <div className="px-5 pt-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[18px] font-bold text-[var(--app-text-main)] flex items-center gap-1.5">
                12월 내 소비
                <ChevronDown className="w-5 h-5 text-[var(--app-text-tertiary)]" strokeWidth={1.5} />
              </h2>
            </div>

            {/* Summary */}
            <div className="py-3 border-b border-[var(--app-border)] flex justify-between items-center">
              <div>
                <div className="flex items-center gap-4 mb-1">
                  <span className="text-[13px] text-[var(--app-text-sub)] w-8">소비</span>
                  <span className="text-[17px] font-bold text-[var(--app-text-main)]" style={{ fontFamily: "'Nunito', sans-serif" }}>1,625,560 원</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#D9C8B4]" strokeWidth={1.5} />
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="px-5 pb-4 pt-2 flex-1 flex flex-col">
            <div className="grid grid-cols-7 text-center mb-1">
              {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
                <div key={d} className="text-[13px] text-[var(--app-text-tertiary)] font-medium py-2">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 text-center gap-y-0.5 flex-1">
              {calendarDays.map((day, i) => (
                <div
                  key={i}
                  className={`min-h-[72px] flex flex-col items-center rounded-xl transition-colors relative pt-1 ${day ? "cursor-pointer hover:bg-[var(--app-bg-secondary)]" : ""}`}
                  onClick={() => day && setSelectedDay(day)}
                >
                  {day && (
                    <>
                      {/* 펫 스티커 (날짜 위에 반투명하게) */}
                      {calendarStickers[day] && (
                        <img
                          src={getImgSrc(calendarStickers[day].img)}
                          alt={calendarStickers[day].label}
                          className="w-[32px] h-[32px] object-contain absolute -top-1 -right-1 drop-shadow-sm z-10 pointer-events-none"
                          style={{ opacity: 0.9 }}
                        />
                      )}

                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] ${day === 31
                        ? "bg-[var(--app-primary-light)] text-[#6B4F3A] font-bold"
                        : "text-[var(--app-text-secondary)]"
                        }`}>
                        {day}
                      </div>

                      {/* Daily amounts */}
                      <div className="mt-0.5 space-y-[1px]">
                        {calData[day]?.exp ? (
                          <div className="text-[10px] text-[var(--app-text-tertiary)] font-medium leading-none">
                            -{calData[day].exp.toLocaleString()}
                          </div>
                        ) : null}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Daily Details Modal */}
          {selectedDay !== null && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50 p-5 backdrop-blur-sm" onClick={(e) => e.target === e.currentTarget && setSelectedDay(null)}>
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
              >
                <div className="flex justify-between items-center p-5 border-b border-[var(--app-border)]">
                  <div className="flex items-center gap-3">
                    {/* 해당 날짜의 스티커가 있으면 크게 표시 */}
                    {calendarStickers[selectedDay as number] && (
                      <img
                        src={getImgSrc(calendarStickers[selectedDay as number].img)}
                        alt={calendarStickers[selectedDay as number].label}
                        className="w-[64px] h-[64px] object-contain drop-shadow-md"
                      />
                    )}
                    <div>
                      <h3 className="text-[18px] font-bold text-[var(--app-text-main)]">
                        12월 {selectedDay}일 상세 내역
                      </h3>
                      {calendarStickers[selectedDay as number] && (
                        <span className="text-[12px] text-[var(--app-text-tertiary)] mt-0.5 inline-block">
                          오늘의 활동: <span className="text-[var(--app-primary)] font-semibold">{calendarStickers[selectedDay as number].label}</span>
                        </span>
                      )}
                    </div>
                  </div>
                  <button onClick={() => setSelectedDay(null)} className="text-[var(--app-text-tertiary)] hover:text-[var(--app-text-secondary)]">
                    <X className="w-6 h-6" strokeWidth={1.5} />
                  </button>
                </div>

                <div className="p-5 flex-1 overflow-y-auto">
                  {/* 소비 내역 */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-[15px] font-bold text-[#EF4444]">소비 내역</h4>
                      <span className="text-[14px] font-semibold text-[#EF4444]">
                        -{calData[selectedDay as number]?.exp?.toLocaleString() || 0}원
                      </span>
                    </div>
                    {calData[selectedDay as number]?.exp ? (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center bg-[var(--app-bg-main)] p-3 rounded-xl border border-[var(--app-border)]">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.02)] overflow-hidden">
                              <img src={getImgSrc(isCat ? catSad : stickerSad)} alt="지출" className="w-8 h-8 object-contain" />
                            </div>
                            <div>
                              <div className="text-[14px] font-bold text-[var(--app-text-main)]">지출</div>
                              <div className="text-[12px] text-[var(--app-text-tertiary)]">오후 2:30</div>
                            </div>
                          </div>
                          <div className="text-[15px] font-bold text-[var(--app-text-main)]" style={{ fontFamily: "'Nunito', sans-serif" }}>
                            {calData[selectedDay as number]?.exp?.toLocaleString()}원
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-[13px] text-[var(--app-text-tertiary)] text-center py-5 bg-[var(--app-bg-main)] rounded-xl border border-[var(--app-border)] border-dashed">소비 내역이 없습니다.</p>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Add/Edit Modal */}
          {showAdd && (
            <AddModal 
               initData={editTransaction} 
               onSave={(data) => {
                 // Add to calData for visuals
                 const d = new Date(data.date).getDate();
                 setCalData(prev => ({
                   ...prev,
                   [d]: {
                     ...prev[d],
                     exp: (prev[d]?.exp || 0) + data.amount
                   }
                 }));
                 // If pending, remove from pending list
                 if (data.isPending) {
                   setPendingTransactions(prev => prev.filter(p => p.id !== data.id));
                 }
                 setEditTransaction(null);
                 setShowAdd(false);
               }}
               onClose={() => {
                 setEditTransaction(null);
                 setShowAdd(false);
               }} 
            />
          )}

          {/* Pending Transactions Modal */}
          {showPendingModal && (
            <PendingTransactionsModal 
              transactions={pendingTransactions} 
              onClose={() => setShowPendingModal(false)}
              onSelect={(tx) => {
                setEditTransaction({...tx, isPending: true});
                setShowPendingModal(false);
                setShowAdd(true);
              }}
            />
          )}
        </div>

        {/* ═══ Right Column: Charts ═══ */}
        <div className="flex flex-col gap-5 h-full">
          {/* Cash Flow Chart */}
          <div className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[17px] font-bold text-[var(--app-text-main)]">분석 보기</h3>
              <button className="text-[12px] text-[var(--app-text-tertiary)] flex items-center gap-0.5">
                통계보기 <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>

            <div className="h-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={cashFlowData} margin={{ top: 10, right: 0, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--app-border)" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: "var(--app-text-tertiary)" }} axisLine={false} tickLine={false} dy={10} />
                  <YAxis tick={{ fontSize: 10, fill: "#D9C8B4" }} axisLine={false} tickLine={false} tickFormatter={(v) => v === 0 ? "0" : `${(v / 1000000).toFixed(1)}M`} />
                  <Tooltip
                    contentStyle={{ fontSize: 11, borderRadius: 10, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                    formatter={(value: number, name: string) => {
                      const label = name === "savings" ? "저금" : name === "expense" ? "소비" : "잔고";
                      return [`₩${Math.abs(value).toLocaleString()}`, label];
                    }}
                  />
                  <Bar dataKey="savings" fill="var(--app-primary)" radius={[5, 5, 0, 0]} barSize={16} stackId="stack" />
                  <Bar dataKey="expense" fill="var(--app-border)" radius={[0, 0, 5, 5]} barSize={16} stackId="stack" />
                  <Line type="monotone" dataKey="balance" stroke="var(--app-text-tertiary)" strokeWidth={1.5} strokeDasharray="4 4" dot={{ r: 3, fill: "#fff", stroke: "var(--app-text-tertiary)", strokeWidth: 2 }} activeDot={{ r: 5, fill: "var(--app-primary)", stroke: "#fff", strokeWidth: 2 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Purchase History */}
          <div className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 flex flex-col flex-1 min-h-[300px]">
            <h3 className="text-[17px] font-bold text-[var(--app-text-main)] mb-4">최근 구매 기록</h3>
            <div className="flex-1 overflow-y-auto space-y-2 pr-1" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {recentPurchases.map((tx) => (
                <div
                  key={tx.id}
                  onClick={() => {
                    setEditTransaction({...tx});
                    setShowAdd(true);
                  }}
                  className="flex justify-between items-center bg-[var(--app-bg-main)] hover:bg-[var(--app-bg-secondary)] p-3 rounded-xl border border-[var(--app-border)] cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-[var(--app-border)]">
                      <Receipt className="w-5 h-5 text-[var(--app-primary)]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-[14px] font-bold text-[var(--app-text-main)] flex items-center gap-2">
                        {tx.store}
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[var(--app-primary-light)] text-[#6B4F3A]">{tx.category}</span>
                      </div>
                      <div className="text-[12px] text-[var(--app-text-tertiary)] mt-0.5">{tx.date}</div>
                    </div>
                  </div>
                  <div className="text-[15px] font-bold text-[var(--app-text-main)]" style={{ fontFamily: "'Nunito', sans-serif" }}>
                    -{tx.amount.toLocaleString()}원
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Swipe Carousel */}
      <div className="block lg:hidden h-[calc(100vh-[var(--safe-area-bottom,0px)]-210px)]">
        <SwipeCarousel
          views={[
            // View 1: Calendar 
            <div key="cal" className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col h-full w-full relative">
              {/* Header */}
              <div className="px-5 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-[18px] font-bold text-[var(--app-text-main)] flex items-center gap-1.5">
                    12월 내 소비
                    <ChevronDown className="w-5 h-5 text-[var(--app-text-tertiary)]" strokeWidth={1.5} />
                  </h2>
                </div>

                {/* Summary */}
                <div className="py-3 border-b border-[var(--app-border)] flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-4 mb-1">
                      <span className="text-[13px] text-[var(--app-text-sub)] w-8">소비</span>
                      <span className="text-[17px] font-bold text-[var(--app-text-main)]" style={{ fontFamily: "'Nunito', sans-serif" }}>1,625,560 원</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#D9C8B4]" strokeWidth={1.5} />
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="px-5 pb-4 pt-2 flex-1 flex flex-col min-h-0">
                <div className="grid grid-cols-7 text-center mb-1 shrink-0">
                  {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
                    <div key={d} className="text-[13px] text-[var(--app-text-tertiary)] font-medium py-2">{d}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 text-center gap-y-0.5 flex-1 min-h-[0px] overflow-y-auto">
                  {calendarDays.map((day, i) => (
                    <div
                      key={i}
                      className={`min-h-[60px] flex flex-col items-center rounded-xl transition-colors relative pt-1 ${day ? "cursor-pointer hover:bg-[var(--app-bg-secondary)]" : ""}`}
                      onClick={() => day && setSelectedDay(day)}
                    >
                      {day && (
                        <>
                          {/* 펫 스티커 */}
                          {calendarStickers[day] && (
                            <img
                              src={getImgSrc(calendarStickers[day].img)}
                              alt={calendarStickers[day].label}
                              className="w-[28px] h-[28px] object-contain absolute -top-1 -right-1 drop-shadow-sm z-10 pointer-events-none"
                              style={{ opacity: 0.9 }}
                            />
                          )}

                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[12px] ${day === 31
                            ? "bg-[var(--app-primary-light)] text-[#6B4F3A] font-bold"
                            : "text-[var(--app-text-secondary)]"
                            }`}>
                            {day}
                          </div>

                          <div className="mt-0.5 space-y-[1px]">
                            {calData[day]?.exp ? (
                              <div className="text-[9px] text-[var(--app-text-tertiary)] font-medium leading-none">
                                -{calData[day].exp.toLocaleString()}
                              </div>
                            ) : null}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>,

            // View 2: Analysis & Distribution Charts
            <div key="charts" className="flex flex-col gap-4 h-full w-full overflow-y-auto pb-6">
              {/* Cash Flow Chart */}
              <div className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 shrink-0">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[17px] font-bold text-[var(--app-text-main)]">분석 보기</h3>
                  <button className="text-[12px] text-[var(--app-text-tertiary)] flex items-center gap-0.5">
                    통계보기 <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </div>
                <div className="h-[160px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={cashFlowData} margin={{ top: 10, right: 0, bottom: 0, left: -20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--app-border)" vertical={false} />
                      <XAxis dataKey="date" tick={{ fontSize: 11, fill: "var(--app-text-tertiary)" }} axisLine={false} tickLine={false} dy={10} />
                      <YAxis tick={{ fontSize: 10, fill: "#D9C8B4" }} axisLine={false} tickLine={false} tickFormatter={(v) => v === 0 ? "0" : `${(v / 1000000).toFixed(1)}M`} />
                      <Tooltip
                        contentStyle={{ fontSize: 11, borderRadius: 10, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                        formatter={(value: number, name: string) => {
                          const label = name === "savings" ? "저금" : name === "expense" ? "소비" : "잔고";
                          return [`₩${Math.abs(value).toLocaleString()}`, label];
                        }}
                      />
                      <Bar dataKey="savings" fill="var(--app-primary)" radius={[5, 5, 0, 0]} barSize={16} stackId="stack" />
                      <Bar dataKey="expense" fill="var(--app-border)" radius={[0, 0, 5, 5]} barSize={16} stackId="stack" />
                      <Line type="monotone" dataKey="balance" stroke="var(--app-text-tertiary)" strokeWidth={1.5} strokeDasharray="4 4" dot={{ r: 3, fill: "#fff", stroke: "var(--app-text-tertiary)", strokeWidth: 2 }} activeDot={{ r: 5, fill: "var(--app-primary)", stroke: "#fff", strokeWidth: 2 }} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Purchase History */}
              <div className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 flex flex-col flex-1 min-h-[300px]">
                <h3 className="text-[17px] font-bold text-[var(--app-text-main)] mb-4">최근 구매 기록</h3>
                <div className="flex-1 overflow-y-auto space-y-2 pr-1" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                  {recentPurchases.map((tx) => (
                    <div
                      key={tx.id}
                      onClick={() => {
                        setEditTransaction({...tx});
                        setShowAdd(true);
                      }}
                      className="flex justify-between items-center bg-[var(--app-bg-main)] hover:bg-[var(--app-bg-secondary)] p-3 rounded-xl border border-[var(--app-border)] cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-[var(--app-border)]">
                          <Receipt className="w-5 h-5 text-[var(--app-primary)]" strokeWidth={1.5} />
                        </div>
                        <div>
                          <div className="text-[14px] font-bold text-[var(--app-text-main)] flex items-center gap-2">
                            {tx.store}
                            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[var(--app-primary-light)] text-[#6B4F3A]">{tx.category}</span>
                          </div>
                          <div className="text-[12px] text-[var(--app-text-tertiary)] mt-0.5">{tx.date}</div>
                        </div>
                      </div>
                      <div className="text-[15px] font-bold text-[var(--app-text-main)]" style={{ fontFamily: "'Nunito', sans-serif" }}>
                        -{tx.amount.toLocaleString()}원
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ]}
        />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   새 지출 추가 모달
════════════════════════════════════════════ */
const MODAL_CATEGORIES = [
  { name: "사료", emoji: "🥣" },
  { name: "병원/의료", emoji: "🏥" },
  { name: "미용", emoji: "✂️" },
  { name: "위생/소모품", emoji: "🪥" },
  { name: "간식", emoji: "🍖" },
  { name: "약/영양제", emoji: "💊" },
  { name: "용품", emoji: "🛒" },
  { name: "돌봄/서비스", emoji: "🏠" },
];

function AddModal({ initData, onSave, onClose }: { initData?: any; onSave: (data: any) => void; onClose: () => void }) {
  const [selCat, setSelCat] = useState(initData?.category || "사료");
  const [amount, setAmount] = useState(initData?.amount || 0);
  const [content, setContent] = useState(initData?.store || "");
  const [pet, setPet] = useState("초코");
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(initData?.date || today);

  const addAmount = (n: number) => setAmount((v) => v + n);

  return (
    <div
      className="absolute inset-0 bg-black/40 flex items-center justify-center z-50 p-5 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden flex flex-col"
      >
        {/* 헤더 */}
        <div className="flex justify-between items-center px-5 pt-5 pb-3">
          <h3 className="text-[18px] font-bold text-[var(--app-text-main)]">새 지출 추가</h3>
          <button onClick={onClose} className="text-[var(--app-text-tertiary)] hover:text-[var(--app-text-secondary)] transition-colors">
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        <div className="px-5 pb-5 space-y-4 overflow-y-auto">

          {/* 카테고리 */}
          <div>
            <p className="text-[13px] font-bold text-[var(--app-text-secondary)] mb-2">카테고리 선택</p>
            <div className="flex flex-wrap gap-2">
              {MODAL_CATEGORIES.map((c) => {
                const active = selCat === c.name;
                return (
                  <button
                    key={c.name}
                    onClick={() => setSelCat(c.name)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] border transition-all"
                    style={{
                      background: active ? "var(--app-primary)" : "var(--app-bg-main)",
                      borderColor: active ? "var(--app-primary)" : "var(--app-border)",
                      color: active ? "#fff" : "var(--app-text-secondary)",
                      fontWeight: active ? 600 : 400,
                    }}
                  >
                    <span>{c.emoji}</span>
                    {c.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 금액 */}
          <div>
            <p className="text-[13px] font-bold text-[var(--app-text-secondary)] mb-2">금액</p>
            <div className="relative">
              <input
                type="number"
                value={amount || ""}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="0"
                className="w-full p-3.5 rounded-xl bg-[var(--app-bg-main)] border border-[var(--app-border)] focus:outline-none focus:border-[var(--app-primary)] focus:bg-white text-[18px] font-bold transition-colors pr-10"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[14px] font-bold text-[var(--app-text-tertiary)]">원</span>
            </div>
            <div className="flex gap-2 mt-2">
              {[10000, 30000, 50000, 100000].map((n) => (
                <button
                  key={n}
                  onClick={() => addAmount(n)}
                  className="flex-1 py-2 rounded-lg text-[13px] font-medium transition-colors hover:brightness-95"
                  style={{ background: "var(--app-primary-light)", color: "#6B4F3A" }}
                >
                  +{n / 10000}만
                </button>
              ))}
            </div>
          </div>

          {/* 내용 */}
          <div>
            <p className="text-[13px] font-bold text-[var(--app-text-secondary)] mb-2">내용</p>
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="지출 내용을 입력하세요"
              className="w-full p-3.5 rounded-xl bg-[var(--app-bg-main)] border border-[var(--app-border)] focus:outline-none focus:border-[var(--app-primary)] focus:bg-white transition-colors text-[14px]"
            />
          </div>

          {/* 반려동물 + 날짜 */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[13px] font-bold text-[var(--app-text-secondary)] mb-2">반려동물</p>
              <div className="relative">
                <select
                  value={pet}
                  onChange={(e) => setPet(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[var(--app-bg-main)] border border-[var(--app-border)] focus:outline-none focus:border-[var(--app-primary)] text-[14px] appearance-none pr-8"
                >
                  <option>초코</option>
                  <option>나비</option>
                  <option>전체</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[var(--app-text-tertiary)] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <div>
              <p className="text-[13px] font-bold text-[var(--app-text-secondary)] mb-2">날짜</p>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-3 rounded-xl bg-[var(--app-bg-main)] border border-[var(--app-border)] focus:outline-none focus:border-[var(--app-primary)] text-[14px]"
              />
            </div>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="px-5 pb-5 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3.5 rounded-xl border border-[var(--app-border)] text-[15px] font-bold text-[var(--app-text-secondary)] hover:bg-[var(--app-bg-main)] transition-colors"
          >
            취소
          </button>
          <button
            onClick={() => onSave({ id: initData?.id, date, amount, category: selCat, store: content, isPending: initData?.isPending })}
            className="flex-1 py-3.5 text-white rounded-xl font-bold text-[15px] hover:opacity-90 active:scale-[0.98] transition-all"
            style={{ background: "linear-gradient(135deg, var(--app-primary), var(--app-primary-dark))", boxShadow: "0 4px 12px rgba(245,158,11,0.3)" }}
          >
            저장하기
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ════════════════════════════════════════════
   미등록 거래 기록 (Pending Transactions) 모달
════════════════════════════════════════════ */
function PendingTransactionsModal({ transactions, onSelect, onClose }: { transactions: any[], onSelect: (tx: any) => void, onClose: () => void }) {
  return (
    <div
      className="absolute inset-0 bg-black/40 flex items-center justify-center z-50 p-5 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
      >
        <div className="flex justify-between items-center px-5 pt-5 pb-3 border-b border-[var(--app-border)]">
          <div>
            <h3 className="text-[18px] font-bold text-[var(--app-text-main)]">미반영 거래 기록</h3>
            <span className="text-[12px] text-[var(--app-text-tertiary)] mt-0.5 block">가계부에 아직 등록되지 않은 내역입니다.</span>
          </div>
          <button onClick={onClose} className="text-[var(--app-text-tertiary)] hover:text-[var(--app-text-secondary)] transition-colors">
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        <div className="p-5 flex-1 overflow-y-auto space-y-2">
          {transactions.length > 0 ? transactions.map((tx) => (
            <div
              key={tx.id}
              onClick={() => onSelect(tx)}
              className="flex justify-between items-center bg-[var(--app-bg-main)] hover:bg-[var(--app-bg-secondary)] p-3 rounded-xl border border-[var(--app-border)] cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-[var(--app-border)]">
                  <Receipt className="w-5 h-5 text-[var(--app-primary)]" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[14px] font-bold text-[var(--app-text-main)] flex items-center gap-2">
                    {tx.store}
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[var(--app-primary-light)] text-[#6B4F3A]">{tx.category}</span>
                  </div>
                  <div className="text-[12px] text-[var(--app-text-tertiary)] mt-0.5">{tx.date}</div>
                </div>
              </div>
              <div className="text-[15px] font-bold text-[var(--app-text-main)]" style={{ fontFamily: "'Nunito', sans-serif" }}>
                -{tx.amount.toLocaleString()}원
              </div>
            </div>
          )) : (
            <p className="text-[13px] text-[var(--app-text-tertiary)] text-center py-5">모든 거래 내역이 등록되었습니다.</p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
