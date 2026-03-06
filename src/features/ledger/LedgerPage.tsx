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
} from "lucide-react";
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

const getImgSrc = (img: any) => typeof img === 'string' ? img : img?.src || img;

export default function LedgerPage() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);

  const topCategories = [
    { id: 1, name: "사료", size: 110, top: "15%", left: "32%", color: "var(--app-primary)", sizeText: 14, img: stickerEating },
    { id: 2, name: "병원/의료", size: 95, top: "52%", left: "62%", color: "#EF4444", sizeText: 12, img: stickerHospital },
    { id: 3, name: "간식", size: 85, top: "75%", left: "38%", color: "var(--app-warning)", sizeText: 12, img: stickerSnack },
    { id: 4, name: "용품", size: 80, top: "60%", left: "15%", color: "#74B9FF", sizeText: 11, img: stickerToys },
    { id: 5, name: "미용", size: 75, top: "22%", left: "68%", color: "#FD79A8", sizeText: 11, img: stickerGrooming },
  ];

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < startDay; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  type TransactionItem = { title: string; amount: number; type: "exp" | "inc"; time: string; category?: string };
  const calData: Record<number, { exp?: number; inc?: number; items?: TransactionItem[] }> = {
    1: { exp: 1200, items: [{ title: "간식 구매", amount: 1200, type: "exp", time: "오후 2:30", category: "간식" }] },
    2: { exp: 20000, inc: 2530688, items: [{ title: "KB펫보험 환급", amount: 2530688, type: "inc", time: "오전 10:00" }, { title: "사료 (오리젠)", amount: 20000, type: "exp", time: "오후 1:15", category: "사료" }] },
    3: { exp: 100000, inc: 2, items: [{ title: "건강 검진", amount: 100000, type: "exp", time: "오전 11:30", category: "병원/의료" }, { title: "이자수익", amount: 2, type: "inc", time: "오후 4:00" }] },
    5: { exp: 4999, items: [{ title: "장난감", amount: 4999, type: "exp", time: "오후 5:20", category: "용품" }] },
    6: { exp: 102110, items: [{ title: "특식 캔", amount: 102110, type: "exp", time: "저녁 7:40", category: "간식" }] },
    8: { exp: 326000, items: [{ title: "종합 백신", amount: 326000, type: "exp", time: "오전 9:15", category: "병원/의료" }] },
    9: { inc: 10000, items: [{ title: "용돈", amount: 10000, type: "inc", time: "낮 12:00" }] },
    10: { exp: 17000, items: [{ title: "목욕 스파", amount: 17000, type: "exp", time: "오후 3:00", category: "미용" }] },
    11: { exp: 2400, items: [{ title: "배변 패드", amount: 2400, type: "exp", time: "오후 2:10", category: "위생/소모품" }] },
    12: { inc: 11000, items: [{ title: "앱테크 캐시백", amount: 11000, type: "inc", time: "오전 8:00" }] },
    13: { exp: 6000, items: [{ title: "산책 물통", amount: 6000, type: "exp", time: "오후 4:30", category: "용품" }] },
    14: { exp: 22000, items: [{ title: "하네스", amount: 22000, type: "exp", time: "저녁 6:00", category: "용품" }] },
    15: { exp: 14200, items: [{ title: "덴탈 껌", amount: 14200, type: "exp", time: "오후 1:45", category: "간식" }] },
    16: { exp: 30000, items: [{ title: "진드기약", amount: 30000, type: "exp", time: "오전 10:20", category: "약/영양제" }] },
    17: { inc: 103507, items: [{ title: "적금 이자", amount: 103507, type: "inc", time: "오전 9:00" }] },
    18: { inc: 2, items: [{ title: "토스 포인트", amount: 2, type: "inc", time: "오후 2:00" }] },
    19: { exp: 54842, inc: 5400, items: [{ title: "수제 간식", amount: 54842, type: "exp", time: "오후 5:10", category: "간식" }, { title: "중고 거래", amount: 5400, type: "inc", time: "저녁 8:00" }] },
    20: { exp: 126484, items: [{ title: "유치원", amount: 126484, type: "exp", time: "아침 8:30", category: "돌봄/서비스" }] },
    21: { exp: 10000, items: [{ title: "펫택시", amount: 10000, type: "exp", time: "오후 6:40", category: "기타" }] },
    22: { exp: 14000, items: [{ title: "샴푸", amount: 14000, type: "exp", time: "오후 2:15", category: "위생/소모품" }] },
    23: { exp: 14000, items: [{ title: "발바닥 크림", amount: 14000, type: "exp", time: "오전 11:00", category: "용품" }] },
    24: { inc: 50460, items: [{ title: "펫보험 보상", amount: 50460, type: "inc", time: "오후 12:30" }] },
    25: { exp: 6500, items: [{ title: "매너벨트", amount: 6500, type: "exp", time: "오후 4:00", category: "위생/소모품" }] },
    26: { exp: 110000, items: [{ title: "초음파 검사", amount: 110000, type: "exp", time: "오전 10:45", category: "병원/의료" }] },
    27: { exp: 49390, inc: 24500, items: [{ title: "관절 영양제", amount: 49390, type: "exp", time: "오후 1:20", category: "약/영양제" }, { title: "친구 선물", amount: 24500, type: "inc", time: "오후 3:00" }] },
    28: { inc: 9500, items: [{ title: "포인트 환급", amount: 9500, type: "inc", time: "오전 9:30" }] },
    29: { exp: 2900, items: [{ title: "장난감 볼", amount: 2900, type: "exp", time: "오후 5:50", category: "용품" }] },
    31: { exp: 5300, inc: 1000, items: [{ title: "눈물 세정제", amount: 5300, type: "exp", time: "오후 2:00", category: "위생/소모품" }, { title: "리워드", amount: 1000, type: "inc", time: "저녁 7:15" }] },
  };

  // 날짜별 펫 스티커 매핑 (활동 유형에 따라 다른 스티커)
  const calendarStickers: Record<number, { img: any; label: string }> = {
    1: { img: stickerGrooming, label: "미용" },
    2: { img: stickerThumbsup, label: "저축" },
    3: { img: stickerHospital, label: "검진" },
    5: { img: stickerEating, label: "간식" },
    6: { img: stickerSad, label: "과소비" },
    8: { img: stickerSad, label: "과소비" },
    9: { img: stickerThumbsup, label: "저축" },
    12: { img: stickerThumbsup, label: "저축" },
    14: { img: stickerEating, label: "사료" },
    17: { img: stickerThumbsup, label: "저축" },
    20: { img: stickerSad, label: "과소비" },
    24: { img: stickerThumbsup, label: "저축" },
    26: { img: stickerHospital, label: "병원" },
    27: { img: stickerEating, label: "간식" },
    31: { img: stickerGrooming, label: "미용" },
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-5 items-stretch">
        {/* ═══ Left Column: Calendar Box ═══ */}
        <div className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col h-full relative">
          {/* Header */}
          <div className="px-5 pt-4">
            <h2 className="text-[18px] font-bold text-[var(--app-text-main)] flex items-center gap-1.5 mb-3">
              12월 내 소비
              <ChevronDown className="w-5 h-5 text-[var(--app-text-tertiary)]" strokeWidth={1.5} />
            </h2>

            {/* Summary */}
            <div className="py-3 border-b border-[var(--app-border)] flex justify-between items-center">
              <div>
                <div className="flex items-center gap-4 mb-1">
                  <span className="text-[13px] text-[#8B7355] w-8">소비</span>
                  <span className="text-[17px] font-bold text-[var(--app-text-main)]" style={{ fontFamily: "'Nunito', sans-serif" }}>1,625,560 원</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[13px] text-[#8B7355] w-8">저금</span>
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
                          src={getImgSrc(calendarStickers[day].img)}
                          alt={calendarStickers[day].label}
                          className="w-[32px] h-[32px] object-contain absolute -top-1 -right-1 drop-shadow-sm z-10 pointer-events-none"
                          style={{ opacity: 0.9 }}
                        />
                      )}

                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] ${day === 31
                        ? "bg-[#F5E6D0] text-[#6B4F3A] font-bold"
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
                        {(calData[selectedDay as number]?.items?.filter(i => i.type === 'exp') || []).map((item, idx) => (
                          <div key={`exp-${idx}`} className="flex justify-between items-center bg-[var(--app-bg-tertiary)] p-3 rounded-xl border border-[var(--app-border)]">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.02)] overflow-hidden">
                                <img src={getImgSrc(stickerSad)} alt="지출" className="w-8 h-8 object-contain" />
                              </div>
                              <div>
                                <div className="text-[14px] font-bold text-[var(--app-text-main)]">{item.title}</div>
                                <div className="text-[12px] text-[var(--app-text-tertiary)]">{item.time} {item.category ? `· ${item.category}` : ''}</div>
                              </div>
                            </div>
                            <div className="text-[15px] font-bold text-[var(--app-text-main)]" style={{ fontFamily: "'Nunito', sans-serif" }}>
                              {item.amount.toLocaleString()}원
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[13px] text-[var(--app-text-tertiary)] text-center py-5 bg-[var(--app-bg-tertiary)] rounded-xl border border-[var(--app-border)] border-dashed">소비 내역이 없습니다.</p>
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
                        {(calData[selectedDay as number]?.items?.filter(i => i.type === 'inc') || []).map((item, idx) => (
                          <div key={`inc-${idx}`} className="flex justify-between items-center bg-[var(--app-bg-tertiary)] p-3 rounded-xl border border-[var(--app-border)]">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.02)] overflow-hidden">
                                <img src={getImgSrc(stickerThumbsup)} alt="저금" className="w-8 h-8 object-contain" />
                              </div>
                              <div>
                                <div className="text-[14px] font-bold text-[var(--app-text-main)]">{item.title}</div>
                                <div className="text-[12px] text-[var(--app-text-tertiary)]">{item.time}</div>
                              </div>
                            </div>
                            <div className="text-[15px] font-bold text-[var(--app-text-main)]" style={{ fontFamily: "'Nunito', sans-serif" }}>
                              {item.amount.toLocaleString()}원
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[13px] text-[var(--app-text-tertiary)] text-center py-5 bg-[var(--app-bg-tertiary)] rounded-xl border border-[var(--app-border)] border-dashed">저금 내역이 없습니다.</p>
                    )}
                  </div>
                </div>

                <div className="p-4 border-t border-[var(--app-border)] bg-[var(--app-bg-tertiary)] flex gap-3">
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

          {/* Add Modal */}
          {showAdd && (
            <AddModal onClose={() => setShowAdd(false)} />
          )}
        </div>

        {/* ═══ Right Column: Charts ═══ */}
        <div className="flex flex-col gap-5 h-full">
          {/* Cash Flow Chart */}
          <div className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[17px] font-bold text-[var(--app-text-main)]">분석 보기</h3>
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

          {/* Category Bubble Chart */}
          <div className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 flex flex-col flex-1 min-h-0">
            <h3 className="text-[17px] font-bold text-[var(--app-text-main)] mb-4">카테고리별 분포 (Top 5)</h3>

            <div ref={constraintsRef} className="relative w-full max-w-[280px] aspect-square mx-auto flex-1 min-h-0 my-2">
              {topCategories.map((cat, i) => (
                <motion.div
                  key={cat.id}
                  drag
                  dragConstraints={constraintsRef}
                  whileDrag={{ scale: 1.1, zIndex: 50, cursor: "grabbing" }}
                  whileHover={{ scale: 1.05 }}
                  className="absolute bg-white rounded-full flex flex-col items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.06)] cursor-grab overflow-hidden"
                  style={{
                    width: cat.size,
                    height: cat.size,
                    top: cat.top,
                    left: cat.left,
                    border: `2px solid ${cat.color}30`,
                    zIndex: 10 + i,
                  }}
                >
                  {/* 스티커 이미지 */}
                  <img
                    src={getImgSrc(cat.img)}
                    alt={cat.name}
                    className="object-contain drop-shadow-sm"
                    style={{ width: cat.size * 0.55, height: cat.size * 0.55 }}
                  />
                  {/* 카테고리 라벨 */}
                  <span
                    className="font-bold tracking-tight leading-none -mt-0.5"
                    style={{ color: cat.color, fontSize: cat.sizeText }}
                  >
                    {cat.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
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

function AddModal({ onClose }: { onClose: () => void }) {
  const [selCat, setSelCat] = useState("사료");
  const [amount, setAmount] = useState(0);
  const [content, setContent] = useState("");
  const [pet, setPet] = useState("초코");
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);

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
                      background: active ? "var(--app-primary)" : "var(--app-bg-tertiary)",
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
                className="w-full p-3.5 rounded-xl bg-[var(--app-bg-tertiary)] border border-[var(--app-border)] focus:outline-none focus:border-[var(--app-primary)] focus:bg-white text-[18px] font-bold transition-colors pr-10"
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
                  style={{ background: "#F5E6D0", color: "#6B4F3A" }}
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
              className="w-full p-3.5 rounded-xl bg-[var(--app-bg-tertiary)] border border-[var(--app-border)] focus:outline-none focus:border-[var(--app-primary)] focus:bg-white transition-colors text-[14px]"
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
                  className="w-full p-3 rounded-xl bg-[var(--app-bg-tertiary)] border border-[var(--app-border)] focus:outline-none focus:border-[var(--app-primary)] text-[14px] appearance-none pr-8"
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
                className="w-full p-3 rounded-xl bg-[var(--app-bg-tertiary)] border border-[var(--app-border)] focus:outline-none focus:border-[var(--app-primary)] text-[14px]"
              />
            </div>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="px-5 pb-5 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3.5 rounded-xl border border-[var(--app-border)] text-[15px] font-bold text-[var(--app-text-secondary)] hover:bg-[var(--app-bg-tertiary)] transition-colors"
          >
            취소
          </button>
          <button
            onClick={onClose}
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
