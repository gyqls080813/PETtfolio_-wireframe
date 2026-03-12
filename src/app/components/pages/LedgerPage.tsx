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
import SwipeCarousel from "../../../shared/components/SwipeCarousel";
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
import stickerThumbsup from "../../../assets/pome_thumbsup.png";
import stickerSad from "../../../assets/pome_sad.png";
import stickerEating from "../../../assets/pome_eating.png";
import stickerGrooming from "../../../assets/pome_grooming.png";
import stickerHospital from "../../../assets/pome_hospital.png";
import stickerSnack from "../../../assets/pome_snack.png";
import stickerToys from "../../../assets/pome_toys.png";

// 고양이 스티커 이미지
import catThumbsup from "../../../assets/cat_thumbsup.png";
import catSad from "../../../assets/cat_sad.png";
import catEating from "../../../assets/cat_eating.png";
import catGrooming from "../../../assets/cat_grooming.png";
import catHospital from "../../../assets/cat_hospital.png";
import catSnack from "../../../assets/cat_snack.png";
import catToys from "../../../assets/cat_toys.png";

import PetAvatar from "../../../shared/components/figma/PetAvatar";

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
              <button
                onClick={() => setShowPendingModal(true)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--app-bg-main)] text-[var(--app-text-tertiary)] hover:bg-[var(--app-primary-light)] hover:text-[var(--app-primary)] transition-colors border border-[var(--app-border)]"
              >
                <Plus className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>

            {/* Summary */}
            <div className="py-3 border-b border-[var(--app-border)] flex justify-between items-center">
              <div>
                <div className="flex items-center gap-4 mb-1">
                  <span className="text-[13px] text-[var(--app-text-sub)] w-8">소비</span>
                  <span className="text-[17px] font-bold text-[var(--app-text-main)]" style={{ fontFamily: "'Nunito', sans-serif" }}>1,625,560 원</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[13px] text-[var(--app-text-sub)] w-8">저금</span>
                  <span className="text-[17px] font-bold text-[var(--app-success)]" style={{ fontFamily: "'Nunito', sans-serif" }}>2,746,059 원</span>
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
                          src={calendarStickers[day].img}
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
                        {calData[day]?.exp && (
                          <div className="text-[10px] text-[var(--app-text-tertiary)] font-medium leading-none">
                            -{calData[day].exp.toLocaleString()}
                          </div>
                        )}
                        {calData[day]?.inc && (
                          <div className="text-[10px] text-[var(--app-success)] font-medium leading-none">
                            +{calData[day].inc.toLocaleString()}
                          </div>
                        )}
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

                  {/* 저금 내역 */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-[15px] font-bold text-[var(--app-success)]">저금 내역</h4>
                      <span className="text-[14px] font-semibold text-[var(--app-success)]">
                        +{calData[selectedDay as number]?.inc?.toLocaleString() || 0}원
                      </span>
                    </div>
                    {calData[selectedDay as number]?.inc ? (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center bg-[var(--app-bg-main)] p-3 rounded-xl border border-[var(--app-border)]">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.02)] overflow-hidden">
                              <img src={getImgSrc(isCat ? catThumbsup : stickerThumbsup)} alt="저금" className="w-8 h-8 object-contain" />
                            </div>
                            <div>
                              <div className="text-[14px] font-bold text-[var(--app-text-main)]">수입/저축</div>
                              <div className="text-[12px] text-[var(--app-text-tertiary)]">오전 10:00</div>
                            </div>
                          </div>
                          <div className="text-[15px] font-bold text-[var(--app-text-main)]" style={{ fontFamily: "'Nunito', sans-serif" }}>
                            {calData[selectedDay as number]?.inc?.toLocaleString()}원
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-[13px] text-[var(--app-text-tertiary)] text-center py-5 bg-[var(--app-bg-main)] rounded-xl border border-[var(--app-border)] border-dashed">저금 내역이 없습니다.</p>
                    )}
                  </div>
                </div>

                <div className="p-4 border-t border-[var(--app-border)] bg-[var(--app-bg-main)] flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedDay(null);
                      setShowAdd(true);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 text-white rounded-xl font-bold text-[15px] hover:opacity-90 active:scale-[0.98] transition-all"
                    style={{ background: "linear-gradient(135deg, var(--app-primary), var(--app-primary-dark))", boxShadow: "0 4px 12px rgba(245,158,11,0.3)" }}
                  >
                    <Plus className="w-5 h-5" />
                    소비 내역 추가
                  </button>
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

          {/* Recent Purchases Modal */}
          {showPendingModal && (
            <PendingTransactionsModal
              transactions={recentPurchases}
              onClose={() => setShowPendingModal(false)}
              onSelect={(tx) => {
                setEditTransaction({ ...tx });
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
                    setEditTransaction({ ...tx });
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
                  <button
                    onClick={() => setShowPendingModal(true)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--app-bg-main)] text-[var(--app-text-tertiary)] hover:bg-[var(--app-primary-light)] hover:text-[var(--app-primary)] transition-colors border border-[var(--app-border)]"
                  >
                    <Plus className="w-5 h-5" strokeWidth={2} />
                  </button>
                </div>

                {/* Summary */}
                <div className="py-3 border-b border-[var(--app-border)] flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-4 mb-1">
                      <span className="text-[13px] text-[var(--app-text-sub)] w-8">소비</span>
                      <span className="text-[17px] font-bold text-[var(--app-text-main)]" style={{ fontFamily: "'Nunito', sans-serif" }}>1,625,560 원</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[13px] text-[var(--app-text-sub)] w-8">저금</span>
                      <span className="text-[17px] font-bold text-[var(--app-success)]" style={{ fontFamily: "'Nunito', sans-serif" }}>2,746,059 원</span>
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
                              src={calendarStickers[day].img}
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
                            {calData[day]?.exp && (
                              <div className="text-[9px] text-[var(--app-text-tertiary)] font-medium leading-none">
                                -{calData[day].exp.toLocaleString()}
                              </div>
                            )}
                            {calData[day]?.inc && (
                              <div className="text-[9px] text-[var(--app-success)] font-medium leading-none">
                                +{calData[day].inc.toLocaleString()}
                              </div>
                            )}
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
                        setEditTransaction({ ...tx });
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
   새 지출 추가 모달 (리디자인)
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

const PETS = [
  { name: "초코", avatar: "choco" as const },
  { name: "나비", avatar: "nabi" as const },
];

// AI 예측 디폴트 데이터
const AI_PREDICTED_RECORDS = [
  { id: "ai-1", tags: ["사료"], pets: ["초코"], amount: 45000 },
  { id: "ai-2", tags: ["간식"], pets: ["초코", "나비"], amount: 12000 },
  { id: "ai-3", tags: ["병원/의료"], pets: ["나비"], amount: 35000 },
];

interface PaymentRecord {
  id: string;
  tags: string[];
  pets: string[];
  amount: number;
  isAiPrediction?: boolean;
}

function AddModal({ initData, onSave, onClose, showAiPredictions = true }: { initData?: any; onSave: (data: any) => void; onClose: () => void; showAiPredictions?: boolean }) {
  // 선택된 태그들 (다중 선택)
  const [selectedTags, setSelectedTags] = useState<string[]>(initData?.category ? [initData.category] : []);
  // 선택된 반려동물들 (다중 선택)
  const [selectedPets, setSelectedPets] = useState<string[]>([]);
  // 금액 입력
  const [amount, setAmount] = useState<number>(initData?.amount || 0);
  // 추가된 결제 기록 리스트
  const [records, setRecords] = useState<PaymentRecord[]>([]);
  // AI 예측 기록 (비활성화 상태) - showAiPredictions가 false이면 비우기
  const [aiRecords, setAiRecords] = useState<PaymentRecord[]>(
    showAiPredictions ? AI_PREDICTED_RECORDS.map(r => ({ ...r, isAiPrediction: true })) : []
  );
  // Dropdown 열림 상태
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [showPetDropdown, setShowPetDropdown] = useState(false);
  const tagRef = useRef<HTMLDivElement>(null);
  const petRef = useRef<HTMLDivElement>(null);

  const storeName = initData?.store || "거래처";
  const totalAmount = records.reduce((sum, r) => sum + r.amount, 0);

  // 태그 토글
  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  // 반려동물 토글
  const togglePet = (pet: string) => {
    setSelectedPets(prev =>
      prev.includes(pet) ? prev.filter(p => p !== pet) : [...prev, pet]
    );
  };

  // + 버튼으로 결제 기록 추가
  const addRecord = () => {
    if (selectedTags.length === 0 || selectedPets.length === 0 || amount <= 0) return;
    const newRecord: PaymentRecord = {
      id: `record-${Date.now()}`,
      tags: [...selectedTags],
      pets: [...selectedPets],
      amount,
    };
    setRecords(prev => [...prev, newRecord]);
    setAmount(0);
  };

  // AI 예측 기록을 활성화하여 추가
  const activateAiRecord = (aiRecord: PaymentRecord) => {
    const activated: PaymentRecord = { ...aiRecord, isAiPrediction: false, id: `record-${Date.now()}` };
    setRecords(prev => [...prev, activated]);
    setAiRecords(prev => prev.filter(r => r.id !== aiRecord.id));
  };

  // 추가된 기록 삭제
  const removeRecord = (id: string) => {
    setRecords(prev => prev.filter(r => r.id !== id));
  };

  // 저장
  const handleSave = () => {
    if (records.length === 0) return;
    onSave({
      id: initData?.id,
      date: new Date().toISOString().split("T")[0],
      amount: totalAmount,
      category: records[0]?.tags[0] || "기타",
      store: storeName,
      isPending: initData?.isPending,
      records,
    });
  };

  // 카테고리 색상 매핑
  const getCategoryColor = (name: string) => {
    const cat = categories.find(c => c.name === name);
    return cat?.color || "var(--app-text-tertiary)";
  };

  // 태그 요약 텍스트
  const tagSummary = selectedTags.length === 0
    ? "태그 선택"
    : selectedTags.length <= 2
      ? selectedTags.join(", ")
      : `${selectedTags[0]} 외 ${selectedTags.length - 1}`;

  // 펫 요약 텍스트
  const petSummary = selectedPets.length === 0
    ? "반려동물"
    : selectedPets.join(", ");

  return (
    <div
      className="absolute inset-0 bg-black/40 flex items-center justify-center z-50 p-5 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
        if (tagRef.current && !tagRef.current.contains(e.target as Node)) setShowTagDropdown(false);
        if (petRef.current && !petRef.current.contains(e.target as Node)) setShowPetDropdown(false);
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={() => { setShowTagDropdown(false); setShowPetDropdown(false); }}
      >
        {/* ── 헤더: 거래처 + 결제 금액 ── */}
        <div className="flex justify-between items-center px-5 pt-5 pb-3 border-b border-[var(--app-border)]">
          <div>
            <h3 className="text-[18px] font-bold text-[var(--app-text-main)]">{storeName}</h3>
            <span className="text-[14px] text-[var(--app-text-tertiary)] mt-0.5 block" style={{ fontFamily: "'Nunito', sans-serif" }}>
              결제 금액: <span className="font-bold text-[var(--app-text-main)]">{totalAmount.toLocaleString()}원</span>
            </span>
          </div>
          <button onClick={onClose} className="text-[var(--app-text-tertiary)] hover:text-[var(--app-text-secondary)] transition-colors">
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        <div className="px-5 py-4 space-y-4 overflow-y-auto flex-1">

          {/* ── 한 줄 입력 바: [태그▼] [반려동물▼] [금액___원] [+] ── */}
          <div className="flex items-center gap-2">
            {/* 태그 드롭다운 */}
            <div className="relative" ref={tagRef} onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => { setShowTagDropdown(v => !v); setShowPetDropdown(false); }}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-[13px] border transition-all whitespace-nowrap"
                style={{
                  background: selectedTags.length > 0 ? "var(--app-primary)" : "var(--app-bg-main)",
                  borderColor: selectedTags.length > 0 ? "var(--app-primary)" : "var(--app-border)",
                  color: selectedTags.length > 0 ? "#fff" : "var(--app-text-secondary)",
                  fontWeight: selectedTags.length > 0 ? 600 : 400,
                }}
              >
                <Tag className="w-3.5 h-3.5" strokeWidth={2} />
                {tagSummary}
                <ChevronDown className="w-3.5 h-3.5 ml-0.5" strokeWidth={2} />
              </button>

              {showTagDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 mt-1.5 bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-[var(--app-border)] p-3 z-50 w-[280px]"
                >
                  <p className="text-[11px] font-bold text-[var(--app-text-tertiary)] mb-2 uppercase tracking-wide">결제 태그 (다중 선택)</p>
                  <div className="flex flex-wrap gap-1.5">
                    {MODAL_CATEGORIES.map((c) => {
                      const active = selectedTags.includes(c.name);
                      return (
                        <button
                          key={c.name}
                          onClick={() => toggleTag(c.name)}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[12px] border transition-all"
                          style={{
                            background: active ? "var(--app-primary)" : "var(--app-bg-main)",
                            borderColor: active ? "var(--app-primary)" : "var(--app-border)",
                            color: active ? "#fff" : "var(--app-text-secondary)",
                            fontWeight: active ? 600 : 400,
                          }}
                        >
                          <span className="text-[13px]">{c.emoji}</span>
                          {c.name}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </div>

            {/* 반려동물 드롭다운 */}
            <div className="relative" ref={petRef} onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => { setShowPetDropdown(v => !v); setShowTagDropdown(false); }}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-[13px] border transition-all whitespace-nowrap"
                style={{
                  background: selectedPets.length > 0 ? "var(--app-primary)" : "var(--app-bg-main)",
                  borderColor: selectedPets.length > 0 ? "var(--app-primary)" : "var(--app-border)",
                  color: selectedPets.length > 0 ? "#fff" : "var(--app-text-secondary)",
                  fontWeight: selectedPets.length > 0 ? 600 : 400,
                }}
              >
                🐾
                {petSummary}
                <ChevronDown className="w-3.5 h-3.5 ml-0.5" strokeWidth={2} />
              </button>

              {showPetDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 mt-1.5 bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-[var(--app-border)] p-3 z-50 w-[200px]"
                >
                  <p className="text-[11px] font-bold text-[var(--app-text-tertiary)] mb-2 uppercase tracking-wide">대상 반려동물</p>
                  <div className="flex flex-col gap-1.5">
                    {PETS.map((p) => {
                      const active = selectedPets.includes(p.name);
                      return (
                        <button
                          key={p.name}
                          onClick={() => togglePet(p.name)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] border transition-all text-left"
                          style={{
                            background: active ? "var(--app-primary)" : "var(--app-bg-main)",
                            borderColor: active ? "var(--app-primary)" : "var(--app-border)",
                            color: active ? "#fff" : "var(--app-text-secondary)",
                            fontWeight: active ? 600 : 400,
                          }}
                        >
                          <PetAvatar pet={p.avatar} size="xs" border={false} />
                          {p.name}
                          {active && <span className="ml-auto text-[11px]">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </div>

            {/* 금액 입력 */}
            <div className="relative flex-1 min-w-0">
              <input
                type="number"
                value={amount || ""}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="금액"
                className="w-full py-2.5 px-3 rounded-xl bg-[var(--app-bg-main)] border border-[var(--app-border)] focus:outline-none focus:border-[var(--app-primary)] focus:bg-white text-[14px] font-bold transition-colors pr-8"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] font-bold text-[var(--app-text-tertiary)]">원</span>
            </div>

            {/* + 추가 버튼 */}
            <button
              onClick={addRecord}
              disabled={selectedTags.length === 0 || selectedPets.length === 0 || amount <= 0}
              className="w-10 h-10 flex items-center justify-center rounded-xl font-bold text-white hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              style={{ background: "linear-gradient(135deg, var(--app-primary), var(--app-primary-dark))", boxShadow: "0 4px 12px rgba(245,158,11,0.3)" }}
            >
              <Plus className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>

          {/* ── 추가된 결제 기록 (3열 그리드) ── */}
          {(records.length > 0 || aiRecords.length > 0) && (
            <div>
              <p className="text-[13px] font-bold text-[var(--app-text-secondary)] mb-2">결제 기록</p>
              <div className="grid grid-cols-3 gap-2">
                {records.map((record) => (
                  <motion.div
                    key={record.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative bg-white border border-[var(--app-primary)]/30 rounded-xl p-3 flex flex-col gap-1.5 shadow-[0_2px_8px_rgba(245,158,11,0.1)]"
                  >
                    <button
                      onClick={() => removeRecord(record.id)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#EF4444] text-white flex items-center justify-center hover:brightness-90 transition-all shadow-sm"
                    >
                      <X className="w-3 h-3" strokeWidth={3} />
                    </button>
                    <div className="flex flex-wrap gap-1">
                      {record.tags.map(tag => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-md font-semibold" style={{ background: getCategoryColor(tag) + "20", color: getCategoryColor(tag) }}>{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1">
                      {record.pets.map(pet => (
                        <span key={pet} className="text-[11px] text-[var(--app-text-secondary)] font-medium">🐾 {pet}</span>
                      ))}
                    </div>
                    <div className="text-[14px] font-bold text-[var(--app-text-main)]" style={{ fontFamily: "'Nunito', sans-serif" }}>
                      {record.amount.toLocaleString()}원
                    </div>
                  </motion.div>
                ))}

                {aiRecords.map((record) => (
                  <motion.div
                    key={record.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative bg-[var(--app-bg-main)] border border-dashed border-[var(--app-border)] rounded-xl p-3 flex flex-col gap-1.5 cursor-pointer hover:border-[var(--app-primary)]/40 transition-all group"
                    onClick={() => activateAiRecord(record)}
                    title="클릭하여 추가"
                  >
                    <span className="absolute -top-1.5 -left-1 text-[9px] px-1.5 py-0.5 rounded-full bg-[var(--app-primary-light)] text-[#6B4F3A] font-bold shadow-sm">AI 예측</span>
                    <div className="absolute inset-0 bg-[var(--app-primary)]/10 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <PlusCircle className="w-6 h-6 text-[var(--app-primary)]" strokeWidth={1.5} />
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {record.tags.map(tag => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-md font-medium" style={{ background: getCategoryColor(tag) + "10", color: getCategoryColor(tag), opacity: 0.5 }}>{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 opacity-50">
                      {record.pets.map(pet => (
                        <span key={pet} className="text-[11px] text-[var(--app-text-tertiary)] font-medium">🐾 {pet}</span>
                      ))}
                    </div>
                    <div className="text-[14px] font-bold text-[var(--app-text-tertiary)] opacity-50" style={{ fontFamily: "'Nunito', sans-serif" }}>
                      {record.amount.toLocaleString()}원
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── 하단 버튼 ── */}
        <div className="px-5 pb-5 pt-2 flex gap-3 border-t border-[var(--app-border)]">
          <button
            onClick={onClose}
            className="flex-1 py-3.5 rounded-xl border border-[var(--app-border)] text-[15px] font-bold text-[var(--app-text-secondary)] hover:bg-[var(--app-bg-main)] transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            disabled={records.length === 0}
            className="flex-1 py-3.5 text-white rounded-xl font-bold text-[15px] hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(135deg, var(--app-primary), var(--app-primary-dark))", boxShadow: "0 4px 12px rgba(245,158,11,0.3)" }}
          >
            저장하기 ({records.length}건)
          </button>
        </div>
      </motion.div>
    </div>
  );
}

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
            <h3 className="text-[18px] font-bold text-[var(--app-text-main)]">최근 지출 내역</h3>
            <span className="text-[12px] text-[var(--app-text-tertiary)] mt-0.5 block">항목을 선택하여 가계부에 등록하세요.</span>
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
            <p className="text-[13px] text-[var(--app-text-tertiary)] text-center py-5">최근 지출 내역이 없습니다.</p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
